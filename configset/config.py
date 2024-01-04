from starlette.config import Config
from dotenv import load_dotenv
env = Config(".env")
load_dotenv()
def getAPIkey():
    return env('OPENAI_API_KEY')
def getModel():
    return env('MODEL')

def geturl():
    return env('dburl')

# def getuser():
#     return env('USERNAME')

# def getpw():
#     return env('PASSWORD')

# def gethost():
#     return env('HOST')

# def getport():
#     return env('PORT')

# def getdbname():
#     return env('DBNAME')