🌱 Gaia

Sistema Inteligente de Gestão Agrícola com Monitoramento Climático e Apoio à Tomada de Decisão










📖 Sobre o Projeto

O Gaia é uma plataforma web desenvolvida para auxiliar produtores rurais no gerenciamento de suas atividades agrícolas.

O sistema centraliza informações financeiras, produtivas e climáticas em um único ambiente, permitindo que o agricultor acompanhe sua propriedade de forma simples e eficiente.

Além do gerenciamento tradicional, o Gaia oferece recursos de análise e monitoramento climático para auxiliar na tomada de decisões relacionadas ao plantio, manejo e colheita.

🎯 Problema

Pequenos e médios produtores frequentemente enfrentam desafios como:

Falta de organização financeira;
Dificuldade em controlar custos de produção;
Falta de integração entre dados da propriedade;
Dependência de informações climáticas dispersas;
Tomada de decisões baseada em experiência e não em dados.

Esses fatores podem gerar prejuízos financeiros e reduzir a eficiência da produção.

💡 Solução

O Gaia reúne ferramentas de:

Gestão Financeira;
Gestão de Culturas;
Monitoramento Climático;
Simulação de Safras;
Relatórios Gerenciais;
Indicadores de Risco Agrícola.

Tudo acessível por meio de uma interface moderna, responsiva e intuitiva.

✨ Diferencial

O principal diferencial do Gaia é o Índice de Risco Agrícola (IRA).

O sistema analisa:

Condições climáticas;
Tipo de cultura plantada;
Período de desenvolvimento da lavoura;
Histórico financeiro da propriedade.

Com base nesses dados, é gerada uma classificação de risco:

Faixa	Nível
0 - 30	Baixo
31 - 60	Moderado
61 - 100	Alto

Exemplo:

Índice de Risco: 78/100

Motivos:
• Temperaturas elevadas previstas
• Baixa probabilidade de chuva
• Cultura em fase sensível

Recomendação:
Avaliar irrigação preventiva.
🚜 Funcionalidades
🔐 Autenticação
Cadastro de usuários
Login com JWT
Rotas protegidas
Recuperação de senha
📊 Dashboard

Visualização rápida das principais informações:

Receita total
Despesas totais
Lucro atual
Índice de Risco Agrícola
Alertas climáticos
Próximas colheitas
💰 Gestão Financeira
Receitas
Cadastro de receitas
Histórico de vendas
Relatórios financeiros
Despesas
Sementes
Fertilizantes
Combustível
Mão de obra
Manutenção
Indicadores
Fluxo de caixa
Lucro líquido
Custos por cultura
🌾 Gestão de Culturas
Cadastro de culturas
Área plantada
Data de plantio
Previsão de colheita
Histórico produtivo
🌦️ Monitoramento Climático
Temperatura
Umidade
Velocidade do vento
Previsão de chuva
Alertas meteorológicos
📈 Simulação de Safra

Permite prever:

Investimento necessário
Custos operacionais
Produção estimada
Lucro esperado
📑 Relatórios

Exportação de relatórios:

Financeiros
Produtivos
Climáticos
🏗️ Arquitetura do Sistema
Front-end
React
├── React Router
├── TailwindCSS
├── Context API
├── JWT Authentication
└── Wrapper próprio para requisições HTTP
Back-end
FastAPI
├── JWT Authentication
├── SQLAlchemy
├── Pydantic
├── Serviços Climáticos
└── API REST
📂 Estrutura do Projeto
Gaia
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── routes
│   │   ├── contexts
│   │   ├── hooks
│   │   ├── services
│   │   └── utils
│   │
│   └── public
│
└── backend
    ├── app
    │   ├── routers
    │   ├── models
    │   ├── schemas
    │   ├── services
    │   ├── database
    │   └── core
    │
    └── main.py
🗄️ Modelo Conceitual
Usuário
│
├── Culturas
│
├── Receitas
│
├── Despesas
│
└── Relatórios
🚀 Tecnologias Utilizadas
Front-end
JavaScript (ES6+)
React
React Router
Tailwind CSS
Back-end
Python
FastAPI
SQLAlchemy
Pydantic
Banco de Dados
PostgreSQL
Segurança
JWT
Hash de Senhas
📋 Requisitos Funcionais
RF01 – Realizar cadastro de usuários.
RF02 – Realizar autenticação.
RF03 – Gerenciar receitas.
RF04 – Gerenciar despesas.
RF05 – Gerenciar culturas.
RF06 – Consultar previsão climática.
RF07 – Gerar relatórios.
RF08 – Simular safras.
RF09 – Calcular índice de risco agrícola.
📋 Requisitos Não Funcionais
Interface responsiva.
Tempo de resposta inferior a 3 segundos.
Armazenamento seguro de dados.
Compatibilidade com dispositivos móveis.
Disponibilidade contínua da plataforma.
🎓 Objetivo Acadêmico

Desenvolver uma plataforma de apoio à gestão agrícola capaz de integrar informações financeiras, produtivas e climáticas, contribuindo para a tomada de decisões e para a melhoria da eficiência operacional de pequenos e médios produtores rurais.

👥 Equipe

Projeto desenvolvido para fins acadêmicos como solução tecnológica para gestão agrícola e apoio à tomada de decisão baseada em dados.

Gaia — Transformando dados em decisões para o campo. 🌱🚜