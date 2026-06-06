from fastapi import APIRouter
from app.schemas.simulation_schema import (
    SimulacaoSafraSchema,
    EstimarCustosSchema,
    EstimarLucroSchema
)

simulation_route = APIRouter(
    prefix="/simulation",
    tags=["Simulações"]
)


@simulation_route.post("/simular-safra")
async def simular_safra(dados: SimulacaoSafraSchema):

    producao_total = dados.area * dados.produtividade

    return {
        "area": dados.area,
        "produtividade": dados.produtividade,
        "producao_estimada": producao_total,
        "unidade": "sacas"
    }


@simulation_route.post("/estimar-custos")
async def estimar_custos(dados: EstimarCustosSchema):

    custo_total = (
        dados.insumos +
        dados.mao_obra +
        dados.maquinas +
        dados.outros
    )

    return {
        "custo_total": custo_total
    }


@simulation_route.post("/estimar-lucro")
async def estimar_lucro(dados: EstimarLucroSchema):

    receita = dados.preco_venda * dados.quantidade

    lucro = receita - dados.custo_total

    return {
        "receita_estimada": receita,
        "custo_total": dados.custo_total,
        "lucro_estimado": lucro
    }