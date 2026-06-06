import { useEffect, useState } from "react";
import api from "../../api/requests";
import { useAuth } from "../../hooks/useAuth";

export default function Dashboard() {
  const { user, loading: authLoading, logout } = useAuth();
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    async function loadDashboard() {
      try {
        const data = await api.getData("/dashboard/");
        setDashboard(data);
      } catch (error) {
        console.error("Erro ao carregar dashboard:", error);
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, [user]);

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F4F1E8]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#2F6B3F] mx-auto mb-4"></div>
          <p className="text-slate-600">Carregando dados do dashboard...</p>
        </div>
      </div>
    );
  }

  if (!dashboard) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F4F1E8]">
        <div className="text-center bg-white p-8 rounded-xl shadow-md">
          <p className="text-red-600 font-medium">
            Não foi possível carregar os dados.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-[#2F6B3F] text-white rounded-lg hover:bg-[#1F3D2B] transition"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  const risco = dashboard.indice_risco;
  const riscoCor =
    risco <= 30
      ? "text-green-600"
      : risco <= 60
      ? "text-yellow-600"
      : "text-red-600";

  const riscoTexto =
    risco <= 30 ? "Baixo" : risco <= 60 ? "Moderado" : "Alto";

  return (
    <div className="min-h-screen bg-[#F4F1E8] p-6">
      {/* Cabeçalho com navegação e logout */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#1F3D2B]">
            Olá, {user?.nome || "Usuário"}
          </h1>
          <p className="text-slate-600 mt-1">
            Bem-vindo ao Gaia — seu centro de monitoramento agrícola
          </p>
        </div>

        <div className="flex gap-3">
          <a
            href="/culturas"
            className="inline-flex items-center px-4 py-2 bg-white border border-[#2F6B3F] text-[#2F6B3F] rounded-lg font-medium hover:bg-[#2F6B3F] hover:text-white transition shadow-sm"
          >
            🌾 Culturas
          </a>
          <button
            onClick={logout}
            className="inline-flex items-center px-4 py-2 bg-white border border-red-300 text-red-600 rounded-lg font-medium hover:bg-red-600 hover:text-white hover:border-red-600 transition shadow-sm"
          >
            Sair
          </button>
        </div>
      </div>

      {/* Cards financeiros */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4 mb-8">
        <div className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition">
          <p className="text-sm text-slate-500 uppercase tracking-wide">
            Receitas
          </p>
          <h2 className="text-2xl font-bold text-green-600 mt-1">
            R$ {dashboard.resumo_financeiro.total_receitas}
          </h2>
        </div>

        <div className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition">
          <p className="text-sm text-slate-500 uppercase tracking-wide">
            Despesas
          </p>
          <h2 className="text-2xl font-bold text-red-500 mt-1">
            R$ {dashboard.resumo_financeiro.total_despesas}
          </h2>
        </div>

        <div className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition">
          <p className="text-sm text-slate-500 uppercase tracking-wide">
            Lucro Líquido
          </p>
          <h2 className="text-2xl font-bold text-[#2F6B3F] mt-1">
            R$ {dashboard.resumo_financeiro.lucro}
          </h2>
        </div>

        <div className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition">
          <p className="text-sm text-slate-500 uppercase tracking-wide">
            Índice de Risco
          </p>
          <div className="flex items-baseline gap-2 mt-1">
            <h2 className={`text-2xl font-bold ${riscoCor}`}>
              {risco}/100
            </h2>
            <span className="text-sm text-slate-500">({riscoTexto})</span>
          </div>
        </div>
      </div>

      {/* Conteúdo principal: Alertas e Colheitas */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Alertas Climáticos */}
        <div className="bg-white border rounded-xl p-5 shadow-sm">
          <h2 className="text-xl font-semibold mb-4 text-[#1F3D2B] flex items-center gap-2">
            ⚠️ Alertas Climáticos
          </h2>

          {dashboard.alertas_climaticos.length === 0 ? (
            <p className="text-slate-500 text-center py-6">
              ✅ Nenhum alerta ativo no momento.
            </p>
          ) : (
            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
              {dashboard.alertas_climaticos.map((alerta, index) => (
                <div
                  key={index}
                  className="border-l-4 border-yellow-500 bg-yellow-50 rounded-lg p-4"
                >
                  <h3 className="font-semibold text-[#1F3D2B]">
                    {alerta.titulo}
                  </h3>
                  <p className="text-sm text-slate-700 mt-1">
                    {alerta.descricao}
                  </p>
                  <span className="inline-block mt-2 text-xs font-medium bg-white px-2 py-1 rounded border">
                    Nível: {alerta.nivel}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Próximas Colheitas */}
        <div className="bg-white border rounded-xl p-5 shadow-sm">
          <h2 className="text-xl font-semibold mb-4 text-[#1F3D2B] flex items-center gap-2">
            🌱 Próximas Colheitas
          </h2>

          {dashboard.proximas_colheitas.length === 0 ? (
            <p className="text-slate-500 text-center py-6">
              📭 Nenhuma colheita cadastrada.
            </p>
          ) : (
            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-1">
              {dashboard.proximas_colheitas.map((cultura) => (
                <div
                  key={cultura.id}
                  className="border rounded-lg p-4 hover:bg-gray-50 transition"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-[#1F3D2B]">
                        {cultura.nome}
                      </h3>
                      <p className="text-sm text-slate-500 mt-1">
                        Colheita prevista:{" "}
                        <span className="font-medium text-slate-700">
                          {cultura.data_colheita}
                        </span>
                      </p>
                    </div>
                    <span className="text-xs font-medium bg-green-100 text-green-700 px-2 py-1 rounded-full">
                      {cultura.dias_restantes} dias restantes
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Rodapé informativo */}
      <footer className="mt-10 text-center text-sm text-slate-400 border-t pt-6">
        © {new Date().getFullYear()} Gaia — Sistema de Gestão Agrícola
      </footer>
    </div>
  );
}