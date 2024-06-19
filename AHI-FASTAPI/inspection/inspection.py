from fastapi import APIRouter , Request , UploadFile , File
from fastapi.responses import StreamingResponse , Response , JSONResponse
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
class PersonalInformation(BaseModel):
    name: str
    position: str
    dateOfBirth: str
    gender: str
    department: str
class ReaderDTO(BaseModel):
    PersonalInformation : PersonalInformation
    SelfIntroduction: List[SelfIntroduction]
class EligibilityDTO(BaseModel):
    eligibility : str
    job: str
    knowledge : str
    skills : str
class ModifyResumeDTO(BaseModel):
    direction: str
    eligibility: EligibilityDTO
    skill: List[str]
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
            response_format={ "type": "json_object" },
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
    text = ""
    for page in pdf_reader.pages:
        page_text = page.extract_text()
        if page_text :
            text += page_text + "\n"
    pSec = (time.time() - start)
    pdfEndTime = str(datetime.timedelta(seconds=pSec)).split(".")
    pdfEndTime = pdfEndTime[0]
    print("pdfEndTime : ", pdfEndTime)
    pre_prompt1 = "1.Keep the original content without summarizing it;"
    pre_prompt2 = "2.Separate the content into key and value, distinguishing between title and content.;"
    pre_prompt3 = "3.Separate the PersonalInformation and SelfIntroduction sections within the content."
    pre_prompt4 = "ex) ReaderDTO : {{PersonalInformation : name:name , email : email, github : github , phone : phone , education : education},{AwardsCertifications : [AwardsCertification]},{Skills : [Skillname]...},{Experience : company : company , duration : duration},{Projects : ProjectsTitle : ProjectsTitle , ProjectsContent : ProjectsContent...} ,{SelfIntroduction : title : title , content : content ...}};"
    pre_prompt5 = "4.You are a helpful assistant designed to output JSON."
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
        print("pdfEndTime : ", pdfEndTime)
        print("gptEndTime : ", gptEndTime)
    except :
        json_object = {"error" : "통신에러"}
    return json_object

@ITrouter.get("/getContent")
def get_content(request : Request) :
    print("시작")
    content = request.query_params.get("content")
    pre_prompt = """회사 공고의 대한 내용인데 주요업무와 지원 자격에 대한 내용만을 분류 해줄래?
                    {{job : job},{eligibility : eligibility},{knowledge : knowledge},{skills : skills}} Json 형식으로 반환 해주는데
                    key 값은 영어로 들어와야돼"""
    try :
        answer = post_gap(pre_prompt, content)
        if not isinstance(answer, dict):
            answer = json.loads(answer)
        return JSONResponse(content=answer , status_code=200)
    except :
        return JSONResponse(content= "에러 확인")
    
@ITrouter.post("/modify")
async def modify(modifyResume : RequestEntity):
    print("시작")
    data = modifyResume.modify
    print(f"data : {data}")
    start = time.time()
    eligibility = ""
    skill = ""
    selfIntroduction = ""
    direction = ""
    index = 0
    for d in data :
        for i, intro in enumerate(d.selfIntroduction):
            selfIntroduction += f"{i + 1}번째 자기소개서 제목은 {intro.title}이고 자기소개서 내용은 {intro.content} 이야 \n"
            index = index + 1
    selfIntroduction += f"{index} 개의 자기소개서를 수정해주는데"
    for d in data :
        for intro  in d.eligibility :
            eligibility += f"{intro},"
    for d in data :
        for intro  in d.skill :
            skill += f"{intro},"
    for d in data :
        d = d.direction
    print(eligibility)
    system_content = """너는AI 모델이 아닌 IT업계 인사 담당자 출신의 사람이야 회사의 취업 지원한 지원자의 이력서를 보고 객관적으로 판단해야돼
                    판단의 기준은 지원자의 기술 스택 과 지원하는 공고의 지원 자격을 보고 자기소개서를 판단 해줘야돼
                    판단을 다하고 나면 해당 자기소개서의 내용을 수정하고 자기소개서에서 보충해야되는 방향을 출력해주는데
                    출력하는 형식은 {gptAnswer : gptAnswer(수정팁) , SelfIntroduction : selfIntroduction[{title : title , content : cotnet},{title : title , content : cotnet},{...} ]}
                    형태로 출력해주면돼 자기소개서 내용 요약말고 글 정리만 하는데 더 상세하게 수정해줘.
                    그리고 너의 답변은 무조건 json 형태로 지켜야돼 json 형태 외 다른 데이터는 필요없어
                    """
    ask = f""" 자기소개서 {selfIntroduction} ; 지원할 회사의 지원 자격은 {eligibility}이고; 내가 보유한 기술 스택은 {skill}이야;
               그리고 내가 원하는 자기소개서 수정 방향은 {direction}이야 참고해서 자기소개서 내용을 변경해줘
               부족한점을 말해줬으면 좋겠어;"""
    # pre_prompt = f"한국어로 답변해줘; 자기소개서를 {type}해줘;"
    # pre_prompt2 = "Json 타입 분리해줘; 분리하는 형식은 {gptAnswer : gpt 답변내용 , SelfIntroduction : selfIntroduction[{title : title , content : cotnet},{...}, ]};"
    # pre_prompt3 = "gptAnswer = 너의 답변을 여기에 담아줘; SelfIntroduction = 수정된 자소서 내용이 들어가야되 \n\n"
    try :
        answer = post_gap(system_content , ask)
        strToJson = answer
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
        pdf_bytes = io.BytesIO()
        pil_image.save(pdf_bytes, format='PDF')
        pdf_bytes.seek(0)
        return Response(content=pdf_bytes.getvalue(), media_type="application/pdf")
    except Exception as e :
        print(str(e))
        return 






 