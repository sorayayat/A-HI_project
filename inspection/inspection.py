from fastapi import APIRouter , Request
from typing import List
from pydantic import BaseModel
from inspection import inspectionPrompt

ITrouter = APIRouter(prefix="/inspection")

class Ask(BaseModel):
    introductionTitle : List[str]
    keyword : List[str]
    content : List[str]
    title : str


@ITrouter.post("/aks")
async def ask(ask : Ask):
    result = inspectionPrompt.create_prediction_prompt(ask)
    print(f"result : {result}")
    return {"status" : 200 , "result" : result}
