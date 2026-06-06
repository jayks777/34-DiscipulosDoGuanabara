import { useEffect, useState } from "react";
import { Sun, AlertTriangle, Clock, MapPin, Thermometer, Droplet, Wind } from "lucide-react";

import api from "../../api/requests";

export default function Clima() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [previsao, setPrevisao] = useState(null);
    const [historico, setHistorico] = useState(null);
    const [alertas, setAlertas] = useState([]);

    async function loadClima(latitude, longitude) {
        try {
            const [previsaoData, historicoData, alertasData] = await Promise.all([
                api.getData(`/clima/previsao?latitude=${latitude}&longitude=${longitude}`),
                api.getData(`/clima/historico?latitude=${latitude}&longitude=${longitude}`),
                api.getData(`/clima/alertas?latitude=${latitude}&longitude=${longitude}`),
            ]);

            setPrevisao(previsaoData);
            setHistorico(historicoData);
            setAlertas(alertasData?.alertas || []);
        } catch (err) {
            console.error(err);
            setError("Não foi possível carregar os dados climáticos.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (!navigator.geolocation) {
            setError("Seu navegador não suporta geolocalização.");
            setLoading(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => loadClima(position.coords.latitude, position.coords.longitude),
            () => {
                setError("Permita o acesso à localização para visualizar o clima.");
                setLoading(false);
            }
        );
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#F4F1E8] flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-[#1F3D2B] border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-[#1F3D2B] font-medium">Carregando clima...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-[#F4F1E8] flex items-center justify-center p-6">
                <div className="bg-white border border-red-200 rounded-3xl p-10 max-w-md text-center shadow-xl">
                    <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                    <p className="text-[#1F3D2B] text-lg">{error}</p>
                </div>
            </div>
        );
    }

    const atual = previsao?.clima_atual;
    const previsaoDiaria = previsao?.previsao;

    return (
        <div className="min-h-screen bg-[#F4F1E8] p-6 pb-12">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-10">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-[#1F3D2B] text-white rounded-2xl flex items-center justify-center">
                            <Sun className="w-7 h-7" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold text-[#1F3D2B]">Clima</h1>
                            <p className="text-slate-600">Monitoramento da sua região</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 text-slate-500">
                        <MapPin className="w-5 h-5" />
                        <span className="text-sm">Localização atual</span>
                    </div>
                </div>

                {/* Clima Atual */}
                <div className="bg-white border border-[#E5E0D5] rounded-3xl p-8 mb-8 shadow-xl">
                    <h2 className="text-2xl font-semibold text-[#1F3D2B] mb-6 flex items-center gap-3">
                        <Thermometer className="w-7 h-7" />
                        Clima Atual
                    </h2>

                    {atual ? (
                        <div className="flex flex-col md:flex-row items-center gap-10">
                            <div className="text-center md:text-left">
                                <div className="text-8xl mb-4">🌡️</div>
                                <div className="text-7xl font-light text-[#1F3D2B]">
                                    {atual.temperature_2m}°C
                                </div>
                                <p className="text-xl text-slate-600 mt-2">Agora</p>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 flex-1">
                                <div className="bg-[#F8F6F0] rounded-2xl p-5">
                                    <div className="flex items-center gap-3 text-slate-600 mb-1">
                                        <Wind className="w-5 h-5" />
                                        Vento
                                    </div>
                                    <p className="text-2xl font-semibold text-[#1F3D2B]">
                                        {atual.wind_speed_10m} <span className="text-base">km/h</span>
                                    </p>
                                </div>

                                <div className="bg-[#F8F6F0] rounded-2xl p-5">
                                    <div className="flex items-center gap-3 text-slate-600 mb-1">
                                        <Droplet className="w-5 h-5" />
                                        Umidade
                                    </div>
                                    <p className="text-2xl font-semibold text-[#1F3D2B]">— %</p>
                                </div>

                                <div className="bg-[#F8F6F0] rounded-2xl p-5">
                                    <div className="flex items-center gap-3 text-slate-600 mb-1">
                                        <Clock className="w-5 h-5" />
                                        Última atualização
                                    </div>
                                    <p className="text-lg font-medium text-[#1F3D2B]">
                                        {new Date(atual.time).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <p className="text-slate-500">Dados atuais não disponíveis.</p>
                    )}
                </div>

                {/* Previsão dos Próximos Dias */}
                <div className="bg-white border border-[#E5E0D5] rounded-3xl p-8 mb-8 shadow-xl">
                    <h2 className="text-2xl font-semibold text-[#1F3D2B] mb-6">Previsão para os próximos 7 dias</h2>

                    {previsaoDiaria?.datas?.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-4">
                            {previsaoDiaria.datas.map((data, index) => (
                                <div
                                    key={index}
                                    className="bg-[#F8F6F0] border border-[#E5E0D5] rounded-2xl p-5 text-center hover:shadow-md transition-shadow"
                                >
                                    <p className="font-medium text-[#1F3D2B]">
                                        {new Date(data).toLocaleDateString('pt-BR', { weekday: 'short', day: 'numeric', month: 'short' })}
                                    </p>
                                    <div className="my-4 text-4xl">🌤️</div>
                                    <div className="space-y-1">
                                        <p className="text-lg font-semibold text-[#1F3D2B]">
                                            {previsaoDiaria.temperatura_max[index]}°
                                        </p>
                                        <p className="text-slate-500 text-sm">
                                            {previsaoDiaria.temperatura_min[index]}°
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-slate-500">Previsão não disponível.</p>
                    )}
                </div>

                {/* Alertas */}
                <div className="bg-white border border-[#E5E0D5] rounded-3xl p-8 mb-8 shadow-xl">
                    <h2 className="text-2xl font-semibold text-[#1F3D2B] mb-6 flex items-center gap-3">
                        <AlertTriangle className="w-7 h-7 text-amber-600" />
                        Alertas Meteorológicos
                    </h2>

                    {alertas.length === 0 ? (
                        <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-12 text-center">
                            <div className="text-5xl mb-4">🌤️</div>
                            <p className="text-emerald-700 font-medium">Nenhum alerta ativo no momento.</p>
                        </div>
                    ) : (
                        <div className="space-y-5">
                            {alertas.map((alerta, index) => (
                                <div key={index} className="border-l-4 border-amber-500 bg-amber-50 rounded-2xl p-6">
                                    <h3 className="font-bold text-lg text-[#1F3D2B]">{alerta.titulo}</h3>
                                    <p className="mt-3 text-slate-700">{alerta.descricao}</p>
                                    <span className="inline-block mt-4 px-5 py-2 bg-white rounded-full text-sm font-medium text-amber-700">
                                        Nível: {alerta.nivel}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Histórico */}
            </div>
        </div>
    );
}