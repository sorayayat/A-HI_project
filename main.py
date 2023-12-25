from fastapi import FastAPI
from interview.interview import Interview_router
from fastapi.middleware.cors import CORSMiddleware
from inspection.inspection import ITrouter
from fastapi.middleware.cors import CORSMiddleware
from company.posting import COrouter
from chatbot.chatbot import CBrouter
from dotenv import dotenv_values
from pymongo import MongoClient
from routers import route

config = dotenv_values()

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


# mongodb connectivity
@app.on_event("startup")
def startup():
    app.mongodb_client = MongoClient(config["MONGO_URL"])
    app.database = app.mongodb_client[config["MONGO_DB"]]

# to close the mongodb connectivity when we shutdown
@app.on_event("shutdown")
def shutdown():
    app.mongodb_client.close()


@app.get("/")
async def main():

    return "추론서버"


# to include the routes
app.include_router(route.router)

