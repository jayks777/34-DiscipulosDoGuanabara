#!/bin/bash
info() {
    echo "[i] $1"
}

success() {
    echo "[OK] $1"
}

error() {
    echo "[ERRO] $1"
}

ROOT="$(cd "$(dirname "$0")" && pwd)"

BACKEND="$ROOT/backend"
FRONTEND="$ROOT/frontend"

info "Verificando dependencias..."

if ! command -v python3 &> /dev/null && ! command -v python &> /dev/null; then
    error "Python nao encontrado."
    exit 1
fi

if ! command -v node &> /dev/null; then
    error "Node.js nao encontrado."
    exit 1
fi

if ! command -v npm &> /dev/null; then
    error "npm nao encontrado."
    exit 1
fi

success "Dependencias OK"

info "Instalando dependencias do backend..."

cd "$BACKEND" || exit 1

pip install -r requirements.txt

if [ $? -ne 0 ]; then
    error "Erro ao instalar dependencias do backend."
    exit 1
fi

success "Backend pronto"

info "Instalando dependencias do frontend..."

cd "$FRONTEND" || exit 1

npm install

if [ $? -ne 0 ]; then
    error "Erro ao instalar dependencias do frontend."
    exit 1
fi

success "Frontend pronto"

info "Iniciando backend em segundo plano..."

cd "$BACKEND" || exit 1

uvicorn app:app --reload > /dev/null 2>&1 &

success "Backend iniciado"

info "Iniciando frontend..."

cd "$FRONTEND" || exit 1

npm run dev
```