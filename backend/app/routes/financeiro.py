from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func
from sqlalchemy.exc import SQLAlchemyError

from app.core.dependencies import create_session, get_current_user
from app.database.models import (
    Usuarios,
    Receitas,
    Despesas
)

from app.schemas.financeiro_schema import (
    ReceitaSchema,
    DespesaSchema
)

financeiro_route = APIRouter(
    prefix="/financeiro",
    tags=["Financeiro"]
)

@financeiro_route.post("/receitas")
async def criar_receita(
    receita: ReceitaSchema,
    usuario: Usuarios = Depends(get_current_user),
    session: Session = Depends(create_session)
):

    nova = Receitas(
        usuario_id=usuario.id,
        descricao=receita.descricao,
        valor=receita.valor,
        data=receita.data
    )

    try:
        session.add(nova)
        session.commit()

    except SQLAlchemyError:
        session.rollback()
        raise HTTPException(
            status_code=500,
            detail="Erro ao cadastrar receita"
        )

    return {"mensagem": "Receita cadastrada com sucesso"}

@financeiro_route.get("/receitas")
async def listar_receitas(
    usuario: Usuarios = Depends(get_current_user),
    session: Session = Depends(create_session)
):

    receitas = session.query(
        Receitas
    ).filter(
        Receitas.usuario_id == usuario.id
    ).all()

    return receitas

@financeiro_route.put("/receitas/{id}")
async def atualizar_receita(
    id: int,
    dados: ReceitaSchema,
    usuario: Usuarios = Depends(get_current_user),
    session: Session = Depends(create_session)
):

    receita = session.query(
        Receitas
    ).filter(
        Receitas.id == id,
        Receitas.usuario_id == usuario.id
    ).first()

    if not receita:
        raise HTTPException(
            status_code=404,
            detail="Receita não encontrada"
        )

    receita.descricao = dados.descricao
    receita.valor = dados.valor
    receita.data = dados.data

    session.commit()

    return {"mensagem": "Receita atualizada"}

@financeiro_route.delete("/receitas/{id}")
async def deletar_receita(
    id: int,
    usuario: Usuarios = Depends(get_current_user),
    session: Session = Depends(create_session)
):

    receita = session.query(
        Receitas
    ).filter(
        Receitas.id == id,
        Receitas.usuario_id == usuario.id
    ).first()

    if not receita:
        raise HTTPException(
            status_code=404,
            detail="Receita não encontrada"
        )

    session.delete(receita)
    session.commit()

    return {"mensagem": "Receita removida"}

@financeiro_route.post("/despesas")
async def criar_despesa(
    despesa: DespesaSchema,
    usuario: Usuarios = Depends(get_current_user),
    session: Session = Depends(create_session)
):

    nova = Despesas(
        usuario_id=usuario.id,
        descricao=despesa.descricao,
        valor=despesa.valor,
        categoria=despesa.categoria,
        data=despesa.data
    )

    try:
        session.add(nova)
        session.commit()

    except SQLAlchemyError:
        session.rollback()
        raise HTTPException(
            status_code=500,
            detail="Erro ao cadastrar despesa"
        )

    return {"mensagem": "Despesa cadastrada"}

@financeiro_route.get("/despesas")
async def listar_despesas(
    usuario: Usuarios = Depends(get_current_user),
    session: Session = Depends(create_session)
):

    despesas = session.query(
        Despesas
    ).filter(
        Despesas.usuario_id == usuario.id
    ).all()

    return despesas

@financeiro_route.put("/despesas/{id}")
async def atualizar_despesa(
    id: int,
    dados: DespesaSchema,
    usuario: Usuarios = Depends(get_current_user),
    session: Session = Depends(create_session)
):

    despesa = session.query(
        Despesas
    ).filter(
        Despesas.id == id,
        Despesas.usuario_id == usuario.id
    ).first()

    if not despesa:
        raise HTTPException(
            status_code=404,
            detail="Despesa não encontrada"
        )

    despesa.descricao = dados.descricao
    despesa.valor = dados.valor
    despesa.categoria = dados.categoria
    despesa.data = dados.data

    session.commit()

    return {"mensagem": "Despesa atualizada"}

@financeiro_route.delete("/despesas/{id}")
async def deletar_despesa(
    id: int,
    usuario: Usuarios = Depends(get_current_user),
    session: Session = Depends(create_session)
):

    despesa = session.query(
        Despesas
    ).filter(
        Despesas.id == id,
        Despesas.usuario_id == usuario.id
    ).first()

    if not despesa:
        raise HTTPException(
            status_code=404,
            detail="Despesa não encontrada"
        )

    session.delete(despesa)
    session.commit()

    return {"mensagem": "Despesa removida"}

@financeiro_route.get("/fluxo-caixa")
async def fluxo_caixa(
    usuario: Usuarios = Depends(get_current_user),
    session: Session = Depends(create_session)
):

    total_receitas = session.query(
        func.sum(Receitas.valor)
    ).filter(
        Receitas.usuario_id == usuario.id
    ).scalar() or 0

    total_despesas = session.query(
        func.sum(Despesas.valor)
    ).filter(
        Despesas.usuario_id == usuario.id
    ).scalar() or 0

    return {
        "total_receitas": float(total_receitas),
        "total_despesas": float(total_despesas),
        "saldo": float(total_receitas - total_despesas)
    }

@financeiro_route.get("/relatorio")
async def relatorio(
    usuario: Usuarios = Depends(get_current_user),
    session: Session = Depends(create_session)
):

    receitas = session.query(
        Receitas
    ).filter(
        Receitas.usuario_id == usuario.id
    ).all()

    despesas = session.query(
        Despesas
    ).filter(
        Despesas.usuario_id == usuario.id
    ).all()

    total_receitas = sum(float(r.valor) for r in receitas)
    total_despesas = sum(float(d.valor) for d in despesas)

    return {
        "receitas": receitas,
        "despesas": despesas,
        "total_receitas": total_receitas,
        "total_despesas": total_despesas,
        "saldo": total_receitas - total_despesas
    }

