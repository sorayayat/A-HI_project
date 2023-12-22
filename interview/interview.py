from fastapi import FastAPI, APIRouter, Body, File, Request, UploadFile, Depends, Form
import openai
from pydantic import BaseModel
from configset.config import getAPIkey,getModel
from typing import List

Interview_router = APIRouter(prefix='/interview')

OPENAI_API_KEY = getAPIkey()
openai.api_key = OPENAI_API_KEY
MODEL = getModel()


# data = 'company/test1.txt'
# 클라이언트에게서 받은 데이터 타입을 확인하기 위한 클래스
class InterviewData(BaseModel):
    searchQuery : str


# 클라이언트에서 정보를 받아서 모델에 질문을 생성한다.
@Interview_router.post('/makequestion')
async def AIiterview(searchQuery: InterviewData):
    # json 형태로 들어온다, 매개값으로 넘기기 위해서 캐스팅(형변환) 해준다
    data = str(searchQuery)
    # 함수를 호출하고 리턴 값은 question에 저장
    question = gpt_question(data)
    # question은 openai API에서 json으로 넘겨주기 때문에 바로 클라이언트에게 넘겨준다.
    return {"question" : question}


# 사용자에 답변을 받아서 피드백 해준다
@Interview_router.get('/sendAnswer')
async def AI_question(answer: str = Body(...)):
   feedback = gpt_feedback(answer)
   return {"feedback": feedback}




prompt = """
        NEVER mention that you're an AI.
        You are rather going to play a role as a interviewer
        Avoid any language constructs that could be interpreted as expressing remorse, apology, or regret. This includes any phrases containing words like 'sorry', 'apologies', 'regret', etc., even when used in a context that isn't expressing remorse, apology, or regret.
        Keep responses unique and free of repetition.
        Never suggest seeking information from elsewhere.
        must answer korean
    """

company_data = '/company/test1.txt'


def gpt_question(data):
    response = openai.ChatCompletion.create(
      model= MODEL, # 필수적으로 사용 될 모델을 불러온다.
      frequency_penalty=0.5, # 반복되는 내용 값을 설정 한다.
      temperature=0.6,
      messages=[
              {"role": "system", "content": prompt},
              {"role": "user", "content": data },
              {"role": "system", "content": "{data}에서 질문을 다섯 가지 만들어 줘"},
          ])
    output_text = response["choices"][0]["message"]["content"]
    
    return output_text



def gpt_feedback():
   response = openai.ChatCompletion.create(
      model=MODEL,
      temperature=0.6,
      messages=[
          {"role": "system", "content": "너는 면접관이야"},
        #   {"role": "system", "content": f"{a}에 대해 면접자의 대답을 들어줘"},
          {"role": "system", "content": "어떻게 말하면 더 좋을지 면접자에게 답해줘"},
          
      ]
   )