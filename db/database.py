from sqlalchemy import *
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from configset.config import *
import pymysql

# username = getuser()
# password = getpw()
# host = gethost()
# port = getport()
# db_name = getdbname()
dburl = geturl()

# 1. SQLAlchemy 용 DB URL 생성
# mysql db에 연결

SQLALCHEMY_DATABASE_URL = f"{dburl}"

# 2. 첫 번째 단계는 SQLAlchemy "엔진"을 만드는 것입니다.
engine = create_engine(
    SQLALCHEMY_DATABASE_URL,echo=True
)

metadata_obj = MetaData()
metadata_obj.bind = engine

# 3. Make SessionLocal class
# 생성한 SQLAlchemy engine 을 물려서(?) 세션을 생성합니다.
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

db = SessionLocal()

# 4. Base class 생성
Base = declarative_base()

some_table = Table("member",metadata_obj,autoload_with=engine)

# stmt = select(some_table)
# datas = db.execute(stmt)
# for data in datas:
#     print(data)



# # 조회
# stmt = select(some_table)
# datas = SessionLocal.execute(stmt)
# for data in datas:
#     print(data)

# # 입력
# stmt = insert(some_table).values()
# SessionLocal.execute(stmt)
# SessionLocal.commit()
# SessionLocal.close()
