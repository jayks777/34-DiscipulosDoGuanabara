from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordRequestForm  
from sqlalchemy.exc import SQLAlchemyError
from datetime import timedelta, timezone, datetime
from jose import jwt, JWTError
from app.core.dependencies import get_current_user, create_session

from app.main import bcrypt_context, SECRET_KEY, ALGORITHM, ACCESS_TOKEN_EXPIRE_MINUTES

from app.database.models import Usuarios

from app.schemas.user_schema import UserSchema, UserLogin

auth_route = APIRouter(prefix="/auth", tags=["auth"])


def create_token(dados, tempo_expiracao = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)):

    expiracao = datetime.now(timezone.utc) + tempo_expiracao

    dados_token = {
        "sub": str(dados),
        "exp": expiracao
    }

    token = jwt.encode(
        dados_token,
        SECRET_KEY,
        algorithm=ALGORITHM
    )

    return token

def authenticate_user (email, senha, session: Session):
    
    usuario = session.query(Usuarios).filter(Usuarios.email == email).first()

    if not usuario:
        raise HTTPException(status_code=400, detail="Email ou senha invalidos")
    
    elif not bcrypt_context.verify(senha, usuario.senha):
        raise HTTPException(status_code=400, detail="Email ou senha invalidos")
    
    return usuario  


@auth_route.post("/create_user")
async def create_user(usuario: UserSchema, session: Session = Depends(create_session)):

    novo_existente = session.query(Usuarios).filter(Usuarios.email == usuario.email).first()

    if novo_existente:
        raise HTTPException(status_code=400, detail="Usuario ja existente")
    else:
        senha_criptografada = bcrypt_context.hash(usuario.senha)
        novo_usuario = Usuarios(nome=usuario.nome, email=usuario.email, senha=senha_criptografada)

        try:
            session.add(novo_usuario)
            session.commit()

        except SQLAlchemyError:
            session.rollback()
            raise HTTPException(status_code=500, detail=("Erro ao criar usuario"))
        
        return {"mensagem": "Usuario cadrastrado com sucesso"}
    

@auth_route.post("/login")
async def login (dados: UserLogin, session: Session = Depends(create_session)):

    usuario = session.query(Usuarios).filter(Usuarios.email == dados.email).first()

    if not usuario:
        raise HTTPException(status_code=400, detail="Usuario nao encontardo")
    
    if not bcrypt_context.verify(dados.senha, usuario.senha):
        raise HTTPException(status_code=400, detail="Senha incorreta")

    access_token = create_token(usuario.id)
    refresh_token = create_token(usuario.id, tempo_expiracao = timedelta(days=7))

    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer"
    }

@auth_route.get("/me", response_model=UserSchema)
async def read_users_me(current_user: UserSchema = Depends(get_current_user)):
    return current_user


@auth_route.post("/login-form")
async def login_form (dados_form: OAuth2PasswordRequestForm = Depends(), session: Session = Depends(create_session)):

    usuario = authenticate_user(dados_form.username, dados_form.password, session)

    if not usuario:
        raise HTTPException(status_code=400, detail="Usuario inexistente")
    
    access_token = create_token(usuario.id)

    return {
        "access_token": access_token,
        "type_token": "bearer"
    }


@auth_route.get("/refresh")
async def refresh(
    usuario: Usuarios = Depends(get_current_user)
):
    access_token = create_token(usuario.id)

    return {
        "access_token": access_token,
        "token_type": "bearer"
    }