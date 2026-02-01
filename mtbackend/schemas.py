from pydantic import BaseModel

# Pydantic model for login
class LoginRequest(BaseModel):
    email: str
    password: str