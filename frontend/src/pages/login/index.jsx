import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Mock de autenticação — substituir por authServices quando integrar
const mockLogin = (email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email && password.length >= 6) {
        resolve({ token: "mock-jwt-token", user: { name: "Produtor Rural" } });
      } else {
        reject(new Error("Credenciais inválidas."));
      }
    }, 1200);
  });
};

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await mockLogin(form.email, form.password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Erro ao fazer login. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: "#F4F1E8" }}>

      {/* Painel esquerdo — visual */}
      <div
        className="hidden lg:flex flex-col justify-between w-[52%] px-16 py-14 relative overflow-hidden"
        style={{ backgroundColor: "#1F3D2B" }}
      >
        {/* Padrão de fundo decorativo */}
        <div className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 30%, #6FAF5F 0%, transparent 50%),
                              radial-gradient(circle at 80% 70%, #B7793E 0%, transparent 45%),
                              radial-gradient(circle at 50% 50%, #2F6B3F 0%, transparent 60%)`,
          }}
        />
        {/* Grade sutil */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(#6FAF5F 1px, transparent 1px),
                              linear-gradient(90deg, #6FAF5F 1px, transparent 1px)`,
            backgroundSize: "48px 48px",
          }}
        />

        {/* Logo */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: "#2F6B3F" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C8 2 4 6 4 10c0 5 8 12 8 12s8-7 8-12c0-4-4-8-8-8z"
                fill="#6FAF5F" />
              <circle cx="12" cy="10" r="3" fill="#FFFDF7" />
            </svg>
          </div>
          <span className="text-xl font-semibold tracking-wide" style={{ color: "#FFFDF7", fontFamily: "'Georgia', serif", letterSpacing: "0.08em" }}>
            GAIA
          </span>
        </div>

        {/* Conteúdo central */}
        <div className="relative z-10 space-y-10">
          <div>
            <p className="text-sm font-medium uppercase tracking-widest mb-4"
              style={{ color: "#6FAF5F" }}>
              Plataforma de Gestão Agrícola
            </p>
            <h1 className="text-5xl leading-tight font-bold" style={{ color: "#FFFDF7", fontFamily: "'Georgia', serif" }}>
              Inteligência<br />no campo,<br />
              <span style={{ color: "#6FAF5F" }}>decisões</span><br />mais firmes.
            </h1>
          </div>

          {/* Cards de destaque */}
          <div className="grid grid-cols-2 gap-4 pt-4">
            {[
              { icon: "📊", label: "Gestão Financeira", desc: "Receitas, despesas e fluxo de caixa" },
              { icon: "🌱", label: "Culturas", desc: "Histórico produtivo e previsões" },
              { icon: "🌤️", label: "Clima", desc: "Alertas e previsões meteorológicas" },
              { icon: "🛡️", label: "Risco Agrícola", desc: "Score inteligente por lavoura" },
            ].map((item) => (
              <div key={item.label}
                className="rounded-xl p-4 border"
                style={{ backgroundColor: "rgba(255,253,247,0.04)", borderColor: "rgba(111,175,95,0.18)" }}>
                <div className="text-xl mb-2">{item.icon}</div>
                <p className="text-sm font-semibold" style={{ color: "#FFFDF7" }}>{item.label}</p>
                <p className="text-xs mt-0.5" style={{ color: "#6FAF5F", opacity: 0.75 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Rodapé painel */}
        <div className="relative z-10">
          <p className="text-xs" style={{ color: "rgba(255,253,247,0.35)" }}>
            © 2025 Gaia · Gestão Agrícola Inteligente
          </p>
        </div>
      </div>

      {/* Painel direito — formulário */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 py-12">

        {/* Logo mobile */}
        <div className="flex lg:hidden items-center gap-2 mb-10">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: "#1F3D2B" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C8 2 4 6 4 10c0 5 8 12 8 12s8-7 8-12c0-4-4-8-8-8z" fill="#6FAF5F" />
              <circle cx="12" cy="10" r="3" fill="#FFFDF7" />
            </svg>
          </div>
          <span className="text-lg font-semibold tracking-widest"
            style={{ color: "#1F3D2B", fontFamily: "'Georgia', serif" }}>GAIA</span>
        </div>

        <div className="w-full max-w-[420px]">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-1.5" style={{ color: "#1F3D2B", fontFamily: "'Georgia', serif" }}>
              Bem-vindo de volta
            </h2>
            <p className="text-sm" style={{ color: "#64748B" }}>
              Acesse sua plataforma para gerenciar sua propriedade.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>

            {/* Campo e-mail */}
            <div className="space-y-1.5">
              <label htmlFor="email" className="block text-sm font-medium" style={{ color: "#334155" }}>
                E-mail
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m2 7 10 7 10-7" />
                  </svg>
                </span>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="seu@email.com.br"
                  className="w-full pl-10 pr-4 py-3 rounded-lg text-sm outline-none transition-all duration-150 border"
                  style={{
                    backgroundColor: "#FFFDF7",
                    borderColor: error ? "#C94C4C" : "#D1D9CC",
                    color: "#334155",
                  }}
                  onFocus={(e) => { e.target.style.borderColor = "#2F6B3F"; e.target.style.boxShadow = "0 0 0 3px rgba(47,107,63,0.12)"; }}
                  onBlur={(e) => { e.target.style.borderColor = error ? "#C94C4C" : "#D1D9CC"; e.target.style.boxShadow = "none"; }}
                />
              </div>
            </div>

            {/* Campo senha */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium" style={{ color: "#334155" }}>
                  Senha
                </label>
                <Link to="/forgot-password"
                  className="text-xs hover:underline transition-colors"
                  style={{ color: "#2F6B3F" }}>
                  Esqueci minha senha
                </Link>
              </div>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </span>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-11 py-3 rounded-lg text-sm outline-none transition-all duration-150 border"
                  style={{
                    backgroundColor: "#FFFDF7",
                    borderColor: error ? "#C94C4C" : "#D1D9CC",
                    color: "#334155",
                  }}
                  onFocus={(e) => { e.target.style.borderColor = "#2F6B3F"; e.target.style.boxShadow = "0 0 0 3px rgba(47,107,63,0.12)"; }}
                  onBlur={(e) => { e.target.style.borderColor = error ? "#C94C4C" : "#D1D9CC"; e.target.style.boxShadow = "none"; }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 p-0.5 rounded transition-opacity hover:opacity-70"
                  aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                >
                  {showPassword ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Mensagem de erro */}
            {error && (
              <div className="flex items-center gap-2.5 px-4 py-3 rounded-lg text-sm"
                style={{ backgroundColor: "rgba(201,76,76,0.08)", border: "1px solid rgba(201,76,76,0.22)", color: "#C94C4C" }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                {error}
              </div>
            )}

            {/* Botão entrar */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg text-sm font-semibold tracking-wide transition-all duration-150 flex items-center justify-center gap-2 mt-2"
              style={{
                backgroundColor: loading ? "#6FAF5F" : "#2F6B3F",
                color: "#FFFDF7",
                cursor: loading ? "not-allowed" : "pointer",
                boxShadow: loading ? "none" : "0 2px 8px rgba(47,107,63,0.25)",
              }}
              onMouseEnter={(e) => { if (!loading) e.target.style.backgroundColor = "#1F3D2B"; }}
              onMouseLeave={(e) => { if (!loading) e.target.style.backgroundColor = "#2F6B3F"; }}
            >
              {loading ? (
                <>
                  <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                  </svg>
                  Entrando…
                </>
              ) : (
                <>
                  Entrar na plataforma
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </>
              )}
            </button>
          </form>

          {/* Divisor */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px" style={{ backgroundColor: "#D1D9CC" }} />
            <span className="text-xs" style={{ color: "#64748B" }}>ou</span>
            <div className="flex-1 h-px" style={{ backgroundColor: "#D1D9CC" }} />
          </div>

          {/* Link para cadastro */}
          <p className="text-center text-sm" style={{ color: "#64748B" }}>
            Não tem uma conta?{" "}
            <Link to="/register"
              className="font-semibold hover:underline"
              style={{ color: "#2F6B3F" }}>
              Cadastre-se gratuitamente
            </Link>
          </p>
        </div>

        {/* Rodapé mobile */}
        <p className="mt-12 text-xs text-center lg:hidden" style={{ color: "#64748B", opacity: 0.6 }}>
          © 2025 Gaia · Gestão Agrícola Inteligente
        </p>
      </div>
    </div>
  );
}