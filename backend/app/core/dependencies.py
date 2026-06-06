from fastapi import Depends, HTTPException, status
from jose import JWTError, jwt
from sqlalchemy.orm import sessionmaker, Session
from app.database.models import db
from app.main import SECRET_KEY, ALGORITHM, oauth2_scheme
from database.models import Usuarios

def create_session():
    try:
        Session = sessionmaker(bind=db)
        session = Session()
        yield session
    finally:
        session.close()


def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(create_session)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Credenciais inválidas",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )

        user_id = payload.get("sub")

        if user_id is None:
            raise credentials_exception

    except JWTError:
        raise credentials_exception

    usuario = (
        db.query(Usuarios)
        .filter(Usuarios.id == int(user_id))
        .first()
    )

    if usuario is None:
        raise credentials_exception

    return usuario