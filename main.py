from fastapi import FastAPI
from interview.interview import Interview_router
import openai
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.include_router(Interview_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 통신할 URL 적어두면 돼요 나중에 지금은 테스트중 이니깐 모두 허용 상태 입니다. -강창규-
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def main():
    return 