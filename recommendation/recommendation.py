from fastapi import APIRouter, Request, Form, HTTPException, FastAPI, File, UploadFile
from pydantic import BaseModel
from typing import List
import chromadb
from chromadb.db.base import UniqueConstraintError
from sentence_transformers import SentenceTransformer
import openai
from typing import List, Optional
from fastapi.responses import JSONResponse
from datetime import datetime
from configset.config import getAPIkey, getModel
import pdfplumber
from io import BytesIO
from sentence_transformers import SentenceTransformer
import ast
from bs4 import BeautifulSoup
import httpx
import json
from sqlalchemy import *
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from configset.config import *


OPENAI_API_KEY = getAPIkey()
openai.api_key = OPENAI_API_KEY
MODEL = getModel()
UPLOAD_DIR = "recommendation/resumeImg"
client = chromadb.HttpClient(host="15.164.164.18", port=8005)
# client = chromadb.PersistentClient(path="C:\dev\jgsProject\chromaDB")

# 1. SQLAlchemy 용 DB URL 생성
dburl = geturl()

# mysql db에 연결
SQLALCHEMY_DATABASE_URL = f"{dburl}"

# 2. 첫 번째 단계는 SQLAlchemy "엔진"을 만드는 것입니다.
engine = create_engine(
    SQLALCHEMY_DATABASE_URL, echo=True
)

metadata_obj = MetaData()
metadata_obj.bind = engine


model = SentenceTransformer('snunlp/KR-SBERT-V40K-klueNLI-augSTS')

RErouter = APIRouter(prefix="/recommendation")


def gpt_question(data):

    response = openai.ChatCompletion.create(
        model=MODEL,  # 필수적으로 사용 될 모델을 불러온다.
        frequency_penalty=0.5,  # 반복되는 내용 값을 설정 한다.
        temperature=0.6,
        messages=[
            {
                "role": "user",
                "content": [
                    {"type": "text", "text": "{0}여기에 있는 데이터읽어줘".format(data)},
                    {"type": "text", "text": "읽은 데이터에서 experiences란에 경력 사항을 읽고 경력을 계산해서 1년이상이면 1년이상 3년이상이면 3년이상 5년이상 이면 5년이상이라고 텍스트 출력해줘"},
                    {"type": "text", "text": "만약 experiences란이 없다면 신입 이라고 출력해줘"},
                    {"type": "text", "text": "너는 아무말하지말고 경력에 대한 텍스트만 출력해줘"},
                    {"type": "text", "text": " '경력 :'  이런거 붙이지마 "},




                    #     {
                    #         "type": "image_url",
                    #         "image_url": {
                    #             "url": f"data:image/jpeg;base64,{data}",
                    #             "detail" : "high"
                    #   },
                    # },
                ],
            }
        ],
        max_tokens=1000,
    )
    output_text = response["choices"][0]["message"]["content"]

    return output_text


def gpt_selectCompany(postingSkill, resume, question):

    response = openai.ChatCompletion.create(
        model=MODEL,  # 필수적으로 사용 될 모델을 불러온다.
        frequency_penalty=0.5,  # 반복되는 내용 값을 설정 한다.
        temperature=0.6,
        response_format={"type": "json_object"},
        messages=[
            {
                "role": "user",
                "content": [
                    {"type": "text", "text": "{0}여기에 공고의 posting Code에 해당하는 각각의 스킬과 포지션을 읽어주세요".format(postingSkill)},
                    {"type": "text", "text": "{0}여기에 있는 내 이력서의 스킬 목록과 포지션이 '백'인지 '프론트앤드' 인지 읽어주세요.".format(resume)},
                    {"type": "text", "text": "이력서의 포지션이 백이면 백인공고 프론트엔드면 프론트엔드 공고를 선별해주세요. "},
                    {"type": "text", "text": "선별한 공고에서 가장 비슷한 기술스택을 가진 공고의 postingCode를 최대 5개 출력해주세요"},
                    {"type": "text", "text": "postingCode를 반드시 Json 형태로 뽑아 주세요." "{ matching_job_ids : [] } 형태로 뽑아 주세요."},

                ],
            }
        ],

    )
    output_text = response["choices"][0]["message"]["content"]

    return output_text


@RErouter.post("/resume")
async def get_posting(file: UploadFile = File(...)):

    print(file, "gdgd")

    # 파일을 비동기 방식으로 읽고 동기 방식으로 얻기
    content = await file.read()

    # filename = f"{str(uuid.uuid4())}.jpg"  # uuid로 유니크한 파일명으로 변경
    # file_path = os.path.join(UPLOAD_DIR, filename)

    with pdfplumber.open(BytesIO(content)) as pdf:
        # 각 페이지의 텍스트를 추출하여 리스트로 저장
        text_content = [page.extract_text() for page in pdf.pages]

    print(text_content)

    resume = "\n".join(text_content)

    print(resume)

    # with open(file_path, "wb") as fp:
    #     fp.write(content)

    question = gpt_question(resume)

    print(question)

    postingExperienceTable = Table(
        "posting_experience", metadata_obj, autoload_with=engine)

    stmt = select(postingExperienceTable).where(
        postingExperienceTable.c.experience_level == question)

    with engine.connect() as connection:
        results = connection.execute(stmt).fetchall()

    postingCode = [result.posting_code for result in results]
    if postingCode == null:
        postingCode = "공고가 없습니다"

    print(postingCode, "hhhh")

    skillTable = Table("skill", metadata_obj, autoload_with=engine)

    stmt = select(skillTable).where(skillTable.c.posting_code.in_(postingCode))
    # 3. Make SessionLocal class
    skill_data = []
    with engine.connect() as connection:
        results = connection.execute(stmt).fetchall()
    # 결과에서 skill_name을 추출
    skill_data = [(result.skill_name, result.posting_code)
                    for result in results]

    postingTable = Table("posting", metadata_obj, autoload_with=engine)

    stmt = select(postingTable).where(
        postingTable.c.posting_code.in_(postingCode))
    # 3. Make SessionLocal class
    position_data = []
    with engine.connect() as connection:
        results = connection.execute(stmt).fetchall()
    # 결과에서 skill_name을 추출
    position_data = [(result.position, result.posting_code)
                     for result in results]

    grouped_skills = {}
    for skill_name, posting_code in skill_data:
        if posting_code not in grouped_skills:
            grouped_skills[posting_code] = []
        grouped_skills[posting_code].append(skill_name)

    print(grouped_skills, "그룹 스킬")

    grouped_positions = {}
    for position, posting_code in position_data:
        if posting_code not in grouped_positions:
            grouped_positions[posting_code] = {"positions": []}
        grouped_positions[posting_code]["positions"].append(position)

    print(grouped_positions, "그룹 포지션")

    


    postingSkill = []
    # 그룹화된 skill_name을 출력
    for posting_code, skills in grouped_skills.items():
        postingSkill.append(
            f"Posting Code: {posting_code}, Skills: {', '.join(skills)}")

    print(postingSkill, "제발제발")

    # 그룹화된 skill_name을 JSON 형태로 출력
    result_json = []
    for posting_code, skills in grouped_skills.items():

        result_json.append({
            "Posting Code": posting_code,
            "Skills": skills,
            'position': grouped_positions[posting_code]['positions']
        })

    json_output = json.dumps(result_json, indent=2)
    print(json_output, " ㅆㅂ")

    # collection_name = "posting"
    # collection = client.get_collection(name=collection_name)

    # query_text = skill_names
    # query_embedding = model.encode(query_text)

    # result = collection.query(
    #     # query_texts=[model.encode("spring")],
    #     query_embeddings=[query_embedding.tolist()],
    #     n_results=5
    # )

    # print(result)

    # postingList = []

    # for i, (document_html, document_ids) in enumerate(zip(result['documents'][0], result['ids'][0])):
    #     soup = BeautifulSoup(document_html, 'html.parser')
    #     # 추출한 정보 출력 또는 사용
    #     print(f"Document {i + 1} ID: {document_ids}")
    #     print(f"Document {i + 1} Text:")
    #     print(soup.get_text(strip=True))

    #     postingData = document_ids , soup.get_text(strip=True)
    #     postingList.append('\n'.join(postingData))

    answer = gpt_selectCompany(json_output, resume, question)

    print(answer)

    answer = answer.replace("```json", "").replace("```", "").strip()

    print(answer)

    spring_server_url = "http://localhost:8001/recommendation/selectResume"

    #  # Spring 서버로 데이터 전송
    async with httpx.AsyncClient() as spring:
        response = await spring.post(spring_server_url, json=json.loads(answer), headers={'Content-Type': 'application/json'})

    if response.status_code == 200:
        print("데이터 전송 성공")

        return {"success": True, "response": response.json()}
    else:
        print("데이터 전송 실패")
    return {"success": False, "error": "Spring 서버로의 데이터 전송 실패"}
