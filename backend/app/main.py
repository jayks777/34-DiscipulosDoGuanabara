from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from passlib.context import CryptContext
import os
from fastapi.security import OAuth2PasswordBearer
from dotenv import load_dotenv

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY", "TESTE")
ALGORITHM = os.getenv("ALGORITHM", "HS256")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "30"))

App = FastAPI()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login-form")


App.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permite qualquer origem
    allow_credentials=True,
    allow_methods=["*"],  # Permite todos os métodos (GET, POST, etc.)
    allow_headers=["*"],  # Permite todos os headers
)

bcrypt_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

from app.routes.auth import auth_route
from app.routes.cultures import culturas_route
from app.routes.dashboard import dashboard_route
from app.routes.relatorios import relatorio_route

App.include_router(auth_route)
App.include_router(culturas_route)
App.include_router(dashboard_route)
App.include_router(relatorio_route)


#uvicorn app.main:App --reload