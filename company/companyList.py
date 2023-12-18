from fastapi import APIRouter , Request , Form
from pydantic import BaseModel
from typing import List
import chromadb
from chromadb.db.base import UniqueConstraintError
from sentence_transformers import SentenceTransformer
import openai
from typing import List
from fastapi.responses import JSONResponse


model = SentenceTransformer('snunlp/KR-SBERT-V40K-klueNLI-augSTS')

client = chromadb.PersistentClient()

openai.api_key = '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'

COrouter = APIRouter(prefix="/company")

class CompanyRegistration(BaseModel):
    detailAddress: str
    education: str
    selectedCareer: List[str]
    selectedConditions: List[str]
    selectedJob: str
    selectedSkills: List[str]
    content: str

@COrouter.post("/regist")
async def registCompany(
    detailAddress: str = Form(...),
    education: str = Form(...),
    selectedCareer: List[str] = Form(...),
    selectedConditions: List[str] = Form(...),
    selectedJob: str = Form(...),
    selectedSkills: List[str] = Form(...),
    content: str = Form(...),
):
    
    data = CompanyRegistration(
        detailAddress=detailAddress,
        education=education,
        selectedCareer=selectedCareer,
        selectedConditions=selectedConditions,
        selectedJob=selectedJob,
        selectedSkills=selectedSkills,
        content=content,
    )

    # Process the data as needed
    print(data)

    return JSONResponse(content={"message": "Success"}, status_code=200)




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
