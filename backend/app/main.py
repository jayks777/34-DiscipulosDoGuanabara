from fastapi import FastAPI
from passlib.context import CryptContext
import os
from dotenv import load_dotenv

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES"))

App = FastAPI()

bcrypt_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

from app.routes.auth import auth_route

App.include_router(auth_route)


#uvicorn app.main:App --reload