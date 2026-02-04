from pydantic import BaseModel
from datetime import date

# Pydantic model for login
class LoginRequest(BaseModel):
    email: str
    password: str

# Authentication 
class UserResponse(BaseModel):
    status: str
    user_id: int

class LifeLessonEntry(BaseModel):
    ll_entry: str

class JournalEntry(BaseModel):
    date: date
    title: str
    entry: str
