from fastapi import FastAPI
from starlette.middleware.sessions import SessionMiddleware
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from routes.login import router as login_router

from models import init_db

import os

# Runs before the app starts accepting requests
@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_db()
    print("-----> Database initialized!")
    yield  

# FastAPI app
app = FastAPI(title="Life Thread API", lifespan=lifespan)

origins = [
    "http://localhost:5174",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_middleware(
    SessionMiddleware,
    secret_key=os.getenv("secrete_key")
)

# Routes
app.include_router(login_router)

