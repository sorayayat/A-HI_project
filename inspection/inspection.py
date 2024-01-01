from fastapi import APIRouter , Request , UploadFile , File
from PyPDF2 import PdfReader
import openai
from configset.config import getAPIkey ,getModel
from typing import List
from pydantic import BaseModel
from inspection import inspectionPrompt
import io, openai , json

ITrouter = APIRouter(prefix="/inspection")

client = openai()
OPENAI_API_KEY = getAPIkey()
MODEL = getModel()

class Ask(BaseModel):
    introductionTitle : List[str]
    keyword : List[str]
    content : List[str]
    title : str

class SelfIntroduction(BaseModel):
    title: str
    content: str

class PersonalInformation(BaseModel):
    name: str
    position: str
    dateOfBirth: str
    gender: str
    department: str

class ReaderDTO(BaseModel):
    PersonalInformation : PersonalInformation
    SelfIntroduction: List[SelfIntroduction]



def post_gap(system_content, user_content):
    try:
        openai.api_key = OPENAI_API_KEY
        response = client.chat.completions.create(
            model=MODEL,
            messages= [
                {"role" : "system","content" : system_content},
                {"role" : "user", "content" : user_content} 
            ],
            stop=None,
            temperature=0.5
        )
        answer = response.choices[0].message.content
        print("gpt 답변 : " + answer)
        return answer
    except Exception as e:
        resp ={
            "status" : e,
            "data" : "그냥 오류요 뭐요 다시 시도해보든가"
        }
        return {"resp" : resp}

@ITrouter.post("/aks")
async def ask(ask : Ask):
    result = inspectionPrompt.create_prediction_prompt(ask)
    print(f"result : {result}")
    return {"status" : 200 , "result" : result}

@ITrouter.post("/ReadResume")
async def readResume(file : UploadFile = File(...)):
    contents = await file.read()
    buffer = io.BytesIO(contents) 
    pdf_reader = PdfReader(buffer)
    pageNumber = 0
    page = pdf_reader.pages[pageNumber]
    text = page.extract_text()
    
    pre_prompt1 = "1.Keep the original content without summarizing it;"
    pre_prompt2 = "2.Separate the content into key and value, distinguishing between title and content.;"
    pre_prompt3 = "3.Separate the PersonalInformation and SelfIntroduction sections within the content."
    pre_prompt4 = "ex) ReaderDTO : {{PersonalInformation : name:name , position : position, dateOfBirth : dateOfBirth , gender : gender , department : department ....}, {SelfIntroduction : title : title , content : content ...}};"
    pre_prompt5 = "4.Provide in JSON format"
    pre_prompt6 = "5.Translate only 'key' into English."
    system_content = pre_prompt1 + pre_prompt2 + pre_prompt3 + pre_prompt4 + pre_prompt5 + pre_prompt6
    try :
        answer = post_gap(system_content , text)
        strToJson = answer
        json_object = json.loads(strToJson)
    except :
        json_object = {"error" : "통신에러"}

    return json_object