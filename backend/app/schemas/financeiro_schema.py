from pydantic import BaseModel
from datetime import datetime


class ReceitaSchema(BaseModel):
    descricao: str
    valor: float
    data: datetime

    class Config:
        from_attributes = True


class DespesaSchema(BaseModel):
    descricao: str
    valor: float
    categoria: str
    data: datetime

    class Config:
        from_attributes = True


class FluxoCaixaResponse(BaseModel):
    total_receitas: float
    total_despesas: float
    saldo: float

    class Config:
        from_attributes = True