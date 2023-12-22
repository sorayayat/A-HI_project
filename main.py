from fastapi import FastAPI
from interview.interview import Interview_router
from fastapi.middleware.cors import CORSMiddleware
# from inspection.inspection import ITrouter
from company.posting import COrouter
from chatbot.chatbot import CBrouter
from resume.resume import resume_router

app = FastAPI()

app.include_router(Interview_router)
# app.include_router(ITrouter)
app.include_router(COrouter)
app.include_router(CBrouter)
app.include_router(resume_router)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def main():

    return "추론서버"
#
# 각 기능 별로 컴포넌트 나누시면 React처럼 router 따서 사용하시면 됍니다.
# from fastapi import APIRouter
# router = APIRouter()
# @router.get("api 주소값")
# async def 함수명(매개변수):
#   함수 내용  
#  return 
# #

# #

