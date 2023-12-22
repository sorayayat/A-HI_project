from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr
from typing import List
from .resumegenerator import fill_template, generate_resume_content, save_resume_as_docx
from configset.config import getAPIkey

import openai

# OpenAI API 키 호출
OPENAI_API_KEY = getAPIkey()
openai.api_key = OPENAI_API_KEY

resume_router = APIRouter(prefix="/resume")

class ResumeData(BaseModel):
    name: str
    phone_number: str
    email: EmailStr
    job_title: str
    skills: List[str]
    experiences: List[str]
    projects: List[str]
    educations: List[str]
    awards_and_certifications: List[str]

@resume_router.post("/create-resume/")
async def create_resume(data: ResumeData):
    # OpenAI와 연동하여 이력서 내용 생성
    chat_response = generate_resume_content(data)
    if chat_response is None:
        raise HTTPException(status_code=500, detail="Error in generating resume content")

    # 이력서 내용을 context로 변환
    context = {
        'Name': data.name,
        'Phone': data.phone_number,
        'Email': data.email,
        'JobTitle': data.job_title,
        'Skills': ', '.join(data.skills),
        'Experiences': ', '.join(data.experiences),
        'Projects': ', '.join(data.projects),
        'Education': ', '.join(data.educations),
        'AwardsAndCertifications': ', '.join(data.awards_and_certifications),
    }

    # 이력서 템플릿 파일과 출력 파일 경로 설정
    template_path = 'tem/template.docx'  # 이력서 템플릿 파일 경로
    output_path = f'{data.name}_resume.docx'  # 생성될 이력서 파일 이름

    # fill_template 함수를 사용하여 이력서 문서 생성
    fill_template(template_path, output_path, context)
    
    return {"message": "Resume created successfully", "file_path": output_path}