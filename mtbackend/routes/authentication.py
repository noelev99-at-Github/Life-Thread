from fastapi import APIRouter, Request, HTTPException
from schemas import UserResponse 

router = APIRouter()

@router.get("/authenticate", response_model=UserResponse)
async def get_current_user(request: Request):
    user_id = request.session.get("user")
    
    if not user_id:
        raise HTTPException(
            status_code=401, 
            detail="Not authenticated"
        )
    
    return {
        "status": "authenticated", 
        "user_id": user_id
    }