from sqlalchemy import Integer, String, Column
from database import Base, engine

# Database Models
class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashedPassword = Column(String)

# Table creation helper, called from main.py on startup
async def init_db():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
