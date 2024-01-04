from fastapi import FastAPI, Depends, Path, HTTPException
from interview.interview import Interview_router
from fastapi.middleware.cors import CORSMiddleware
from inspection.inspection import ITrouter
from company.posting import POrouter
from chatbot.chatbot import CBrouter
from resume.resume import resume_router
from recommendation.recommendation import RErouter
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from .chatbot.websocketConnection import WebsocketConnection

app = FastAPI()
wsConnection = WebsocketConnection()

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


@app.websocket("/ws/{email}")
async def websocket_endpoint(websocket: WebSocket, email: str):
    await wsConnection.connect(websocket)
    try:
        while True:
            # 클라이언트로부터 메시지 받기 (필요한 경우)
            data = await websocket.receive_text()
            # 여기에 추가 처리 로직 (필요한 경우)
    except WebSocketDisconnect:
        wsConnection.disconnect(websocket)
