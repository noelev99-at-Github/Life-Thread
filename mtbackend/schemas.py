from pydantic import BaseModel

# Pydantic model for login
class LoginRequest(BaseModel):
    email: str
    password: str

#Authentication Badge
class UserResponse(BaseModel):
    status: str
    user_id: int # or str, depending on your database ID type

    class Config:
        from_attributes = True