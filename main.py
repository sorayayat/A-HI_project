from fastapi import FastAPI
from interview.interview import Interview_router
from fastapi.middleware.cors import CORSMiddleware
from inspection.inspection import ITrouter
from company.posting import POrouter
from chatbot.chatbot import CBrouter
from resume.resume import resume_router
from recommendation.recommendation import RErouter


app = FastAPI()


app.include_router(Interview_router)
app.include_router(ITrouter)
app.include_router(POrouter)
app.include_router(CBrouter)
app.include_router(resume_router)
app.include_router(RErouter)


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
