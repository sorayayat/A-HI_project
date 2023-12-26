from fastapi import APIRouter , Request , Form , HTTPException
from pydantic import BaseModel
from typing import List
import chromadb
from chromadb.db.base import UniqueConstraintError
from sentence_transformers import SentenceTransformer
import openai
from typing import List, Optional
from fastapi.responses import JSONResponse
import requests
from datetime import datetime
from transformers import BertTokenizer



model = SentenceTransformer('snunlp/KR-SBERT-V40K-klueNLI-augSTS')

client = chromadb.Client()


from datetime import datetime

def encode_field(value):
    try:
        # 텍스트 데이터 또는 날짜 데이터인 경우에만 임베딩 수행
        if isinstance(value, str):
            return model.encode(value)
        elif isinstance(value, datetime):
            # ISO 8601 형식의 문자열로 변환
            iso_format = value.isoformat()
            return model.encode(iso_format)
        elif isinstance(value, list):
            # 리스트인 경우 각 항목에 대해 임베딩 수행
            return [model.encode(str(item)) for item in value]
        elif isinstance(value, dict):
            # 딕셔너리인 경우 각 값에 대해 임베딩 수행
            return {key: model.encode(str(val)) for key, val in value.items()}
        else:
            return value  # None인 경우 그대로 반환
    except Exception as e:
        print(f"Error encoding field: {value}, {e}")
        raise ValueError(f"Error encoding field: {value}, {e}")



client = chromadb.PersistentClient()

openai.api_key = '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'

POrouter = APIRouter(prefix="/posting")

class WorkTypeDTO(BaseModel):
    workCode: int
    workConditions: str
    postingCode: int

class SkillDTO(BaseModel):
    skillCode: int
    skillName: str
    postingCode: int

class PostingExperienceDTO(BaseModel):
    experienceCode: int
    experienceLevel: str
    postingCode: int

class CompanyDTO(BaseModel):
    companyId: int
    email: Optional[str]
    password: Optional[str]
    phoneNumber: Optional[str]
    company: str
    companyType: str
    employeesNumber: int
    establishmentDate: datetime
    companyHomepage: Optional[str]

class PostingDTO(BaseModel):
    postingCode: int
    postingDate: str
    endDate: str
    education: str
    viewCount: int
    location: str
    position: str
    closingForm: str
    content: str
    postingTitle: str 
    selectedCareer: Optional[str]
    selectedConditions: Optional[str]
    selectedSkills: Optional[str]
    workTypeList: List[WorkTypeDTO]
    skillList: List[SkillDTO]
    postingExperienceList: List[PostingExperienceDTO]
    company: CompanyDTO


@POrouter.post("/regist")
async def registCompany(posting: PostingDTO):
    postingCode = posting.postingCode

    

    encoded_fields = {
        "postingTitle": model.encode(str(posting.postingTitle)),
        "postingDate": model.encode(str(posting.postingDate)),
        "endDate": model.encode(str(posting.endDate)),
        "education": model.encode(str(posting.education)),
        "viewCount": model.encode(str(posting.viewCount)),
        "location": model.encode(str(posting.location)),
        "position": model.encode(str(posting.position)),
        "closingForm": model.encode(str(posting.closingForm)),
        "content": model.encode(str(posting.content)),
        "workTypeList": [
            {
                "workCode": model.encode(str(work.workCode)),
                "workConditions": model.encode(str(work.workConditions)),
                "postingCode": model.encode(str(postingCode))
            }
            for work in posting.workTypeList
        ],
        "skillList": [
            {
                "skillCode": model.encode(str(skill.skillCode)),
                "skillName": model.encode(str(skill.skillName)),
                "postingCode": model.encode(str(postingCode))
            }
            for skill in posting.skillList
        ],
        "postingExperienceList": [
            {
                "experienceCode": model.encode(str(exp.experienceCode)),
                "experienceLevel": model.encode(str(exp.experienceLevel)),
                "postingCode": model.encode(str(postingCode))
            }
            for exp in posting.postingExperienceList
        ],
        "company": {
            "companyId": model.encode(str(posting.company.companyId)),
            "company": model.encode(str(posting.company.company)),
            "companyType": model.encode(str(posting.company.companyType)),
            "employeesNumber": model.encode(str(posting.company.employeesNumber)),
            "establishmentDate": model.encode(str(posting.company.establishmentDate.strftime('%Y-%m-%d'))),
            "companyHomepage": model.encode(str(posting.company.companyHomepage)),
        }
    }


    try:
    # ChromaDB에 데이터 저장
        collection_name = "posting" + str(postingCode)
        collection = client.create_collection(name=collection_name)

        embeddings = encoded_fields

        data = {
        "embeddings": [list(embedded_field) for embedded_field in encoded_fields.values()],
        "documents": list(encoded_fields.keys()),
        "metadatas": [{"source": "your_source"}] * len(encoded_fields),
        "ids": [str(postingCode)]
        }

        collection.add(data)
        
        print("데이터가 성공적으로 등록되었습니다.")
    except Exception as e:
        print(f"데이터 등록 중 오류 발생: {str(e)}")

    return "gd"

@POrouter.get("/get/{postingCode}")
async def get_posting(postingCode: int):
    try:
        # ChromaDB에서 조회
        collection_name = "posting{0}".format(postingCode)
        collection = client.get_collection(name=collection_name)
        result = collection.query(
            query_texts=["java"],
            n_results=3
        )

        if result:
            # 결과 반환
            print(result)
            return JSONResponse(content=result, status_code=200)
        else:
            raise HTTPException(status_code=404, detail="Posting not found")
    except Exception as e:
        print(f"Error in get_posting: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")



