from pydantic import BaseModel

class UserSchema(BaseModel):
    nome: str
    email: str
    senha: str 

    class config:
        from_atributes = True


class UserLogin (BaseModel):
    email: str
    senha: str

    class Config:
        from_atributer = True
