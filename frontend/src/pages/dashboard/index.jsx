import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { 
    Leaf, DollarSign, CloudRain, Calculator, 
    TrendingUp, TrendingDown, AlertTriangle, Calendar 
} from "lucide-react";

import api from "../../api/requests";
import { useAuth } from "../../hooks/useAuth";

export default function Dashboard() {
    const { user, loading: authLoading } = useAuth();

    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) return;

        async function loadDashboard() {
            try {
                const data = await api.getData("/dashboard/");
                setDashboard(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        loadDashboard();
    }, [user]);

    if (authLoading || loading) {
        return (
            <div className="min-h-screen bg-[#F4F1E8] flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-[#1F3D2B] border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-[#1F3D2B] font-medium">Carregando dashboard...</p>
                </div>
            </div>
        );
    }

    const risco = dashboard?.indice_risco || 0;
    const riscoCor = 
        risco <= 30 ? "text-green-600" : 
        risco <= 60 ? "text-yellow-600" : 
        "text-red-600";

    return (
        <div className="min-h-screen bg-[#F4F1E8] p-6 pb-12">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-10">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-[#1F3D2B] text-white rounded-2xl flex items-center justify-center">
                            <Leaf className="w-7 h-7" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold text-[#1F3D2B]">
                                Olá, {user?.nome} 👋
                            </h1>
                            <p className="text-slate-600 text-lg">Bem-vindo ao Gaia • Dashboard</p>
                        </div>
                    </div>
                </div>

                {/* Atalhos Rápidos */}
                <div className="mb-10">
                    <h2 className="text-xl font-semibold text-[#1F3D2B] mb-4">Atalhos Rápidos</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <Link
                            to="/culturas"
                            className="group bg-white border border-[#E5E0D5] rounded-3xl p-6 hover:shadow-xl transition-all hover:-translate-y-1 flex flex-col items-center text-center"
                        >
                            <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                🌾
                            </div>
                            <span className="font-semibold text-[#1F3D2B]">Culturas</span>
                        </Link>

                        <Link
                            to="/financeiro"
                            className="group bg-white border border-[#E5E0D5] rounded-3xl p-6 hover:shadow-xl transition-all hover:-translate-y-1 flex flex-col items-center text-center"
                        >
                            <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                💰
                            </div>
                            <span className="font-semibold text-[#1F3D2B]">Financeiro</span>
                        </Link>

                        <Link
                            to="/clima"
                            className="group bg-white border border-[#E5E0D5] rounded-3xl p-6 hover:shadow-xl transition-all hover:-translate-y-1 flex flex-col items-center text-center"
                        >
                            <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                🌦️
                            </div>
                            <span className="font-semibold text-[#1F3D2B]">Clima</span>
                        </Link>

                        <Link
                            to="/simulacoes"
                            className="group bg-white border border-[#E5E0D5] rounded-3xl p-6 hover:shadow-xl transition-all hover:-translate-y-1 flex flex-col items-center text-center"
                        >
                            <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                📈
                            </div>
                            <span className="font-semibold text-[#1F3D2B]">Simulações</span>
                        </Link>
                    </div>
                </div>

                {/* Indicadores Financeiros */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
                    <div className="bg-white border border-[#E5E0D5] rounded-3xl p-8 shadow-xl">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-slate-500">Receitas</p>
                                <h2 className="text-3xl font-bold text-green-600 mt-3">
                                    R$ {Number(dashboard?.resumo_financeiro?.total_receitas || 0).toLocaleString('pt-BR')}
                                </h2>
                            </div>
                            <TrendingUp className="w-9 h-9 text-green-600" />
                        </div>
                    </div>

                    <div className="bg-white border border-[#E5E0D5] rounded-3xl p-8 shadow-xl">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-slate-500">Despesas</p>
                                <h2 className="text-3xl font-bold text-red-600 mt-3">
                                    R$ {Number(dashboard?.resumo_financeiro?.total_despesas || 0).toLocaleString('pt-BR')}
                                </h2>
                            </div>
                            <TrendingDown className="w-9 h-9 text-red-600" />
                        </div>
                    </div>

                    <div className="bg-white border border-[#E5E0D5] rounded-3xl p-8 shadow-xl">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-slate-500">Lucro</p>
                                <h2 className="text-3xl font-bold text-[#2F6B3F] mt-3">
                                    R$ {Number(dashboard?.resumo_financeiro?.lucro || 0).toLocaleString('pt-BR')}
                                </h2>
                            </div>
                            <DollarSign className="w-9 h-9 text-[#2F6B3F]" />
                        </div>
                    </div>

                    <div className="bg-white border border-[#E5E0D5] rounded-3xl p-8 shadow-xl">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-slate-500">Índice de Risco</p>
                                <h2 className={`text-3xl font-bold mt-3 ${riscoCor}`}>
                                    {risco}/100
                                </h2>
                            </div>
                            <AlertTriangle className={`w-9 h-9 ${risco <= 30 ? 'text-green-600' : risco <= 60 ? 'text-yellow-600' : 'text-red-600'}`} />
                        </div>
                    </div>
                </div>

                {/* Conteúdo Principal */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Alertas Climáticos */}
                    <div className="bg-white border border-[#E5E0D5] rounded-3xl p-8 shadow-xl">
                        <h2 className="text-2xl font-semibold text-[#1F3D2B] mb-6 flex items-center gap-3">
                            <CloudRain className="w-7 h-7" />
                            Alertas Climáticos
                        </h2>

                        {dashboard?.alertas_climaticos?.length === 0 ? (
                            <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-12 text-center">
                                <p className="text-emerald-700 font-medium">Nenhum alerta ativo no momento.</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {dashboard.alertas_climaticos.map((alerta, index) => (
                                    <div
                                        key={index}
                                        className="border-l-4 border-amber-500 bg-amber-50 rounded-2xl p-6"
                                    >
                                        <h3 className="font-semibold text-[#1F3D2B]">{alerta.titulo}</h3>
                                        <p className="text-slate-700 mt-2">{alerta.descricao}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Próximas Colheitas */}
                    <div className="bg-white border border-[#E5E0D5] rounded-3xl p-8 shadow-xl">
                        <h2 className="text-2xl font-semibold text-[#1F3D2B] mb-6 flex items-center gap-3">
                            <Calendar className="w-7 h-7" />
                            Próximas Colheitas
                        </h2>

                        {dashboard?.proximas_colheitas?.length === 0 ? (
                            <p className="text-slate-500 py-12 text-center">Nenhuma colheita programada.</p>
                        ) : (
                            <div className="space-y-4">
                                {dashboard.proximas_colheitas.map((cultura) => (
                                    <div
                                        key={cultura.id}
                                        className="bg-[#F8F6F0] border border-[#E5E0D5] rounded-2xl p-6 flex justify-between items-center"
                                    >
                                        <div>
                                            <h3 className="font-semibold text-[#1F3D2B]">{cultura.nome}</h3>
                                            <p className="text-slate-600 text-sm">
                                                Colheita: {cultura.data_colheita}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-2xl font-bold text-[#2F6B3F]">
                                                {cultura.dias_restantes}
                                            </p>
                                            <p className="text-xs text-slate-500">dias</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}