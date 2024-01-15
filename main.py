from fastapi import FastAPI, Depends, Path, HTTPException
from interview.interview import Interview_router
from fastapi.middleware.cors import CORSMiddleware

from company.posting import POrouter
from chatbot.chatbot import CBrouter
from recommendation.recommendation import RErouter
from recommendation.likePosting import LIrouter
from fastapi.staticfiles import StaticFiles


from interview.userinterview import userInterViewrouter
# from chatbot.chatbot import create_chatbot_router

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")


app.include_router(CBrouter)

app.include_router(userInterViewrouter)

app.include_router(POrouter)
app.include_router(RErouter)
app.include_router(LIrouter)



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