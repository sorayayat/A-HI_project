from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from company.posting import COrouter

app = FastAPI()

app.include_router(COrouter)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 통신할 URL 적어두면 돼요 나중에 지금은 테스트중 이니깐 모두 허용 상태 입니다. -강창규-
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