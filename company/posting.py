from fastapi import APIRouter , Request , Form , HTTPException
from pydantic import BaseModel
from typing import List
import chromadb
from chromadb.db.base import UniqueConstraintError
from sentence_transformers import SentenceTransformer
import openai
from typing import List
from fastapi.responses import JSONResponse
import requests


model = SentenceTransformer('snunlp/KR-SBERT-V40K-klueNLI-augSTS')

client = chromadb.PersistentClient()


COrouter = APIRouter(prefix="/posting")

class CompanyRegistration(BaseModel):
    postingTitle : str
    location: str
    education: str
    selectedCareer: List[str]
    selectedConditions: List[str]
    position: str
    selectedSkills: List[str]
    content: str
    endDate : str
    closingForm : str

@COrouter.post("/regist")
async def registCompany(
    postingTitle: str = Form(...),
    location: str = Form(...),
    education: str = Form(...),
    selectedCareer: List[str] = Form(...),
    selectedConditions: List[str] = Form(...),
    position: str = Form(...),
    selectedSkills: List[str] = Form(...),
    content: str = Form(...),
    endDate: str = Form(...),
    closingForm: str = Form(...),
):
    data = CompanyRegistration(
        
        postingTitle = postingTitle,
        location=location,
        education=education,
        selectedCareer=selectedCareer,
        selectedConditions=selectedConditions,
        position=position,
        selectedSkills=selectedSkills,
        content=content,
        endDate = endDate,
        closingForm = closingForm,
    )

    print(data)
    
    

    # Spring Boot 엔드포인트 URL 정의
    spring_boot_endpoint = "http://localhost:8001/posting/regist"

    try:
        # Spring Boot 애플리케이션으로 POST 요청 보내기
        response = requests.post(spring_boot_endpoint, json=data.dict())

        # 응답 확인
        response.raise_for_status()
        return JSONResponse(content={"message": "Success"}, status_code=200)
    except requests.exceptions.RequestException as e:
        # 오류 처리
        raise HTTPException(status_code=500, detail=f"Failed to send data: {e}")




# try:
#     answers = client.create_collection(name="answers")
# except UniqueConstraintError:
#     pass  # 이미 존재하면 무시

# @COrouter.get("/list")
# async def ask():
#     text = "내가 가진 프로그래밍 기술은 java, python, react, javaScript, html, css 이고 제일 잘하는건 java야"
#     embedding = model.encode(text, normalize_embeddings=True)
#     img = './imgs/img.png'

#     response = openai.ChatCompletion.create(
#         model="gpt-4-vision-preview",
#         temperature=0.1,
#         messages=[
#             {"role": "system", "content": "너는 면접관이야"},
#             {
#                 "type": "image",
#                 "image": {
#                     "img": img
#                 }
#             }
#         ]
#     )

#     output_text = response["choices"][0]["message"]["content"]
#     print(output_text)
#     return {"output_text": output_text}
