from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError

from app.core.dependencies import create_session, get_current_user

from app.database.models import Plantacoes, Usuarios

from app.schemas.cultura_schema import CulturaCreate, CulturaResponse, CulturaUpdate

culturas_route = APIRouter(prefix="/culturas", tags=["Culturas"])


@culturas_route.post("/create")
async def create_cultura(
    dados: CulturaCreate,
    session: Session = Depends(create_session),
    usuario: Usuarios = Depends(get_current_user)
):

    nova_cultura = Plantacoes(
        usuario_id=usuario.id,
        nome=dados.nome,
        area=dados.area,
        data_plantio=dados.data_plantio,
        data_colheita=dados.data_colheita
    )

    try:
        session.add(nova_cultura)
        session.commit()

    except SQLAlchemyError:
        session.rollback()
        raise HTTPException(
            status_code=500,
            detail="Erro ao cadastrar cultura"
        )

    return {
        "mensagem": "Cultura cadastrada com sucesso"
    }


@culturas_route.get(
    "/list",
    response_model=list[CulturaResponse]
)
async def list_culturas(
    session: Session = Depends(create_session),
    usuario: Usuarios = Depends(get_current_user)
):

    culturas = (
        session.query(Plantacoes)
        .filter(
            Plantacoes.usuario_id == usuario.id
        )
        .all()
    )

    return culturas


@culturas_route.get(
    "/{cultura_id}",
    response_model=CulturaResponse
)
async def get_cultura(
    cultura_id: int,
    session: Session = Depends(create_session),
    usuario: Usuarios = Depends(get_current_user)
):

    cultura = (
        session.query(Plantacoes)
        .filter(
            Plantacoes.id == cultura_id,
            Plantacoes.usuario_id == usuario.id
        )
        .first()
    )

    if not cultura:
        raise HTTPException(
            status_code=404,
            detail="Cultura não encontrada"
        )

    return cultura

@culturas_route.put("/update/{cultura_id}")
async def update_cultura(
    cultura_id: int,
    dados: CulturaUpdate,
    session: Session = Depends(create_session),
    usuario: Usuarios = Depends(get_current_user)
):

    cultura = (
        session.query(Plantacoes)
        .filter(
            Plantacoes.id == cultura_id,
            Plantacoes.usuario_id == usuario.id
        )
        .first()
    )

    if not cultura:
        raise HTTPException(
            status_code=404,
            detail="Cultura não encontrada"
        )

    try:

        if dados.nome is not None:
            cultura.nome = dados.nome

        if dados.area is not None:
            cultura.area = dados.area

        if dados.data_plantio is not None:
            cultura.data_plantio = dados.data_plantio

        if dados.data_colheita is not None:
            cultura.data_colheita = dados.data_colheita

        session.commit()

    except SQLAlchemyError:
        session.rollback()

        raise HTTPException(
            status_code=500,
            detail="Erro ao atualizar cultura"
        )

    return {
        "mensagem": "Cultura atualizada com sucesso"
    }

@culturas_route.delete("/delete/{cultura_id}")
async def delete_cultura(
    cultura_id: int,
    session: Session = Depends(create_session),
    usuario: Usuarios = Depends(get_current_user)
):

    cultura = (
        session.query(Plantacoes)
        .filter(
            Plantacoes.id == cultura_id,
            Plantacoes.usuario_id == usuario.id
        )
        .first()
    )

    if not cultura:
        raise HTTPException(
            status_code=404,
            detail="Cultura não encontrada"
        )

    try:
        session.delete(cultura)
        session.commit()

    except SQLAlchemyError:
        session.rollback()

        raise HTTPException(
            status_code=500,
            detail="Erro ao excluir cultura"
        )

    return {
        "mensagem": "Cultura removida com sucesso"
    }

@culturas_route.get("/historico")
async def historico_culturas(
    session: Session = Depends(create_session),
    usuario: Usuarios = Depends(get_current_user)
):

    historico = (
        session.query(Plantacoes)
        .filter(
            Plantacoes.usuario_id == usuario.id
        )
        .order_by(
            Plantacoes.data_plantio.desc()
        )
        .all()
    )

    return historico