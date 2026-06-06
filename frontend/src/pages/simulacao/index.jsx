import { useState } from "react";
import { Tractor, DollarSign, TrendingUp, Calculator, Leaf } from "lucide-react";

import api from "../../api/requests";

export default function Simulacoes() {
    const [safra, setSafra] = useState({
        area: "",
        produtividade: "",
    });

    const [custos, setCustos] = useState({
        insumos: "",
        mao_obra: "",
        maquinas: "",
        outros: "",
    });

    const [lucro, setLucro] = useState({
        preco_venda: "",
        quantidade: "",
        custo_total: "",
    });

    const [resultadoSafra, setResultadoSafra] = useState(null);
    const [resultadoCustos, setResultadoCustos] = useState(null);
    const [resultadoLucro, setResultadoLucro] = useState(null);

    async function simularSafra(e) {
        e.preventDefault();
        try {
            const data = await api.postData("/simulation/simular-safra", {
                area: Number(safra.area),
                produtividade: Number(safra.produtividade),
            });
            setResultadoSafra(data);
        } catch (error) {
            console.error(error);
        }
    }

    async function estimarCustos(e) {
        e.preventDefault();
        try {
            const data = await api.postData("/simulation/estimar-custos", {
                insumos: Number(custos.insumos),
                mao_obra: Number(custos.mao_obra),
                maquinas: Number(custos.maquinas),
                outros: Number(custos.outros),
            });
            setResultadoCustos(data);
        } catch (error) {
            console.error(error);
        }
    }

    async function estimarLucro(e) {
        e.preventDefault();
        try {
            const data = await api.postData("/simulation/estimar-lucro", {
                preco_venda: Number(lucro.preco_venda),
                quantidade: Number(lucro.quantidade),
                custo_total: Number(lucro.custo_total),
            });
            setResultadoLucro(data);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="min-h-screen bg-[#F4F1E8] p-6 pb-12">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex items-center gap-4 mb-10">
                    <div className="w-12 h-12 bg-[#1F3D2B] text-white rounded-2xl flex items-center justify-center">
                        <Calculator className="w-7 h-7" />
                    </div>
                    <div>
                        <h1 className="text-4xl font-bold text-[#1F3D2B]">Simulações</h1>
                        <p className="text-slate-600">Ferramentas para projeção de safra, custos e lucro</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* SIMULAR SAFRA */}
                    <div className="bg-white border border-[#E5E0D5] rounded-3xl p-8 shadow-xl">
                        <div className="flex items-center gap-3 mb-6">
                            <Leaf className="w-8 h-8 text-[#2F6B3F]" />
                            <h2 className="text-2xl font-semibold text-[#1F3D2B]">Simular Safra</h2>
                        </div>

                        <form onSubmit={simularSafra} className="space-y-5">
                            <div>
                                <label className="block text-sm text-slate-600 mb-1">Área (hectares)</label>
                                <input
                                    type="number"
                                    placeholder="Ex: 150"
                                    value={safra.area}
                                    onChange={(e) => setSafra({ ...safra, area: e.target.value })}
                                    className="w-full border border-[#E5E0D5] rounded-2xl px-4 py-3 focus:outline-none focus:border-[#2F6B3F]"
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-slate-600 mb-1">Produtividade (kg/ha)</label>
                                <input
                                    type="number"
                                    placeholder="Ex: 4500"
                                    value={safra.produtividade}
                                    onChange={(e) => setSafra({ ...safra, produtividade: e.target.value })}
                                    className="w-full border border-[#E5E0D5] rounded-2xl px-4 py-3 focus:outline-none focus:border-[#2F6B3F]"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-[#2F6B3F] hover:bg-[#1F3D2B] transition-colors text-white font-medium py-4 rounded-2xl mt-4"
                            >
                                Simular Produção
                            </button>
                        </form>

                        {resultadoSafra && (
                            <div className="mt-8 pt-6 border-t border-[#E5E0D5]">
                                <h3 className="font-semibold text-[#1F3D2B] mb-4">Resultado da Simulação</h3>
                                <div className="bg-[#F8F6F0] rounded-2xl p-5 text-sm">
                                    <pre className="whitespace-pre-wrap text-slate-700">
                                        {JSON.stringify(resultadoSafra, null, 2)}
                                    </pre>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* ESTIMAR CUSTOS */}
                    <div className="bg-white border border-[#E5E0D5] rounded-3xl p-8 shadow-xl">
                        <div className="flex items-center gap-3 mb-6">
                            <DollarSign className="w-8 h-8 text-[#2F6B3F]" />
                            <h2 className="text-2xl font-semibold text-[#1F3D2B]">Estimar Custos</h2>
                        </div>

                        <form onSubmit={estimarCustos} className="space-y-5">
                            <div>
                                <label className="block text-sm text-slate-600 mb-1">Insumos (R$)</label>
                                <input
                                    type="number"
                                    placeholder="Ex: 45000"
                                    value={custos.insumos}
                                    onChange={(e) => setCustos({ ...custos, insumos: e.target.value })}
                                    className="w-full border border-[#E5E0D5] rounded-2xl px-4 py-3 focus:outline-none focus:border-[#2F6B3F]"
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-slate-600 mb-1">Mão de Obra (R$)</label>
                                <input
                                    type="number"
                                    placeholder="Ex: 28000"
                                    value={custos.mao_obra}
                                    onChange={(e) => setCustos({ ...custos, mao_obra: e.target.value })}
                                    className="w-full border border-[#E5E0D5] rounded-2xl px-4 py-3 focus:outline-none focus:border-[#2F6B3F]"
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-slate-600 mb-1">Máquinas (R$)</label>
                                <input
                                    type="number"
                                    placeholder="Ex: 15000"
                                    value={custos.maquinas}
                                    onChange={(e) => setCustos({ ...custos, maquinas: e.target.value })}
                                    className="w-full border border-[#E5E0D5] rounded-2xl px-4 py-3 focus:outline-none focus:border-[#2F6B3F]"
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-slate-600 mb-1">Outros Custos (R$)</label>
                                <input
                                    type="number"
                                    placeholder="Ex: 8000"
                                    value={custos.outros}
                                    onChange={(e) => setCustos({ ...custos, outros: e.target.value })}
                                    className="w-full border border-[#E5E0D5] rounded-2xl px-4 py-3 focus:outline-none focus:border-[#2F6B3F]"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-[#2F6B3F] hover:bg-[#1F3D2B] transition-colors text-white font-medium py-4 rounded-2xl mt-4"
                            >
                                Calcular Custos Totais
                            </button>
                        </form>

                        {resultadoCustos && (
                            <div className="mt-8 pt-6 border-t border-[#E5E0D5]">
                                <h3 className="font-semibold text-[#1F3D2B] mb-4">Resultado dos Custos</h3>
                                <div className="bg-[#F8F6F0] rounded-2xl p-5 text-sm">
                                    <pre className="whitespace-pre-wrap text-slate-700">
                                        {JSON.stringify(resultadoCustos, null, 2)}
                                    </pre>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* ESTIMAR LUCRO */}
                    <div className="bg-white border border-[#E5E0D5] rounded-3xl p-8 shadow-xl">
                        <div className="flex items-center gap-3 mb-6">
                            <TrendingUp className="w-8 h-8 text-[#2F6B3F]" />
                            <h2 className="text-2xl font-semibold text-[#1F3D2B]">Estimar Lucro</h2>
                        </div>

                        <form onSubmit={estimarLucro} className="space-y-5">
                            <div>
                                <label className="block text-sm text-slate-600 mb-1">Preço de Venda (R$/unidade)</label>
                                <input
                                    type="number"
                                    placeholder="Ex: 85"
                                    value={lucro.preco_venda}
                                    onChange={(e) => setLucro({ ...lucro, preco_venda: e.target.value })}
                                    className="w-full border border-[#E5E0D5] rounded-2xl px-4 py-3 focus:outline-none focus:border-[#2F6B3F]"
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-slate-600 mb-1">Quantidade Produzida</label>
                                <input
                                    type="number"
                                    placeholder="Ex: 120000"
                                    value={lucro.quantidade}
                                    onChange={(e) => setLucro({ ...lucro, quantidade: e.target.value })}
                                    className="w-full border border-[#E5E0D5] rounded-2xl px-4 py-3 focus:outline-none focus:border-[#2F6B3F]"
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-slate-600 mb-1">Custo Total (R$)</label>
                                <input
                                    type="number"
                                    placeholder="Ex: 85000"
                                    value={lucro.custo_total}
                                    onChange={(e) => setLucro({ ...lucro, custo_total: e.target.value })}
                                    className="w-full border border-[#E5E0D5] rounded-2xl px-4 py-3 focus:outline-none focus:border-[#2F6B3F]"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-[#2F6B3F] hover:bg-[#1F3D2B] transition-colors text-white font-medium py-4 rounded-2xl mt-4"
                            >
                                Estimar Lucro
                            </button>
                        </form>

                        {resultadoLucro && (
                            <div className="mt-8 pt-6 border-t border-[#E5E0D5]">
                                <h3 className="font-semibold text-[#1F3D2B] mb-4">Resultado do Lucro</h3>
                                <div className="bg-[#F8F6F0] rounded-2xl p-5 text-sm">
                                    <pre className="whitespace-pre-wrap text-slate-700">
                                        {JSON.stringify(resultadoLucro, null, 2)}
                                    </pre>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}