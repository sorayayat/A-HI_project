from fastapi import FastAPI
from interview.interview import Interview_router
from fastapi.middleware.cors import CORSMiddleware
from inspection.inspection import ITrouter
from fastapi.middleware.cors import CORSMiddleware
from company.posting import COrouter
from chatbot.chatbot import CBrouter


app = FastAPI()


app.include_router(Interview_router)
app.include_router(ITrouter)
app.include_router(COrouter)
app.include_router(CBrouter)


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
