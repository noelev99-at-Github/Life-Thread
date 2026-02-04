from sqlalchemy import Integer, String, Column, Date, Text, ForeignKey
from database import Base, engine

# Database Models
class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashedPassword = Column(String)

class LifeLesson(Base):
    __tablename__ = "lifelesson"
    user_id = Column(Integer, ForeignKey("users.id"))
    id = Column(Integer, primary_key=True, index=True)
    ll_entry = Column(Text)

class JournalEntry(Base):
    __tablename__ = "journalentries"
    user_id = Column(Integer, ForeignKey("users.id"))
    id = Column(Integer, primary_key=True, index=True)
    date = Column(Date)
    title = Column(String)
    entry = Column(Text)

# Table creation helper, called from main.py on startup
async def init_db():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
