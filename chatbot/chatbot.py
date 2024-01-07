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



# 채팅 내용 조회 api
@CBrouter.post("/userchatrooms")
async def get_user_chatrooms(request_body: dict = Body(...)):
    email = request_body.get("email")
    if not email:
        raise HTTPException(status_code=400, detail="Email is required")

    user_data = await db.chatrooms.find_one({"email": email})
    
    if user_data:
        chatrooms = user_data.get("chatroomList", [])
        # 각 채팅방에 프롬프트 정보 추가
        for room in chatrooms:
            room['prompt'] = room.get('prompt', 'Default prompt')  # 프롬프트가 없을 경우 디폴트 값 추가

        return chatrooms
    else:
        print("User data not found")
        return JSONResponse(content={"email": email, "chatroomList": []}, status_code=404)
    



# mongoDB 데이터 저장
async def update_chatroom(email, roomId, user_message, prompt, chatbot_response):
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
                room["prompt"] = prompt
                break

        if not chatroom_exists:
            # 채팅방이 존재하지 않는 경우 새로운 채팅방 생성
            user_data["chatroomList"].append({
                "roomId": roomId,
                "messageList": [
                    {"sender": "사용자", "content": user_message},
                    {"sender": "챗봇", "content": chatbot_response}
                ],
                "prompt": prompt
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
                    ],
                    "prompt": prompt
                }
            ]
        }
        await db.chatrooms.insert_one(new_user_data)



# 채팅방 삭제 api
@CBrouter.post("/deleteChatRoom")
async def delete_chatroom(request_data: dict = Body(...)):
    email = request_data.get("email")
    room_id = request_data.get("roomId")

    # db에서 사용자의 도큐먼트 찾기
    user_data = await db.chatrooms.find_one({"email": email})

    if user_data:
        # 해당 사용자 채팅방 목록에서 특정 roomId를 가진 채팅방 찾아서 삭제
        new_chatroom_list = [room for room in user_data["chatroomList"] if room["roomId"] != room_id]
        await db.chatrooms.update_one({"email": email}, {"$set": {"chatroomList": new_chatroom_list}})
        return {"detail": "채팅방 삭제 성공"}
    else:
        raise HTTPException(status_code=404, detail="유저가 존재하지 않습니다")





# 이전 채팅 기록을 포함하여 GPT 프롬프트 생성
def create_gpt_prompt(previous_chat, new_user_message, chatbot_response, prompt_type):
    # 이전 채팅 기록이 없을 때만 기본 프롬프트를 설정
    if not previous_chat:
        if prompt_type == "신입":
            base_prompt = f""" 
                답변하실 때는 아래의 규칙을 꼭 지켜주시기 바랍니다.
                1. 맨 처음 대화에 답변할 때 "안녕하세요! 신입 개발자 준비생이시군요!"라는 인사말로 시작한 뒤 이어서 답변해주세요.
                2. 개발자들이 경력 개발자들의 이직 이력서를 작성할 수 있도록 도와주는 상황입니다.
                3. 사용자에게 이름, 학력, 백앤드와 프론트엔드 중 원하는 직무, 본인의 기술 스택, 프로젝트 경험, 자격증에 대한 정보를 필수적으로 추출합니다.
                4. 각 항목에 대한 사용자의 답변 중 부족하다고 느껴지는 부분이 있으면 해당 항목에 대한 내용을 유도하는 질문을 합니다.
                5. 다른 곳에서 정보를 찾는 것을 절대 권장하지 않습니다.
                6. 한국어로 존댓말을 사용해야 하며, AI임을 언급하지 않고 인간의 조언과 전문적인 지식을 제공해야 합니다.
                7. 답은 명확하고 구체적이어야 하며, gpt의 능력을 최대한 활용해야 합니다.
                8. 사용자가 자신의 정보를 단순 나열만한 이력서를 작성하는 것과 깔끔하고 보기 쉬운 이력서를 작성하는 것은 전혀 다른 이야기라는 것을 알게 합니다.
                9. 베테랑 개발자 출신 인터뷰어로서 어떤 항목이 필요한지, 항목의 우선순위는 무엇인지, 신입 개발자의 이력서에 무엇을 넣어야 하는지 안내해야 합니다.
                10. 인사는 대화가 시작될 때 맨 처음 한번만 합니다. 이후 답변에서는 인사를 하지 말아주세요.
            """
        elif prompt_type == "경력직":
            base_prompt = f""" 
                답변하실 때는 아래의 규칙을 꼭 지켜주시기 바랍니다.
                1. 맨 처음 대화에 답변할 때 "안녕하세요! 이직을 원하는 경력직 개발자시군요!"라는 인사말로 시작한 뒤 이어서 답변해주세요.
                2. 개발자들이 경력 개발자들의 이직 이력서를 작성할 수 있도록 도와주는 상황입니다.
                3. 사용자에게 이름, 학력, 백앤드와 프론트엔드 중 원하는 직무, 본인의 기술 스택, 경력 상세 내용, 자격증에 대한 정보를 필수적으로 추출합니다.
                4. 각 항목에 대한 사용자의 답변 중 부족하다고 느껴지는 부분이 있으면 해당 항목에 대한 내용을 유도하는 질문을 합니다.
                5. 다른 곳에서 정보를 찾는 것을 절대 권장하지 않습니다.
                6. 한국어로 존댓말을 사용해야 하며, AI임을 언급하지 않고 인간의 조언과 전문적인 지식을 제공해야 합니다.
                7. 답은 명확하고 구체적이어야 하며, gpt의 능력을 최대한 활용해야 합니다.
                8. 사용자가 자신의 정보를 단순 나열만한 이력서를 작성하는 것과 깔끔하고 보기 쉬운 이력서를 작성하는 것은 전혀 다른 이야기라는 것을 알게 합니다.
                9. 베테랑 개발자 출신 인터뷰어로서 어떤 항목이 필요한지, 항목의 우선순위는 무엇인지, 경력 개발자의 이력서에 무엇을 넣어야 하는지 안내해야 합니다.
                10. 인사는 대화가 시작될 때 맨 처음 한번만 합니다. 이후 답변에서는 인사를 하지 말아주세요.
            """
        else:
            base_prompt = "기본 프롬프트 내용"
        full_prompt = base_prompt
    else:
        full_prompt = previous_chat

    # 새로운 채팅 기록 추가
    updated_chat = f"사용자: {new_user_message}\n챗봇: {chatbot_response}"
    print("============================ [create_gpt_prompt] 새로운 채팅기록 추가 updated_chat ============================ \n", updated_chat)
    full_prompt += f"\n{updated_chat}"
    print("============================ [create_gpt_prompt] 새로운 채팅기록 추가 full_prompt ============================ \n", full_prompt)

    return full_prompt




# 이전 대화의 시스템 콘텐츠 저장할 딕셔너리
previous_system_content = {}

@CBrouter.post("/")
async def chatbot_endpoint(message: User):
    user_message = message.message
    prompt_type = message.prompt

    # 이전 대화 내용을 previous_system_content 딕셔너리에서 가져오기
    previous_chat = previous_system_content.get((message.email, message.roomId), "")    
    print("================================= Previous chat ================================= \n", previous_chat)

    # 새로운 GPT 프롬프트 생성
    full_prompt = create_gpt_prompt(previous_chat, user_message, "", prompt_type)
    print("================================= Full prompt ================================= \n", full_prompt)

    gpt_response = openai.ChatCompletion.create(
        model=MODEL,
        messages=[
            {"role": "system", "content": full_prompt},
            {"role": "user", "content": user_message}
        ]
    )

    chatbot_response = gpt_response["choices"][0]["message"]["content"]

    # 이전 대화 내용 업데이트
    updated_chat = f"사용자: {user_message}\n챗봇: {chatbot_response}"
    previous_system_content[(message.email, message.roomId)] = full_prompt + f"\n{updated_chat}"
    print("============================== Updated previous_system_content ========================================== \n", previous_system_content[(message.email, message.roomId)])

    await update_chatroom(
        email=message.email,
        roomId=message.roomId,
        user_message=user_message,
        prompt=message.prompt,
        chatbot_response=chatbot_response
    )

    return {"gptMessage": chatbot_response}



#  # 채팅 내용 분석 및 추출 api
# @CBrouter.post("/analyze")
# async def chatdata_analyze()