from fastapi import FastAPI, APIRouter, Body, File, Request, UploadFile, Depends, Form
import openai
from pydantic import BaseModel

Interview_router = APIRouter(prefix='/interview')

openai.api_key = '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'

# data = 'company/test1.txt'

class InterviewData(BaseModel):
    searchQuery : str


# 클라이언트에서 정보를 받아서 모델에 질문을 생성한다.
@Interview_router.get('/')
async def AIiterview(searchQuery: InterviewData):
    
    question = gpt_question(searchQuery.searchQuery)
    print(searchQuery)
    return {"question" : question} 

# 사용자에 답변을 받아서 피드백 해준다
@Interview_router.post('/sendAnswer')
async def AI_question(answer: str = Body(...)):
   feedback = gpt_feedback(answer)
   return {"feedback": feedback}






def gpt_question(data):
  response = openai.ChatCompletion.create(
      model="gpt-3.5-turbo", # 필수적으로 사용 될 모델을 불러온다.
      frequency_penalty=0.5, # 반복되는 내용 값을 설정 한다.
      temperature=0.6,
      messages=[
              {"role": "system", "content": "너는 면접관이야"},
              {"role": "system", "content": f"{data}에서 기술과 관련된 부분을 질문해줘"},           
              {"role": "system", "content": "세가지 정도로 질문해줘 "},           
                       
          ]
      
      )

  output_text = response["choices"][0]["message"]["content"]
  print(output_text)
  return output_text

def gpt_feedback():
   response = openai.ChatCompletion.create(
      model="gpt-3.5-turbo",
      temperature=0.6,
      messages=[
          {"role": "system", "content": "너는 면접관이야"},
          {"role": "system", "content": f"{a}에 대해 면접자의 대답을 들어줘"},
          {"role": "system", "content": "어떻게 말하면 더 좋을지 면접자에게 답해줘"},
          
      ]
   )