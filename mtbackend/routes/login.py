from fastapi import FastAPI, Depends, HTTPException, Request, APIRouter
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
import bcrypt  # Import the core library

from database import get_db 
from models import User
from schemas import LoginRequest

router = APIRouter()

# Helper function for verification
def verify_password(plain_password: str, hashed_password: str) -> bool:
    # bcrypt requires bytes, here we encode the strings
    return bcrypt.checkpw(
        plain_password.encode('utf-8'), 
        hashed_password.encode('utf-8')
    )

@router.post("/login")
async def login(data: LoginRequest, request: Request, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User).where(User.email == data.email))
    user = result.scalar_one_or_none()

    # Direct bcrypt verification
    if not user or not verify_password(data.password, user.hashedPassword):
        raise HTTPException(status_code=400, detail="invalid email or password")
    
    request.session["user"] = user.id

    return {"status": "ok", "message": "Login Successful"}