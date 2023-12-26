from fastapi import APIRouter
import openai
from typing import List
from pydantic import BaseModel
from config.config import getAPIkey,getModel
import os
from .database import get_database


CBrouter = APIRouter(prefix="/chatbot")

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

db = get_database()


OPENAI_API_KEY = getAPIkey()
openai.api_key = OPENAI_API_KEY
MODEL = getModel()


class User(BaseModel):
    email: str
    roomId: str
    prompt: str
    message: str


def read_prompt_file(prompt_type: str) -> str:
    # 프롬프트 유형에 따라 파일명 매핑
    file_map = {
        "신입": "beginner_prompt.txt",
        "경력직": "experienced_prompt.txt"
    }

    file_name = os.path.join(BASE_DIR, file_map.get(prompt_type, ""))
    print(f"Trying to read file: {file_name}")

    # 파일이 존재하는지 확인하고 내용 읽기
    if os.path.exists(file_name):
        with open(file_name, "r", encoding="utf-8") as file:
            prompt_text = file.read()
            return prompt_text
    else:
        print("File not found or prompt type not recognized") 
        return "Default system message."



@CBrouter.post("/")
async def chatbot_endpoint(message: User):
    user_message = message.message
    prompt_type = message.prompt

    # 파일에서 시스템 메시지 읽기
    system_message = read_prompt_file(prompt_type)

    # GPT API 호출
    gpt_response = openai.ChatCompletion.create(
        messages=[
            {"role": "system", "content": system_message},
            {"role": "user", "content": user_message}
        ],
        model=MODEL,
    )

    chatbot_response = gpt_response["choices"][0]["message"]["content"]


    # MongoDB에 채팅 메시지 추가
    await db.chatrooms.update_one(
        {"email": message.email, "chatRoomId": message.roomId},
        {
            "$push": {
                "messageList": {
                    "userMessage": user_message,
                    "chatbotResponse": chatbot_response
                }
            }
        },
        upsert=True  # 존재하지 않으면 새 문서 생성
    )

    return {"gptMessage": chatbot_response}





