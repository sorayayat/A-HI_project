from fastapi import APIRouter , Request , UploadFile , File
from PyPDF2 import PdfReader
from typing import List
from pydantic import BaseModel
from inspection import inspectionPrompt
import io

ITrouter = APIRouter(prefix="/inspection")

class Ask(BaseModel):
    introductionTitle : List[str]
    keyword : List[str]
    content : List[str]
    title : str


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

    print(f'{text}')
    print(type(text))
    # 내일 가서 gpt 한테 해당 내용을 키 와 값으로 구별해줘 을 붙이면 key&value로 구별해주니 키&value로 분류 하고 다시 view 단으로 쏴주기
    return {"message" : "gogo"}