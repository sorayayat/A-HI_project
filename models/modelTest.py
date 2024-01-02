from sqlalchemy import Column, Integer, TEXT, VARCHAR, TIMESTAMP
from sqlalchemy.sql import func

# databasedatabase.py 로부터 Base class 를 가져와서
from db.database import Base

# Base class 를 상속받아 Translate class 를 만듭니다.
# (이러한 클래스는 SQLAlchemy 모델입니다.)
class Translate(Base):
	# 데이터베이스에서 사용할 테이블의 이름을 SQLAlchemy에 알려줍니다.
    __tablename__ = "translate"

	# 모델 클래스의 attribute/column 을 만듭니다.
    id = Column(Integer, primary_key=True, nullable=False, autoincrement=True)
    src_lang = Column(VARCHAR(3), nullable=False)
    src = Column(TEXT, nullable=False)
    tgt_lang = Column(VARCHAR(3), nullable=False)
    mt = Column(TEXT, nullable=False)
    created_at = Column(TIMESTAMP(timezone=True), nullable=False, server_default=func.now())
    updated_at = Column(TIMESTAMP(timezone=True), nullable=False, server_default=func.now(), onupdate=func.now())