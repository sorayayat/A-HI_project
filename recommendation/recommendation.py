from fastapi import APIRouter , Request , Form , HTTPException
from pydantic import BaseModel
from typing import List
import chromadb
from chromadb.db.base import UniqueConstraintError
from sentence_transformers import SentenceTransformer
import openai
from typing import List, Optional
from fastapi.responses import JSONResponse
from datetime import datetime


model = SentenceTransformer('snunlp/KR-SBERT-V40K-klueNLI-augSTS')

client = chromadb.PersistentClient()

openai.api_key = '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'

RErouter = APIRouter(prefix="/recommendation")

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
    name: Optional[str]
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


@RErouter.post("/resume")
async def resume_recommendation(posting: List[PostingDTO]):
    print(posting)

    response_data = {"status": "success", "message": "Data received successfully"}
    print(response_data)
    return JSONResponse(content=response_data)

