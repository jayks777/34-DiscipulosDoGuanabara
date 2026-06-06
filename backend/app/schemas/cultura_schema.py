from pydantic import BaseModel
from datetime import date

class CulturaCreate(BaseModel):
    nome: str
    area: float
    data_plantio: date
    data_colheita: date


class CulturaResponse(BaseModel):
    id: int
    nome: str
    area: float
    data_plantio: date
    data_colheita: date

    class Config:
        from_attributes = True


class CulturaUpdate(BaseModel):
    nome: str | None = None
    area: float | None = None
    data_plantio: date | None = None
    data_colheita: date | None = None