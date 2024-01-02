from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from configset.config import *

username = getuser()
password = getpw()
host = gethost()
port = getport()
db_name = getdbname()

# 1. SQLAlchemy 용 DB URL 생성
# mysql db에 연결
SQLALCHEMY_DATABASE_URL = f"mysql+pymysql://{username}:{password}@{host}:{port}/{db_name}?charset=utf8"

# 2. 첫 번째 단계는 SQLAlchemy "엔진"을 만드는 것입니다.
engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)

# 3. Make SessionLocal class
# 생성한 SQLAlchemy engine 을 물려서(?) 세션을 생성합니다.
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# 4. Base class 생성
Base = declarative_base()