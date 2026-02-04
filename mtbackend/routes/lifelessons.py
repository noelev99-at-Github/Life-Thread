from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.exc import SQLAlchemyError

from database import get_db
from schemas import LifeLessonEntry

router = APIRouter()

@router.post("/lifelesson")
async def LifeLesson(data: LifeLessonEntry, request:Request, db: AsyncSession = Depends(get_db)):
    # Create if input is from a logged in user
    current_user_Id = request.session.get("user")
    if not current_user_Id:
        raise HTTPException(status_code=401, detail="Unauthorized")

    try:
        # Create a new life lesson entry
        new_ll_entry = LifeLesson(
            user_Id = current_user_Id,
            ll_entry = data.ll_entry
        )

        # Save to database
        db.add(new_ll_entry)
        db.commit()
        await db.refresh(new_ll_entry)

        return{"status": "success", "id": new_ll_entry.id}
        
    except SQLAlchemyError as e:
        # If something goes wrong undo the "staging" changes
        await db.rollback()
        print(f"Database Error: {e}")
        raise HTTPException(
            status_code = 500,
            detail = "Ssytem was unable to save the entry"
        )
    
    except Exception as e:
        # In case unexpected error thats non-database related, occurs
        print(f"Unexpected Error: {e}")
        raise HTTPException(status_code=500, detail="Internal error occurred.")
