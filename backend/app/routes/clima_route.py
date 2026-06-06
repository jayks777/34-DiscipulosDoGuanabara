from fastapi import APIRouter, Depends, HTTPException
from app.core.dependencies import get_current_user
from app.database.models import Usuarios
from app.services.clima_service import ClimaService

clima_route = APIRouter(
    prefix="/clima",
    tags=["Clima"]
)


# exemplo:
# /clima/previsao?latitude=-29.69&longitude=-53.80

@clima_route.get("/previsao")
async def previsao_tempo(
    latitude: float,
    longitude: float,
    usuario: Usuarios = Depends(get_current_user)
):

    dados = ClimaService.obter_previsao(latitude, longitude)

    if not dados:
        raise HTTPException(
            status_code=500,
            detail="Erro ao consultar API climática"
        )

    return {
        "usuario": usuario.nome,
        "clima_atual": dados["current"],
        "previsao": {
            "datas": dados["daily"]["time"],
            "temperatura_max": dados["daily"]["temperature_2m_max"],
            "temperatura_min": dados["daily"]["temperature_2m_min"]
        }
    }


@clima_route.get("/historico")
async def historico_climatico(
    latitude: float,
    longitude: float,
    usuario: Usuarios = Depends(get_current_user)
):

    dados = ClimaService.obter_historico(
        latitude,
        longitude
    )

    if not dados:
        raise HTTPException(
            status_code=500,
            detail="Erro ao consultar histórico climático"
        )

    return dados


@clima_route.get("/alertas")
async def alertas_meteorologicos(
    latitude: float,
    longitude: float,
    usuario: Usuarios = Depends(get_current_user)
):

    dados = ClimaService.obter_previsao(
        latitude,
        longitude
    )

    if not dados:
        raise HTTPException(
            status_code=500,
            detail="Erro ao consultar API"
        )

    temperatura = dados["current"]["temperature_2m"]
    vento = dados["current"]["wind_speed_10m"]

    alertas = []

    if temperatura >= 35:
        alertas.append("⚠️ Alerta de calor intenso")

    if temperatura <= 5:
        alertas.append("⚠️ Alerta de frio intenso")

    if vento >= 60:
        alertas.append("⚠️ Alerta de ventos fortes")

    if len(alertas) == 0:
        alertas.append("Nenhum alerta meteorológico")

    return {
        "usuario": usuario.nome,
        "alertas": alertas
    }