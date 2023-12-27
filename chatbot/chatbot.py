from fastapi import APIRouter
import openai
from typing import List
from pydantic import BaseModel
from configset.config import getAPIkey, getModel
import os
from .database import get_database
from fastapi import HTTPException

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
@CBrouter.get("/chatrooms/{roomId}")
async def get_chatroom_data(roomId: str, email: str = None):
    if not email:
        raise HTTPException(status_code=400, detail="Email is required")

    user_data = await db.chatrooms.find_one({"email": email})
    
    if user_data:
        chatroom = next((room for room in user_data.get("chatroomList", []) if room["roomId"] == roomId), None)
        if chatroom:
            return chatroom
        else:
            return {"email": email, "roomId": roomId, "messageList": []}
    else:
        return {"email": email, "roomId": roomId, "messageList": []}
    


# 답변 생성 후 반환하는 api
async def update_chatroom(email, roomId, user_message, chatbot_response):
    user_data = await db.chatrooms.find_one({"email": email})

    if user_data:
        # 이미 해당 이메일에 대한 데이터가 있는 경우
        chatroom_exists = False
        for room in user_data.get("chatroomList", []):
            if room["roomId"] == roomId:
                # 해당 roomId가 이미 존재하는 경우
                chatroom_exists = True
                room["messageList"].append({
                    "userMessage": user_message,
                    "chatbotResponse": chatbot_response
                })
                break

        if not chatroom_exists:
            # 채팅방이 존재하지 않는 경우 새로운 채팅방 생성
            user_data["chatroomList"].append({
                "roomId": roomId,
                "messageList": [{
                    "userMessage": user_message,
                    "chatbotResponse": chatbot_response
                }]
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
                    "messageList": [{
                        "userMessage": user_message,
                        "chatbotResponse": chatbot_response
                    }]
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

    return {"gptMessage": chatbot_response}








# from fastapi import APIRouter
# import openai
# from typing import List
# from pydantic import BaseModel
# from configset.config import getAPIkey,getModel
# import os
# from .database import get_database
# from fastapi import HTTPException



# CBrouter = APIRouter(prefix="/chatbot")

# BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# db = get_database()


# OPENAI_API_KEY = getAPIkey()
# openai.api_key = OPENAI_API_KEY
# MODEL = getModel()


# class User(BaseModel):
#     email: str
#     roomId: str
#     prompt: str
#     message: str



# def read_prompt_file(prompt_type: str) -> str:
#     # 프롬프트 유형에 따라 파일명 매핑
#     file_map = {
#         "신입": "beginner_prompt.txt",
#         "경력직": "experienced_prompt.txt"
#     }

#     file_name = os.path.join(BASE_DIR, file_map.get(prompt_type, ""))
#     print(f"Trying to read file: {file_name}")

#     # 파일이 존재하는지 확인하고 내용 읽기
#     if os.path.exists(file_name):
#         with open(file_name, "r", encoding="utf-8") as file:
#             prompt_text = file.read()
#             return prompt_text
#     else:
#         print("File not found or prompt type not recognized") 
#         return "Default system message."




# # 채팅 내용 조회 api
# # 사용자가 새 채팅방을 생성하고 첫 메시지를 보낼 때까지 DB에 저장되지 않으며, 
# # 첫 메시지가 전송되면 해당 채팅방이 DB에 생성되고 메시지가 저장 -> 불필요한 DB 저장 방지
# @CBrouter.get("/chatrooms/{roomId}")
# async def get_chatroom_data(roomId: str, email: str = None):
#     if not email:
#         raise HTTPException(status_code=400, detail="Email is required")

#     user_data = await db.chatrooms.find_one({"email": email})
    
#     if user_data:
#         chatroom = next((room for room in user_data.get("chatroomList", []) if room["roomId"] == roomId), None)
#         if chatroom:
#             return chatroom
#         else:
#             return {"email": email, "roomId": roomId, "messageList": []}
#     else:
#         return {"email": email, "roomId": roomId, "messageList": []}






# # 답변 생성 후 반환하는 api
# @CBrouter.post("/")
# async def chatbot_endpoint(message: User):
#     user_message = message.message
#     prompt_type = message.prompt

#     system_message = read_prompt_file(prompt_type)

#     gpt_response = openai.ChatCompletion.create(
#         messages=[
#             {"role": "system", "content": system_message},
#             {"role": "user", "content": user_message}
#         ],
#         model=MODEL,
#     )

#     chatbot_response = gpt_response["choices"][0]["message"]["content"]

#     await db.chatrooms.update_one(
#         {"email": message.email, "chatroomList.roomId": message.roomId},
#         {
#             "$push": {
#                 "chatroomList.$.messageList": {
#                     "userMessage": user_message,
#                     "chatbotResponse": chatbot_response
#                 }
#             }
#         },
#         upsert=True
#     )

#     return {"gptMessage": chatbot_response}





