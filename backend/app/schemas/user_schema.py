from pydantic import BaseModel

class UserSchema(BaseModel):
    nome: str
    email: str
    senha: str 

    class Config:
        from_attributes = True

class UserResponse(BaseModel):
    id: int
    nome: str
    email: str

    class Config:
        from_attributes = True

class UserLogin (BaseModel):
    email: str
    senha: str

    class Config:
        from_atributer = True
