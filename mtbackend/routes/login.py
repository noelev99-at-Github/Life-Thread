from fastapi import FastAPI, Depends, HTTPException, Request, APIRouter
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from passlib.context import CryptContext

from database import get_db 
from models import User
from schemas import LoginRequest

router = APIRouter()

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Login endpoint
@router.post("/login")
async def login(data: LoginRequest, request:Request, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User).where(User.email == data.email))
    user = result.scalar_one_or_none()
    if not user or not pwd_context.verify(data.password, user.hashedPassword):
        raise HTTPException(status_code=400, detail="invalid email or password")
    
    request.session["user"] = user.id

    return {"status":"ok", "message": "Login Successful"}