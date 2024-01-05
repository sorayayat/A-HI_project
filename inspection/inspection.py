from fastapi import APIRouter , Request , UploadFile , File
from fastapi.responses import StreamingResponse , Response
from PyPDF2 import PdfReader , PdfFileReader
# from openai import OpenAI
from configset.config import getAPIkey ,getModel
from typing import List
from pydantic import BaseModel
from inspection import inspectionPrompt
from PIL import Image
from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas
import io, openai , json , time , datetime

ITrouter = APIRouter(prefix="/inspection")

# client = OpenAI() <- 라이브러리 1.0 이상부터 현재 팀에서 사용하는 버전은 0.28.0버전
OPENAI_API_KEY = getAPIkey()
openai.api_key = OPENAI_API_KEY
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

class ModifyResumeDTO(BaseModel):
    type: str
    direction: str
    eligibility: str
    skill: str
    selfIntroduction: List[SelfIntroduction]

class RequestEntity(BaseModel):
    modify: List[ModifyResumeDTO]

# openAI 라이브러리 버전 1.0 이상에서만 작동함 
#  openai.api_key = OPENAI_API_KEY
#         response = client.chat.completions.create(
#             model=MODEL,
#             messages= [
#                 {"role" : "system","content" : system_content},
#                 {"role" : "user", "content" : user_content} 
#             ],
#             stop=None,
#             temperature=0.5
#         )

def post_gap(system_content, user_content):
    try:
        openai.api_key = OPENAI_API_KEY
        response = openai.ChatCompletion.create(
            messages= [
                {"role" : "system","content" : system_content},
                {"role" : "user", "content" : user_content} 
            ],
            model=MODEL,
            stop=None,
            temperature=0.5
        )
        answer = response["choices"][0]["message"]["content"]
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
    print("시작")
    start = time.time()
    contents = await file.read()
    buffer = io.BytesIO(contents) 
    pdf_reader = PdfReader(buffer)
    pageNumber = 0
    page = pdf_reader.pages[pageNumber]
    text = page.extract_text()
    pSec = (time.time() - start)
    pdfEndTime = str(datetime.timedelta(seconds=pSec)).split(".")
    pdfEndTime = pdfEndTime[0]
    
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
        print(answer)
        json_object = json.loads(strToJson)
        gptSec = (time.time() - start) 
        gptEndTime = str(datetime.timedelta(seconds=gptSec)).split(".")
        gptEndTime = gptEndTime[0]
    except :
        json_object = {"error" : "통신에러"}
    print("pdfEndTime : ", pdfEndTime)
    print("gptEndTime : ", gptEndTime)
    return json_object


@ITrouter.post("/modify")
async def modify(modifyResume : RequestEntity):
    print("시작")
    data = modifyResume.modify
    start = time.time()
    for d in data:
      type = d.type
      direction = d.direction
      eligibility = d.eligibility
      skill = d.skill
      selfIntroduction = d.selfIntroduction
    if type == 'modify':
        system_content = "You're the best resume editor"
    else :
        system_content = "You're the best inspector."
    ask = f"자기소개서 내용은{selfIntroduction}이고; 지원할 기업의 지원자격은 {eligibility} 이고; 내가 보유한 기술 스택은 {skill}이야; {type}받고 싶은 방향은 {direction}이야;"
    pre_prompt = f"한국어로 답변해줘; 자기소개서를 {type}해줘;"
    pre_prompt2 = "Json 타입 분리해줘; 분리하는 형식은 {gptAnswer : gpt 답변내용 , SelfIntroduction : selfIntroduction[{title : title , content : cotnet},{...}, ]};"
    pre_prompt3 = "gptAnswer = 너의 답변을 여기에 담아줘; SelfIntroduction = 수정된 자소서 내용이 들어가야되 \n\n"
    try :
        answer = post_gap(system_content , pre_prompt + pre_prompt2 + pre_prompt3 + ask)
        strToJson = answer
        print(strToJson)
        json_object = json.loads(strToJson)
        gptSec = (time.time() - start) 
        gptEndTime = str(datetime.timedelta(seconds=gptSec)).split(".")
        gptEndTime = gptEndTime[0]
        print("gptEndTime : ", gptEndTime)
    except :
        json_object = {"error" : "통신에러"}
    return json_object


@ITrouter.post("/modifyResume")
async def ImageToPdf(file : UploadFile=File(...)):
    try :
        contents = await file.read()
        buffer = io.BytesIO(contents) 
        pil_image = Image.open(buffer)
        print(pil_image.mode) 
        pdf_bytes = io.BytesIO()
        pil_image.save(pdf_bytes, format='PDF')
        print(pil_image.mode) 
        pdf_bytes.seek(0) 

        return Response(content=pdf_bytes.getvalue(), media_type="application/pdf")
    except Exception as e :
        print(str(e))
        return 






 