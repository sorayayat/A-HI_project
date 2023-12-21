from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from chatbot.chatbot import CBrouter


app = FastAPI()


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