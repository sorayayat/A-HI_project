from motor.motor_asyncio import AsyncIOMotorClient

def get_database():
    client = AsyncIOMotorClient("mongodb://localhost:27017")
    return client.chatting
