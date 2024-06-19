from fastapi import APIRouter, Request, Body, Response, status
from typing import List
from models.user import UserSchema, UpdateUsersSchema
from fastapi.encoders import jsonable_encoder

router = APIRouter()

# get users list
@router.get("/users", response_model=List[UserSchema])
def getUsers(request: Request):
    users = request.app.database["users"].find(limit=100)
    return users

# add user
@router.post("/user/add", response_model=UserSchema)
def addUser(request: Request, user: UserSchema = Body(...)):
    user = jsonable_encoder(user)
    new_user = request.app.database["users"].insert_one(user)
    create_user = request.app.database["users"].find_one(
        {"_id":new_user.inserted_id}
    )
    return create_user


# update user
@router.put("/user/{id}", response_model=UserSchema)
def updateUser( id: str, request: Request, user : UpdateUsersSchema = Body(...)):
    # validate
    user = {k:v for k,v in user.dict().items() if v is not None}

    if len(user) >= 1:
        update_result = request.app.database['users'].update_one(
            {"_id": id}, {"$set":user}
        )
        
        if update_result.modified_count == 0:
            return "User is ont found"
        
        exit_user = request.app.databae['users'].find_one(
            {"_id": id}
        )

        return exit_user

    return "User not found"    



# to delete user by id
@router.delete("/user/{id}")
def deleteUser(request: Request, id: str, response: Response):
    delete_result = request.app.database["users"].delete_one(
        {"_id": id}
    )

    if delete_result.deleted_count == 1:
        response.status_code = status.HTTP_204_NO_CONTENT
        return response
    
    return "User Not found"