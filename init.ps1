function Info($msg) {
    Write-Host "[i] $msg"
}

function Success($msg) {
    Write-Host "[OK] $msg"
}

function ErrorMsg($msg) {
    Write-Host "[ERRO] $msg"
}

$ROOT = Split-Path -Parent $MyInvocation.MyCommand.Path

$BACKEND = Join-Path $ROOT "backend"
$FRONTEND = Join-Path $ROOT "frontend"

Info "Verificando dependencias..."

if (!(Get-Command python -ErrorAction SilentlyContinue) -and !(Get-Command py -ErrorAction SilentlyContinue)) {
    ErrorMsg "Python nao encontrado."
    exit 1
}

if (!(Get-Command node -ErrorAction SilentlyContinue)) {
    ErrorMsg "Node.js nao encontrado."
    exit 1
}

if (!(Get-Command npm -ErrorAction SilentlyContinue)) {
    ErrorMsg "npm nao encontrado."
    exit 1
}

Success "Dependencias OK"

Info "Instalando dependencias do backend..."

Push-Location $BACKEND

pip install -r requirements.txt

if ($LASTEXITCODE -ne 0) {
    ErrorMsg "Erro ao instalar dependencias do backend."
    Pop-Location
    exit 1
}

Success "Backend pronto"

Pop-Location

Info "Instalando dependencias do frontend..."

Push-Location $FRONTEND

npm install

if ($LASTEXITCODE -ne 0) {
    ErrorMsg "Erro ao instalar dependencias do frontend."
    Pop-Location
    exit 1
}

Success "Frontend pronto"

Pop-Location

Info "Iniciando backend em segundo plano..."

Start-Job -ScriptBlock {
    Set-Location $using:BACKEND
    uvicorn app:app --reload
} | Out-Null

Success "Backend iniciado"

Info "Iniciando frontend..."

Set-Location $FRONTEND

npm run dev
```