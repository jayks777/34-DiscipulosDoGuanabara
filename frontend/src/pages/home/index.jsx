import { Link } from "react-router-dom";

const palette = {
  green: "#2F6B3F",
  greenDark: "#1F3D2B",
  greenLight: "#6FAF5F",
  beige: "#F4F1E8",
  white: "#FFFDF7",
  earth: "#B7793E",
  yellow: "#E6B84A",
  red: "#C94C4C",
  gray: "#334155",
};

function NavLink({ href, children }) {
  return (
    <a
      href={href}
      className="text-sm font-medium text-slate-600 hover:text-[#1F3D2B] transition-colors"
    >
      {children}
    </a>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-[#FFFDF7]/85 border-b border-black/5">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span
            className="w-8 h-8 rounded-lg grid place-items-center text-white font-bold"
            style={{
              background: `linear-gradient(135deg, ${palette.greenDark}, ${palette.green})`,
            }}
          >
            G
          </span>
          <span className="text-xl font-semibold tracking-tight text-[#1F3D2B]">
            Gaia
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <NavLink href="#recursos">Recursos</NavLink>
          <NavLink href="#risco">Risco Agrícola</NavLink>
          <NavLink href="#beneficios">Benefícios</NavLink>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="/login"
            className="hidden sm:inline-flex px-4 py-2 text-sm font-medium text-[#1F3D2B] hover:bg-[#F4F1E8] rounded-lg transition-colors"
          >
            Entrar
          </a>
          <a
            href="/register"
            className="inline-flex px-4 py-2 text-sm font-medium text-white rounded-lg shadow-sm hover:shadow transition-all"
            style={{
              background: `linear-gradient(135deg, ${palette.greenDark}, ${palette.green})`,
            }}
          >
            Criar conta
          </a>
        </div>
      </div>
    </header>
  );
}

function DashboardMockup() {
  return (
    <div className="relative">
      <div
        className="absolute -inset-6 rounded-3xl opacity-30 blur-2xl"
        style={{
          background: `linear-gradient(135deg, ${palette.green}, ${palette.greenLight})`,
        }}
      />
      <div className="relative bg-white rounded-2xl border border-black/5 shadow-xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-wider text-slate-400">
              Painel da propriedade
            </p>
            <p className="text-sm font-semibold text-[#1F3D2B]">
              Fazenda Boa Vista
            </p>
          </div>
          <div className="flex gap-1">
            <span className="w-2 h-2 rounded-full bg-red-300" />
            <span className="w-2 h-2 rounded-full bg-yellow-300" />
            <span className="w-2 h-2 rounded-full bg-green-300" />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-xl bg-[#F4F1E8] p-3">
            <p className="text-[10px] uppercase text-slate-500">Receita</p>
            <p className="text-lg font-bold text-[#1F3D2B]">R$ 184k</p>
            <p className="text-[10px] text-[#2F6B3F]">+12% mês</p>
          </div>
          <div className="rounded-xl bg-[#F4F1E8] p-3">
            <p className="text-[10px] uppercase text-slate-500">Despesas</p>
            <p className="text-lg font-bold text-[#1F3D2B]">R$ 96k</p>
            <p className="text-[10px] text-[#B7793E]">+3% mês</p>
          </div>
          <div className="rounded-xl bg-[#F4F1E8] p-3">
            <p className="text-[10px] uppercase text-slate-500">Lucro</p>
            <p className="text-lg font-bold text-[#2F6B3F]">R$ 88k</p>
            <p className="text-[10px] text-[#2F6B3F]">Margem 47%</p>
          </div>
        </div>

        <div className="rounded-xl border border-black/5 p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-medium text-slate-600">
              Índice de Risco Agrícola
            </p>
            <p className="text-xs font-bold text-[#C94C4C]">78/100 · Alto</p>
          </div>
          <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
            <div
              className="h-full rounded-full"
              style={{
                width: "78%",
                background: `linear-gradient(90deg, ${palette.greenLight}, ${palette.yellow}, ${palette.red})`,
              }}
            />
          </div>
          <div className="flex justify-between text-[10px] text-slate-400 mt-1">
            <span>0</span>
            <span>50</span>
            <span>100</span>
          </div>
        </div>

        <div
          className="rounded-xl p-3 flex items-start gap-3 border"
          style={{
            background: "#FFF8E6",
            borderColor: "#E6B84A55",
          }}
        >
          <div
            className="w-8 h-8 rounded-lg grid place-items-center text-white text-sm font-bold flex-shrink-0"
            style={{ background: palette.yellow }}
          >
            !
          </div>
          <div>
            <p className="text-xs font-semibold text-[#1F3D2B]">
              Alerta climático
            </p>
            <p className="text-[11px] text-slate-600">
              Calor acima de 34°C nos próximos 3 dias · chance de chuva 8%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: `radial-gradient(1000px 500px at 80% -10%, ${palette.greenLight}22, transparent), linear-gradient(180deg, ${palette.white}, ${palette.beige})`,
        }}
      />
      <div className="max-w-7xl mx-auto px-6 py-20 lg:py-28 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-white border border-black/5 text-[#1F3D2B]">
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: palette.greenLight }}
            />
            Plataforma de gestão agrícola inteligente
          </span>
          <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#1F3D2B] leading-[1.1]">
            Gestão agrícola guiada por dados
          </h1>
          <p className="mt-6 text-lg text-slate-600 max-w-xl leading-relaxed">
            O Gaia une finanças, culturas e clima em um único painel, ajudando
            pequenos e médios produtores a tomar decisões com mais segurança e
            previsibilidade.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="/register"
              className="px-6 py-3 rounded-xl text-white font-semibold shadow-md hover:shadow-lg transition-all"
              style={{
                background: `linear-gradient(135deg, ${palette.greenDark}, ${palette.green})`,
              }}
            >
              Começar agora
            </a>
            <a
              href="/login"
              className="px-6 py-3 rounded-xl font-semibold text-[#1F3D2B] bg-white border border-black/10 hover:bg-[#F4F1E8] transition-colors"
            >
              Acessar conta
            </a>
          </div>
          <div className="mt-10 flex items-center gap-8 text-sm text-slate-500">
            <div>
              <p className="text-2xl font-bold text-[#1F3D2B]">+30%</p>
              <p>Eficiência média</p>
            </div>
            <div className="w-px h-10 bg-slate-200" />
            <div>
              <p className="text-2xl font-bold text-[#1F3D2B]">24/7</p>
              <p>Monitoramento</p>
            </div>
            <div className="w-px h-10 bg-slate-200" />
            <div>
              <p className="text-2xl font-bold text-[#1F3D2B]">100%</p>
              <p>Na nuvem</p>
            </div>
          </div>
        </div>

        <DashboardMockup />
      </div>
    </section>
  );
}

const features = [
  {
    title: "Gestão Financeira",
    desc: "Receitas, despesas, lucro e fluxo de caixa centralizados em um só lugar.",
    icon: "₽",
  },
  {
    title: "Culturas e Safras",
    desc: "Acompanhe área plantada, data de plantio e previsão de colheita.",
    icon: "🌱",
  },
  {
    title: "Monitoramento Climático",
    desc: "Temperatura, umidade, chuva e vento com alertas em tempo real.",
    icon: "☁",
  },
  {
    title: "Relatórios",
    desc: "Visão gerencial completa para entender o desempenho da propriedade.",
    icon: "📊",
  },
  {
    title: "Simulação de Safra",
    desc: "Projete investimento, custos, produção e lucro esperado antes de plantar.",
    icon: "🧮",
  },
  {
    title: "Índice de Risco Agrícola",
    desc: "Pontuação de 0 a 100 que orienta decisões com base em múltiplas variáveis.",
    icon: "⚠",
  },
];

function Features() {
  return (
    <section id="recursos" className="py-24 bg-[#FFFDF7]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-[#2F6B3F]">
            Recursos
          </p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-[#1F3D2B] tracking-tight">
            Tudo o que o produtor precisa, num só painel
          </h2>
          <p className="mt-4 text-slate-600">
            Construído para pequenos e médios produtores que querem profissionalizar
            a gestão da propriedade sem complicação.
          </p>
        </div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-xl bg-white border border-black/5 p-6 hover:shadow-md transition-shadow"
            >
              <div
                className="w-11 h-11 rounded-xl grid place-items-center text-lg mb-4"
                style={{
                  background: `${palette.green}15`,
                  color: palette.greenDark,
                }}
              >
                {f.icon}
              </div>
              <h3 className="font-semibold text-[#1F3D2B]">{f.title}</h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function RiskSection() {
  const score = 78;
  return (
    <section
      id="risco"
      className="py-24"
      style={{ background: palette.beige }}
    >
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-[#2F6B3F]">
            Índice de Risco Agrícola
          </p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-[#1F3D2B] tracking-tight">
            Uma nota clara para uma decisão segura
          </h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            O Gaia combina dados climáticos, fase da cultura e histórico da
            propriedade em um índice único de 0 a 100. Quanto maior o valor,
            maior a atenção necessária.
          </p>

          <div className="mt-8 space-y-3">
            <div className="flex items-center gap-3">
              <span
                className="w-3 h-3 rounded-full"
                style={{ background: palette.greenLight }}
              />
              <span className="text-sm text-slate-700">
                <strong>Baixo</strong> · 0 a 30 — condições favoráveis
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span
                className="w-3 h-3 rounded-full"
                style={{ background: palette.yellow }}
              />
              <span className="text-sm text-slate-700">
                <strong>Moderado</strong> · 31 a 60 — atenção recomendada
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span
                className="w-3 h-3 rounded-full"
                style={{ background: palette.red }}
              />
              <span className="text-sm text-slate-700">
                <strong>Alto</strong> · 61 a 100 — ação imediata sugerida
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-black/5 shadow-sm p-8">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs uppercase tracking-wider text-slate-400">
                Exemplo · safra de milho
              </p>
              <p className="text-5xl font-bold text-[#C94C4C] mt-2">
                {score}
                <span className="text-2xl text-slate-400">/100</span>
              </p>
              <p className="text-sm font-semibold text-[#C94C4C] mt-1">
                Risco Alto
              </p>
            </div>
            <div
              className="w-16 h-16 rounded-full grid place-items-center text-white text-xl font-bold"
              style={{ background: palette.red }}
            >
              !
            </div>
          </div>

          <div className="mt-6">
            <div className="h-3 rounded-full bg-slate-100 overflow-hidden">
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: `${score}%`,
                  background: `linear-gradient(90deg, ${palette.greenLight}, ${palette.yellow}, ${palette.red})`,
                }}
              />
            </div>
            <div className="flex justify-between text-xs text-slate-400 mt-2">
              <span>0</span>
              <span>30</span>
              <span>60</span>
              <span>100</span>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-black/5">
            <p className="text-sm font-semibold text-[#1F3D2B] mb-3">
              Principais motivos
            </p>
            <ul className="space-y-2 text-sm text-slate-600">
              <li className="flex gap-2">
                <span className="text-[#C94C4C]">●</span> Calor elevado previsto
                para os próximos dias
              </li>
              <li className="flex gap-2">
                <span className="text-[#E6B84A]">●</span> Baixa chance de chuva
                na semana
              </li>
              <li className="flex gap-2">
                <span className="text-[#B7793E]">●</span> Cultura em fase
                sensível ao estresse hídrico
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

const benefits = [
  {
    title: "Menos decisões no escuro",
    desc: "Indicadores claros e atualizados substituem o achismo no dia a dia.",
  },
  {
    title: "Melhor controle de custos",
    desc: "Receitas e despesas organizadas mostram onde está o resultado real.",
  },
  {
    title: "Planejamento de plantio e colheita",
    desc: "Acompanhe ciclos, áreas e previsões para programar a operação.",
  },
  {
    title: "Visão integrada da propriedade",
    desc: "Finanças, lavoura e clima num único painel, sempre disponível.",
  },
];

function Benefits() {
  return (
    <section id="beneficios" className="py-24 bg-[#FFFDF7]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-[#2F6B3F]">
            Benefícios
          </p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-[#1F3D2B] tracking-tight">
            Por que produtores escolhem o Gaia
          </h2>
        </div>

        <div className="mt-12 grid sm:grid-cols-2 gap-5">
          {benefits.map((b) => (
            <div
              key={b.title}
              className="rounded-xl border border-black/5 p-6 flex gap-4"
              style={{ background: palette.beige }}
            >
              <div
                className="w-10 h-10 rounded-lg grid place-items-center text-white font-bold flex-shrink-0"
                style={{
                  background: `linear-gradient(135deg, ${palette.greenDark}, ${palette.green})`,
                }}
              >
                ✓
              </div>
              <div>
                <h3 className="font-semibold text-[#1F3D2B]">{b.title}</h3>
                <p className="mt-1 text-sm text-slate-600 leading-relaxed">
                  {b.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="py-24">
      <div className="max-w-5xl mx-auto px-6">
        <div
          className="rounded-2xl px-8 py-16 text-center text-white relative overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${palette.greenDark}, ${palette.green})`,
          }}
        >
          <div
            className="absolute -top-20 -right-20 w-72 h-72 rounded-full opacity-20"
            style={{ background: palette.greenLight }}
          />
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight relative">
            Organize sua propriedade e tome decisões com mais segurança
          </h2>
          <p className="mt-4 text-white/80 max-w-xl mx-auto relative">
            Comece agora a transformar dados do campo em resultados melhores.
          </p>
          <div className="mt-8 relative">
            <a
              href="/register"
              className="inline-flex px-8 py-3 rounded-xl bg-white text-[#1F3D2B] font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              Criar conta gratuita
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-10 border-t border-black/5 bg-[#FFFDF7]">
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span
            className="w-7 h-7 rounded-lg grid place-items-center text-white text-sm font-bold"
            style={{
              background: `linear-gradient(135deg, ${palette.greenDark}, ${palette.green})`,
            }}
          >
            G
          </span>
          <span className="font-semibold text-[#1F3D2B]">Gaia</span>
        </div>
        <p className="text-sm text-slate-500">
          Gaia — Transformando dados em decisões para o campo.
        </p>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FFFDF7] text-slate-700 antialiased">
      <Header />
      <main>
        <Hero />
        <Features />
        <RiskSection />
        <Benefits />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}