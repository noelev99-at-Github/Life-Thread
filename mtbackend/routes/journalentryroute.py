from fastapi import FastAPI, Depends, Request, APIRouter, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.exc import SQLAlchemyError

from schemas import JournalEntry
from database import get_db

router = APIRouter()

@router.post("/journalentry")
async def journalentry(data: JournalEntry, request:Request, db: AsyncSession = Depends(get_db)):
    # Get the authentication ID from the backend session
    current_user_id = request.session.get("user")
    if not current_user_id:
        raise HTTPException(status=401, detail="Unauthorized")

    try: 
        # Create the SQLAlchemy database objects
        new_entry = JournalEntry(
            user_Id = current_user_id,
            date = data.date,
            title = data.title,
            entry = data.entry
        )

        # Save to database
        db.add(new_entry)
        await db.commit()
        await db.refresh(new_entry)

        return {"status": "success", "entry id": new_entry.id}
    
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