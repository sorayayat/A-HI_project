from fastapi import FastAPI, Depends, Path, HTTPException
from interview.interview import Interview_router
from fastapi.middleware.cors import CORSMiddleware
from inspection.inspection import ITrouter
from company.posting import COrouter
from chatbot.chatbot import CBrouter
from resume.resume import resume_router
import openai


app = FastAPI()

app.include_router(Interview_router)
app.include_router(ITrouter)
app.include_router(COrouter)
app.include_router(CBrouter)
app.include_router(resume_router)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def main():

    return "추론서버"
