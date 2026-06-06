import { useEffect, useState } from "react";
import { DollarSign, TrendingUp, TrendingDown, PlusCircle, Calendar } from "lucide-react";

import api from "../../api/requests";

export default function Financeiro() {
    const [loading, setLoading] = useState(true);
    const [receitas, setReceitas] = useState([]);
    const [despesas, setDespesas] = useState([]);
    const [fluxoCaixa, setFluxoCaixa] = useState(null);

    const [novaReceita, setNovaReceita] = useState({
        descricao: "",
        valor: "",
        data: "",
    });

    const [novaDespesa, setNovaDespesa] = useState({
        descricao: "",
        valor: "",
        categoria: "",
        data: "",
    });

    async function loadFinanceiro() {
        try {
            const [receitasData, despesasData, fluxoData] = await Promise.all([
                api.getData("/financeiro/receitas"),
                api.getData("/financeiro/despesas"),
                api.getData("/financeiro/fluxo-caixa"),
            ]);

            setReceitas(receitasData);
            setDespesas(despesasData);
            setFluxoCaixa(fluxoData);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    async function createReceita(e) {
        e.preventDefault();
        try {
            await api.postData("/financeiro/receitas", {
                descricao: novaReceita.descricao,
                valor: Number(novaReceita.valor),
                data: new Date(novaReceita.data).toISOString(),
            });

            setNovaReceita({ descricao: "", valor: "", data: "" });
            await loadFinanceiro();
        } catch (error) {
            console.error(error);
        }
    }

    async function createDespesa(e) {
        e.preventDefault();
        try {
            await api.postData("/financeiro/despesas", {
                descricao: novaDespesa.descricao,
                valor: Number(novaDespesa.valor),
                categoria: novaDespesa.categoria,
                data: new Date(novaDespesa.data).toISOString(),
            });

            setNovaDespesa({ descricao: "", valor: "", categoria: "", data: "" });
            await loadFinanceiro();
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        loadFinanceiro();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#F4F1E8] flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-[#1F3D2B] border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-[#1F3D2B] font-medium">Carregando financeiro...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F4F1E8] p-6 pb-12">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex items-center gap-4 mb-10">
                    <div className="w-12 h-12 bg-[#1F3D2B] text-white rounded-2xl flex items-center justify-center">
                        <DollarSign className="w-7 h-7" />
                    </div>
                    <div>
                        <h1 className="text-4xl font-bold text-[#1F3D2B]">Financeiro</h1>
                        <p className="text-slate-600">Controle financeiro da propriedade</p>
                    </div>
                </div>

                {/* RESUMO */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <div className="bg-white border border-[#E5E0D5] rounded-3xl p-8 shadow-xl">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-slate-500 text-sm">Total Receitas</p>
                                <h2 className="text-3xl font-bold text-green-600 mt-2">
                                    R$ {Number(fluxoCaixa?.total_receitas || 0).toLocaleString('pt-BR')}
                                </h2>
                            </div>
                            <TrendingUp className="w-10 h-10 text-green-600" />
                        </div>
                    </div>

                    <div className="bg-white border border-[#E5E0D5] rounded-3xl p-8 shadow-xl">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-slate-500 text-sm">Total Despesas</p>
                                <h2 className="text-3xl font-bold text-red-600 mt-2">
                                    R$ {Number(fluxoCaixa?.total_despesas || 0).toLocaleString('pt-BR')}
                                </h2>
                            </div>
                            <TrendingDown className="w-10 h-10 text-red-600" />
                        </div>
                    </div>

                    <div className="bg-white border border-[#E5E0D5] rounded-3xl p-8 shadow-xl">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-slate-500 text-sm">Saldo Atual</p>
                                <h2 className="text-3xl font-bold text-[#2F6B3F] mt-2">
                                    R$ {Number(fluxoCaixa?.saldo || 0).toLocaleString('pt-BR')}
                                </h2>
                            </div>
                            <DollarSign className="w-10 h-10 text-[#2F6B3F]" />
                        </div>
                    </div>
                </div>

                {/* FORMULÁRIOS */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
                    {/* Nova Receita */}
                    <div className="bg-white border border-[#E5E0D5] rounded-3xl p-8 shadow-xl">
                        <div className="flex items-center gap-3 mb-6">
                            <PlusCircle className="w-7 h-7 text-green-600" />
                            <h2 className="text-2xl font-semibold text-[#1F3D2B]">Nova Receita</h2>
                        </div>

                        <form onSubmit={createReceita} className="space-y-5">
                            <div>
                                <label className="block text-sm text-slate-600 mb-1">Descrição</label>
                                <input
                                    type="text"
                                    placeholder="Ex: Venda de soja"
                                    value={novaReceita.descricao}
                                    onChange={(e) => setNovaReceita({ ...novaReceita, descricao: e.target.value })}
                                    className="w-full border border-[#E5E0D5] rounded-2xl px-4 py-3 focus:outline-none focus:border-green-600"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-slate-600 mb-1">Valor (R$)</label>
                                <input
                                    type="number"
                                    placeholder="0,00"
                                    value={novaReceita.valor}
                                    onChange={(e) => setNovaReceita({ ...novaReceita, valor: e.target.value })}
                                    className="w-full border border-[#E5E0D5] rounded-2xl px-4 py-3 focus:outline-none focus:border-green-600"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-slate-600 mb-1">Data</label>
                                <input
                                    type="date"
                                    value={novaReceita.data}
                                    onChange={(e) => setNovaReceita({ ...novaReceita, data: e.target.value })}
                                    className="w-full border border-[#E5E0D5] rounded-2xl px-4 py-3 focus:outline-none focus:border-green-600"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-green-600 hover:bg-green-700 transition-colors text-white font-medium py-4 rounded-2xl mt-4"
                            >
                                Adicionar Receita
                            </button>
                        </form>
                    </div>

                    {/* Nova Despesa */}
                    <div className="bg-white border border-[#E5E0D5] rounded-3xl p-8 shadow-xl">
                        <div className="flex items-center gap-3 mb-6">
                            <PlusCircle className="w-7 h-7 text-red-600" />
                            <h2 className="text-2xl font-semibold text-[#1F3D2B]">Nova Despesa</h2>
                        </div>

                        <form onSubmit={createDespesa} className="space-y-5">
                            <div>
                                <label className="block text-sm text-slate-600 mb-1">Descrição</label>
                                <input
                                    type="text"
                                    placeholder="Ex: Compra de fertilizante"
                                    value={novaDespesa.descricao}
                                    onChange={(e) => setNovaDespesa({ ...novaDespesa, descricao: e.target.value })}
                                    className="w-full border border-[#E5E0D5] rounded-2xl px-4 py-3 focus:outline-none focus:border-red-600"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-slate-600 mb-1">Valor (R$)</label>
                                <input
                                    type="number"
                                    placeholder="0,00"
                                    value={novaDespesa.valor}
                                    onChange={(e) => setNovaDespesa({ ...novaDespesa, valor: e.target.value })}
                                    className="w-full border border-[#E5E0D5] rounded-2xl px-4 py-3 focus:outline-none focus:border-red-600"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-slate-600 mb-1">Categoria</label>
                                <input
                                    type="text"
                                    placeholder="Ex: Insumos"
                                    value={novaDespesa.categoria}
                                    onChange={(e) => setNovaDespesa({ ...novaDespesa, categoria: e.target.value })}
                                    className="w-full border border-[#E5E0D5] rounded-2xl px-4 py-3 focus:outline-none focus:border-red-600"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-slate-600 mb-1">Data</label>
                                <input
                                    type="date"
                                    value={novaDespesa.data}
                                    onChange={(e) => setNovaDespesa({ ...novaDespesa, data: e.target.value })}
                                    className="w-full border border-[#E5E0D5] rounded-2xl px-4 py-3 focus:outline-none focus:border-red-600"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-red-600 hover:bg-red-700 transition-colors text-white font-medium py-4 rounded-2xl mt-4"
                            >
                                Adicionar Despesa
                            </button>
                        </form>
                    </div>
                </div>

                {/* LISTAS */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Receitas */}
                    <div className="bg-white border border-[#E5E0D5] rounded-3xl p-8 shadow-xl">
                        <h2 className="text-2xl font-semibold text-[#1F3D2B] mb-6 flex items-center gap-3">
                            <TrendingUp className="w-6 h-6 text-green-600" />
                            Receitas
                        </h2>

                        {receitas.length === 0 ? (
                            <p className="text-slate-500 text-center py-12">Nenhuma receita cadastrada ainda.</p>
                        ) : (
                            <div className="space-y-4 max-h-[600px] overflow-auto pr-2">
                                {receitas.map((receita) => (
                                    <div
                                        key={receita.id}
                                        className="flex justify-between items-center bg-[#F8F6F0] border border-[#E5E0D5] rounded-2xl p-5"
                                    >
                                        <div>
                                            <p className="font-medium text-[#1F3D2B]">{receita.descricao}</p>
                                            <p className="text-sm text-slate-500 flex items-center gap-1">
                                                <Calendar className="w-4 h-4" />
                                                {new Date(receita.data).toLocaleDateString('pt-BR')}
                                            </p>
                                        </div>
                                        <p className="text-2xl font-semibold text-green-600">
                                            R$ {Number(receita.valor).toLocaleString('pt-BR')}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Despesas */}
                    <div className="bg-white border border-[#E5E0D5] rounded-3xl p-8 shadow-xl">
                        <h2 className="text-2xl font-semibold text-[#1F3D2B] mb-6 flex items-center gap-3">
                            <TrendingDown className="w-6 h-6 text-red-600" />
                            Despesas
                        </h2>

                        {despesas.length === 0 ? (
                            <p className="text-slate-500 text-center py-12">Nenhuma despesa cadastrada ainda.</p>
                        ) : (
                            <div className="space-y-4 max-h-[600px] overflow-auto pr-2">
                                {despesas.map((despesa) => (
                                    <div
                                        key={despesa.id}
                                        className="flex justify-between items-center bg-[#F8F6F0] border border-[#E5E0D5] rounded-2xl p-5"
                                    >
                                        <div>
                                            <p className="font-medium text-[#1F3D2B]">{despesa.descricao}</p>
                                            <p className="text-sm text-slate-500">{despesa.categoria}</p>
                                            <p className="text-sm text-slate-500 flex items-center gap-1">
                                                <Calendar className="w-4 h-4" />
                                                {new Date(despesa.data).toLocaleDateString('pt-BR')}
                                            </p>
                                        </div>
                                        <p className="text-2xl font-semibold text-red-600">
                                            R$ {Number(despesa.valor).toLocaleString('pt-BR')}
                                        </p>
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