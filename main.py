from fastapi import FastAPI

app = FastAPI()

#
# 각 기능 별로 컴포넌트 나누시면 React처럼 router 따서 사용하시면 됍니다.
# from fastapi import APIRouter
# router = APIRouter()
# @router.get("api 주소값")
# async def 함수명(매개변수):
#   함수 내용  
#  return 
# #
