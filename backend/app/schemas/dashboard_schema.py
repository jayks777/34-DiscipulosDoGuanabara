from pydantic import BaseModel
from datetime import date

class ResumoFinanceiroSchema(BaseModel):
    total_receitas: float
    total_despesas: float
    lucro: float

class AlertaClimaticoSchema(BaseModel):
    titulo: str
    descricao: str
    nivel: str

class ProximaColheitaSchema(BaseModel):
    id: int
    nome: str
    data_colheita: date
    dias_restantes: int

class DashboardResponseSchema(BaseModel):
    resumo_financeiro: ResumoFinanceiroSchema
    alertas_climaticos: list[AlertaClimaticoSchema]
    indice_risco: float
    proximas_colheitas: list[ProximaColheitaSchema]