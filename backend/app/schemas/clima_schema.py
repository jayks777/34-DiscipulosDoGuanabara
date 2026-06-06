from pydantic import BaseModel
from typing import List


class ClimaAtual(BaseModel):
    temperatura: float
    velocidade_vento: float
    horario: str


class PrevisaoDia(BaseModel):
    data: str
    temperatura_max: float
    temperatura_min: float


class Alerta(BaseModel):
    mensagem: str