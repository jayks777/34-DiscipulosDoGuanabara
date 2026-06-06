from pydantic import BaseModel
from decimal import Decimal


class RelatorioFinanceiro(BaseModel):
    total_receitas: Decimal
    total_despesas: Decimal
    saldo: Decimal
    quantidade_receitas: int
    quantidade_despesas: int


class RelatorioProducao(BaseModel):
    quantidade_plantacoes: int
    area_total: Decimal


class RelatorioDesempenho(BaseModel):
    receitas: Decimal
    despesas: Decimal
    lucro: Decimal
    indice_desempenho: float | None