from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import date

from app.database.models import Receitas, Despesas, Plantacoes, Usuarios
from app.core.dependencies import create_session, verify_token

from app.schemas.dashboard_schema import (
    DashboardResponseSchema,
    ResumoFinanceiroSchema,
    AlertaClimaticoSchema,
    ProximaColheitaSchema
)

dashboard_route = APIRouter(
    prefix="/dashboard",
    tags=["dashboard"]
)

@dashboard_route.get("/", response_model=DashboardResponseSchema)
async def dashboard(
    usuario: Usuarios = Depends(verify_token),
    session: Session = Depends(create_session)
):

    total_receitas = (
        session.query(func.sum(Receitas.valor))
        .filter(Receitas.usuario_id == usuario.id)
        .scalar()
        or 0
    )

    total_despesas = (
        session.query(func.sum(Despesas.valor))
        .filter(Despesas.usuario_id == usuario.id)
        .scalar()
        or 0
    )

    lucro = float(total_receitas) - float(total_despesas)

    resumo = ResumoFinanceiroSchema(
        total_receitas=float(total_receitas),
        total_despesas=float(total_despesas),
        lucro=float(lucro)
    )

    plantacoes = (
        session.query(Plantacoes)
        .filter(
            Plantacoes.usuario_id == usuario.id,
            Plantacoes.data_colheita >= date.today()
        )
        .order_by(Plantacoes.data_colheita)
        .limit(5)
        .all()
    )

    proximas_colheitas = []

    for plantacao in plantacoes:

        dias_restantes = (
            plantacao.data_colheita - date.today()
        ).days

        proximas_colheitas.append(
            ProximaColheitaSchema(
                id=plantacao.id,
                nome=plantacao.nome,
                data_colheita=plantacao.data_colheita,
                dias_restantes=dias_restantes
            )
        )

    alertas = [
        AlertaClimaticoSchema(
            titulo="Nenhum alerta",
            descricao="Sem alertas climáticos no momento",
            nivel="baixo"
        )
    ]

    indice_risco = 15.0

    return DashboardResponseSchema(
        resumo_financeiro=resumo,
        alertas_climaticos=alertas,
        indice_risco=indice_risco,
        proximas_colheitas=proximas_colheitas
    )