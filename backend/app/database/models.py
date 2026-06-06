from sqlalchemy import create_engine, Column, Integer, String, DateTime, ForeignKey, Numeric, Date, func
from sqlalchemy.orm import declarative_base
from datetime import datetime, timezone
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATABASE_URL = f"sqlite:///{BASE_DIR}/banco.db"

db = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False}
)

# declara a base
Base = declarative_base()

# tabela de usuários
class Usuarios(Base):
    __tablename__ = "usuarios"

    id = Column("id", Integer, primary_key=True, autoincrement=True)
    nome = Column("nome", String, nullable=False)
    email = Column("email", String, nullable=False, unique=True)
    senha = Column("senha", String, nullable=False)
    criado_em = Column(DateTime(timezone=True), server_default=func.now())
    def __init__(self, nome, email, senha):
        self.nome = nome
        self.email = email
        self.senha = senha


# tabela de plantações
class Plantacoes(Base):
    __tablename__ = "plantacoes"

    id = Column("id", Integer, primary_key=True, autoincrement=True)
    usuario_id = Column("usuario_id", Integer, ForeignKey("usuarios.id"))
    nome = Column("nome", String, nullable=False)
    area = Column("area", Numeric(10, 2))
    data_plantio = Column("data_plantio", Date)
    data_colheita = Column("data_colheita", Date)

    def __init__(self, usuario_id, nome, area, data_plantio, data_colheita):
        self.usuario_id = usuario_id
        self.nome = nome
        self.area = area
        self.data_plantio = data_plantio
        self.data_colheita = data_colheita


# tabela de receitas
class Receitas(Base):
    __tablename__ = "receitas"

    id = Column("id", Integer, primary_key=True, autoincrement=True)
    usuario_id = Column("usuario_id", Integer, ForeignKey("usuarios.id"))
    descricao = Column("descricao", String, nullable=False)
    valor = Column("valor", Numeric(10, 2))
    data = Column("data", DateTime)

    def __init__(self, usuario_id, descricao, valor, data):
        self.usuario_id = usuario_id
        self.descricao = descricao
        self.valor = valor
        self.data = data


# tabela de despesas
class Despesas(Base):
    __tablename__ = "despesas"

    id = Column("id", Integer, primary_key=True, autoincrement=True)
    usuario_id = Column("usuario_id", Integer, ForeignKey("usuarios.id"))
    descricao = Column("descricao", String, nullable=False)
    valor = Column("valor", Numeric(10, 2))
    categoria = Column("categoria", String)
    data = Column("data", DateTime)

    def __init__(self, usuario_id, descricao, valor, categoria, data):
        self.usuario_id = usuario_id
        self.descricao = descricao
        self.valor = valor
        self.categoria = categoria
        self.data = data