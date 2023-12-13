from fastapi import APIRouter , Request

ITrouter = APIRouter(prefix="/inspection")

@ITrouter.post("/aks")
async def ask(request : Request):
    print(request)
    return {"status" : 200}
