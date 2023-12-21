from docx import Document
from typing import List
from pydantic import BaseModel, EmailStr
import openai
from configset.config import getAPIkey

# 이력서 데이터를 위한 Pydantic 모델
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
    

def call_openai_gpt(messages, model="gpt-4", temperature=0.7, max_tokens=1000):
    openai.api_key = getAPIkey()
    response = openai.ChatCompletion.create(
        model=model,
        messages=messages,
        temperature=temperature,
        max_tokens=max_tokens
    )
    return response