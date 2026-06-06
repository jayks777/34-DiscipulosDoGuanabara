from fastapi import Session, APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError
from datetime import timedelta, timezone, datetime
from jose import jwt, JWTError

from app.main import bcrypt_context, SECRET_KEY, ALGORITHM, ACCESS_TOKEN_EXPIRE_MINUTES

from app.database.models import Usuarios

from app.schemas.user_schema import UserSchema, UserLogin

from app.core.dependencies import create_session, verify_token

auth_route = APIRouter(prefix="/auth", tags=["auth"])


def create_token(dados, tempo_expiracao = timedelta(minuntes=ACCESS_TOKEN_EXPIRE_MINUTES)):

    expiracao = datetime.now(timezone.utc) + tempo_expiracao

    if tempo_expiracao <= 0:
        raise ValueError("tempo invalido")

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
