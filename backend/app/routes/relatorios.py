from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.core.dependencies import create_session, get_current_user
from app.database.models import Receitas, Despesas, Usuarios

relatorio_route = APIRouter(
    prefix="/relatorios",
    tags=["Relatórios"]
)


@relatorio_route.get("/financeiro")
async def relatorio_financeiro(
    usuario: Usuarios = Depends(get_current_user),
    session: Session = Depends(create_session)
):

    total_receitas = session.query(
        func.coalesce(func.sum(Receitas.valor), 0)
    ).filter(
        Receitas.usuario_id == usuario.id
    ).scalar()

    total_despesas = session.query(
        func.coalesce(func.sum(Despesas.valor), 0)
    ).filter(
        Despesas.usuario_id == usuario.id
    ).scalar()

    quantidade_receitas = session.query(
        Receitas
    ).filter(
        Receitas.usuario_id == usuario.id
    ).count()

    quantidade_despesas = session.query(
        Despesas
    ).filter(
        Despesas.usuario_id == usuario.id
    ).count()

    return {

        "total_receitas": total_receitas,
        "total_despesas": total_despesas,
        "saldo": total_receitas - total_despesas,
        "quantidade_receitas": quantidade_receitas,
        "quantidade_despesas": quantidade_despesas

    }