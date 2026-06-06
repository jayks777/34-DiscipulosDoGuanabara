from pydantic import BaseModel


class SimulacaoSafraSchema(BaseModel):
    area: float
    produtividade: float


class EstimarCustosSchema(BaseModel):
    insumos: float
    mao_obra: float
    maquinas: float
    outros: float


class EstimarLucroSchema(BaseModel):
    preco_venda: float
    quantidade: float
    custo_total: float