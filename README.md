# Gaia - Plataforma Inteligente de Gestão Agrícola

## Equipe

### Discípulos do Guanabara

A equipe **Discípulos do Guanabara** foi formada para desenvolver soluções tecnológicas inovadoras que gerem impacto real na sociedade. Combinando conhecimentos em desenvolvimento de software, segurança da informação, experiência do usuário e modelagem de negócios, buscamos criar produtos que unam qualidade técnica, usabilidade e viabilidade de mercado.

No projeto **Gaia**, nosso objetivo é auxiliar pequenos e médios produtores rurais na tomada de decisões por meio da centralização e análise inteligente de dados financeiros, produtivos e climáticos.

### Integrantes

| Nome               | Função                                                |
| ------------------ | ----------------------------------------------------- |
| **Jaykson Bolico** | Desenvolvedor Full Stack e Analista de Cybersegurança |
| **Raul Bauer**     | Desenvolvedor Backend                                 |
| **Eduarda Ayala**  | Desenvolvedora Frontend e UI Designer                 |
| **Leonardo Klein** | Analista de Negócios e Social Media                   |
| **Miguel Rossato** | Analista de Negócios e Documentação                   |

---
## Pitch

[https://youtu.be/9lATmCMl4k0?si=N4KlZUB9mIY3veI1](https://youtu.be/9lATmCMl4k0?si=N4KlZUB9mIY3veI1)

## Missão da Equipe

Desenvolver soluções tecnológicas acessíveis, intuitivas e eficientes, transformando dados em informações estratégicas para apoiar decisões que gerem valor aos usuários.

## Visão

Ser reconhecida pela capacidade de criar soluções inovadoras que combinem tecnologia, negócios e experiência do usuário para resolver problemas reais.

## Valores

* Inovação
* Colaboração
* Transparência
* Qualidade
* Segurança
* Impacto Social

---

## Projeto Desenvolvido

### Gaia — Inteligência para quem cultiva o futuro.

O **Gaia** é uma plataforma web de gestão agrícola inteligente voltada para pequenos e médios produtores rurais.

A solução centraliza informações financeiras, produtivas e climáticas em um único ambiente digital, permitindo que produtores tenham maior controle sobre suas operações e tomem decisões mais seguras e estratégicas.

O sistema oferece recursos para:

* Gestão financeira da propriedade
* Controle de culturas agrícolas
* Monitoramento climático
* Simulação de safras
* Relatórios gerenciais
* Índice de Risco Agrícola

Nosso principal diferencial é o **Índice de Risco Agrícola**, um indicador exclusivo que combina dados financeiros, produtivos e climáticos para fornecer uma visão rápida do nível de risco da operação rural.

### Classificação do Índice de Risco

| Pontuação | Nível       |
| --------- | ----------- |
| 0 a 30    | 🟢 Baixo    |
| 31 a 60   | 🟡 Moderado |
| 61 a 100  | 🔴 Alto     |

---

### Problema

Pequenos e médios produtores rurais frequentemente precisam utilizar diferentes ferramentas para acompanhar suas atividades financeiras, produtivas e climáticas, tornando a gestão fragmentada e dificultando a tomada de decisões.

### Solução

O Gaia reúne todas essas informações em uma única plataforma, oferecendo indicadores, relatórios e análises que auxiliam o produtor a reduzir riscos, otimizar recursos e aumentar a previsibilidade dos resultados da safra.

## Começando
Para rodar esse projeto localmente, oferecemos dois modos de inicialização: **manual** e **automática**. Em ambas as formas, você vai precisar dos seguintes requisitos:

- **Node**
- **Python3** ou superior
- **Conexão com a internet**
- **Git** - *opcional, mas facilita muito*

Recomendamos também que você execute esses processos a partir de um **venv** do python, para evitar eventuais conflitos.

### 1. Automática

clone e acesse o repositório (*ou baixe e extraia o [zip](https://github.com/jayks777/34-DiscipulosDoGuanabara/archive/refs/heads/main.zip) em sua máquina*):
```bash
git clone https://github.com/jayks777/neuroseV2/
cd neuroseV2
```

execute um dos scrips de instalação e inicialização pré criados a partir do seu sistema operacional

**Windows:**

Em um terminal PowerShell com permissões de administrador:

```ps1
Set-ExecutionPolicy RemoteSigned
./init.ps1
```
**Linux:**

```bash
chmod +x init.sh
sudo bash init.sh
```

Após a instalação e execução acesse

- **[localhost:5173](localhost:5173) para a interface gráfica da aplicação**
- *[localhost:8000/docs](localhost:8000/docs)* para a documentação da API

### 2. Manual

Caso você queira rodar apenas parte da aplicação ou queira iniciá-la manualmente, comece clonando e abrindo o repositório:

```bash
git clone https://github.com/jayks777/neuroseV2/
cd neuroseV2
```

Vamos começar iniciando o **backend**. Acesse a pasta /backend e instale as dependências.

```bash
cd backend
python3 -m pip install -r requirements.txt
```

Após a instalação, inicie o servidor assíncrono do **Uvicorn** e acesse [localhost:8000/docs](localhost:8000/docs) para visualizar a documentação da API

```bash
uvicorn app:app --reload
```

Agora, em outro terminal vamos iniciar o **frontend** da aplicação. Abra o repositório na pasta /frontend

```bash
cd frontend
```

Agora, baixe e instale as dependências usando o **npm** e após inicie o servidor **vite**. Acesse a interface gráfica da aplicação em [localhost:5173](localhost:5173)

```bash
npm install
npm run dev
```