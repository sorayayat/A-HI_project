from fastapi import APIRouter
import openai
from typing import List
from pydantic import BaseModel
from configset.config import getAPIkey, getModel
import os
from .database import get_database
from fastapi import HTTPException
from fastapi.responses import JSONResponse
from fastapi import Body
from ..main import wsConnection

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



# 채팅 내용 조회 api
@CBrouter.post("/userchatrooms")
async def get_user_chatrooms(request_body: dict = Body(...)):
    email = request_body.get("email")
    if not email:
        raise HTTPException(status_code=400, detail="Email is required")

    user_data = await db.chatrooms.find_one({"email": email})
    
    if user_data:
        return user_data.get("chatroomList", [])
    else:
        print("User data not found")
        return JSONResponse(content={"email": email, "chatroomList": []}, status_code=404)



# mongoDB 데이터 저장 함수
async def update_chatroom(email, roomId, user_message, chatbot_response):
    user_data = await db.chatrooms.find_one({"email": email})

    if user_data:
        # 이미 해당 이메일에 대한 데이터가 있는 경우
        chatroom_exists = False
        for room in user_data.get("chatroomList", []):
            if room["roomId"] == roomId:
                # 해당 roomId가 이미 존재하는 경우
                chatroom_exists = True
                # 저장할 데이터 구조
                room["messageList"].append({"sender": "사용자", "content": user_message})
                room["messageList"].append({"sender": "챗봇", "content": chatbot_response})
                break

        if not chatroom_exists:
            # 채팅방이 존재하지 않는 경우 새로운 채팅방 생성
            user_data["chatroomList"].append({
                "roomId": roomId,
                "messageList": [
                    {"sender": "사용자", "content": user_message},
                    {"sender": "챗봇", "content": chatbot_response}
                ]
            })

        # 업데이트된 데이터베이스 정보를 업데이트
        await db.chatrooms.update_one({"email": email}, {"$set": user_data}, upsert=True)
    else:
        # 해당 이메일에 대한 데이터가 없는 경우 새로운 데이터 생성
        new_user_data = {
            "email": email,
            "chatroomList": [
                {
                    "roomId": roomId,
                    "messageList": [
                        {"sender": "사용자", "content": user_message},
                        {"sender": "챗봇", "content": chatbot_response}
                    ]
                }
            ]
        }
        await db.chatrooms.insert_one(new_user_data)


# gpt 응답 반환 api
@CBrouter.post("/")
async def chatbot_endpoint(message: User):
    user_message = message.message
    prompt_type = message.prompt

    system_message = read_prompt_file(prompt_type)

    gpt_response = openai.ChatCompletion.create(
        messages=[
            {"role": "system", "content": system_message},
            {"role": "user", "content": user_message}
        ],
        model=MODEL,
    )

    chatbot_response = gpt_response["choices"][0]["message"]["content"]

    await update_chatroom(
        email=message.email,
        roomId=message.roomId,
        user_message=user_message,
        chatbot_response=chatbot_response
    )
    
     # 데이터 완성도 확인
    if check_data_complete(message.email, message.roomId):
        # 특정 클라이언트의 웹소켓 연결 찾기
        websocket = find_websocket_connection(message.email)
        if websocket:
            await wsConnection.send_message("데이터 수집 완료. 이력서를 생성할 수 있습니다.", websocket)

    return {"gptMessage": chatbot_response}


async def check_data_complete(email: str, roomId: str) -> bool:
    chatroom_data = await db.chatrooms.find_one({"email": email, "roomId": roomId})
    if chatroom_data:
        job_title_collected = False
        skills_collected = False

        for message in chatroom_data.get("messageList", []):
            # 메시지 내용을 분석하여 필요한 정보가 있는지 확인
            if "job_title" in message["content"]:
                job_title_collected = True
            if "skills" in message["content"]:
                skills_collected = True
            
            # 모든 필요 정보가 수집되었는지 확인
            if job_title_collected and skills_collected:
                return True

    return False

def find_websocket_connection(email: str):
    # 여기에 클라이언트 ID에 해당하는 웹소켓 연결 찾는 로직 구현
    # 예: manager의 active_connections를 검사
    return None  # 예시