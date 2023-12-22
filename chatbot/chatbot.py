from fastapi import APIRouter
import openai
from pydantic import BaseModel
from configset.config import getAPIkey, getModel


CBrouter = APIRouter(prefix="/chatbot")


OPENAI_API_KEY = getAPIkey()
openai.api_key = OPENAI_API_KEY
MODEL = getModel()


class Message(BaseModel):
    message: str


@CBrouter.post("/")
async def chatbot_endpoint(message: Message):
    data = str(message)
    user_message = data

    # gpt api 호출
    gpt_response = openai.ChatCompletion.create(
        messages=[
            {"role": "system", "content": "You are a resume consultant who generates resumes for job applicants."},
            {"role": "user", "content": user_message}
        ],
        model=MODEL,
    )

    # gpt로 받은 답변
    chatbot_response = gpt_response["choices"][0]["message"]["content"]
    print(chatbot_response)
    return {"gptMessage": chatbot_response}
