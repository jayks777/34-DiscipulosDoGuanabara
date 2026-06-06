import { useEffect, useState } from "react";
import { Leaf, Plus, Edit2, Trash2, Search, Calendar } from "lucide-react";

import api from "../../api/requests";
import { useAuth } from "../../hooks/useAuth";

export default function Culturas() {
    const { user } = useAuth();
    const [culturas, setCulturas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCultura, setSelectedCultura] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState("create");

    async function loadCulturas() {
        try {
            const data = await api.getData("/culturas/list");
            setCulturas(data);
        } catch (error) {
            console.error("Erro ao carregar culturas", error);
        } finally {
            setLoading(false);
        }
    }

    async function deleteCultura(id, nome) {
        const confirmDelete = window.confirm(`Deseja realmente excluir a cultura "${nome}"? Esta ação não poderá ser desfeita.`);
        if (!confirmDelete) return;

        try {
            await api.deleteData(`/culturas/delete/${id}`);
            setCulturas((prev) => prev.filter((cultura) => cultura.id !== id));
        } catch (error) {
            console.error("Erro ao excluir cultura:", error);
            alert("Erro ao excluir cultura. Tente novamente.");
        }
    }

    function handleEdit(cultura) {
        setSelectedCultura(cultura);
        setModalMode("edit");
        setShowModal(true);
    }

    function handleCreate() {
        setSelectedCultura(null);
        setModalMode("create");
        setShowModal(true);
    }

    function handleCloseModal() {
        setShowModal(false);
        setSelectedCultura(null);
    }

    async function handleSave(culturaData) {
        try {
            if (modalMode === "create") {
                const newCultura = await api.postData("/culturas/create", culturaData);
                setCulturas((prev) => [newCultura, ...prev]);
            } else {
                const updatedCultura = await api.putData(`/culturas/update/${selectedCultura.id}`, culturaData);
                setCulturas((prev) =>
                    prev.map((c) => (c.id === selectedCultura.id ? updatedCultura : c))
                );
            }
            handleCloseModal();
        } catch (error) {
            console.error("Erro ao salvar cultura:", error);
            alert("Erro ao salvar cultura. Verifique os dados e tente novamente.");
        }
    }

    useEffect(() => {
        loadCulturas();
    }, []);

    const filteredCulturas = culturas.filter((cultura) =>
        cultura.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalArea = culturas.reduce((sum, c) => sum + (parseFloat(c.area) || 0), 0);
    const totalCulturas = culturas.length;

    if (loading) {
        return (
            <div className="min-h-screen bg-[#F4F1E8] flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-[#1F3D2B] border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-[#1F3D2B] font-medium">Carregando culturas...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F4F1E8] p-6 pb-12">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-10 gap-4">
                    <div>
                        <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
                            <a href="/dashboard" className="hover:text-[#2F6B3F] transition-colors">Dashboard</a>
                            <span>/</span>
                            <span className="text-[#1F3D2B] font-medium">Culturas</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-[#1F3D2B] text-white rounded-2xl flex items-center justify-center">
                                <Leaf className="w-7 h-7" />
                            </div>
                            <div>
                                <h1 className="text-4xl font-bold text-[#1F3D2B]">Culturas</h1>
                                <p className="text-slate-600">Gerencie suas áreas plantadas</p>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={handleCreate}
                        className="inline-flex items-center gap-3 bg-[#2F6B3F] hover:bg-[#1F3D2B] transition-all text-white px-6 py-3 rounded-2xl font-medium shadow-lg shadow-[#2F6B3F]/20"
                    >
                        <Plus className="w-5 h-5" />
                        Nova Cultura
                    </button>
                </div>

                {/* Estatísticas */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    <div className="bg-white border border-[#E5E0D5] rounded-3xl p-8 shadow-xl">
                        <p className="text-slate-500">Total de Culturas</p>
                        <h2 className="text-4xl font-bold text-[#1F3D2B] mt-3">{totalCulturas}</h2>
                    </div>
                    <div className="bg-white border border-[#E5E0D5] rounded-3xl p-8 shadow-xl">
                        <p className="text-slate-500">Área Total</p>
                        <h2 className="text-4xl font-bold text-[#1F3D2B] mt-3">{totalArea.toFixed(2)} ha</h2>
                    </div>
                    <div className="bg-white border border-[#E5E0D5] rounded-3xl p-8 shadow-xl">
                        <p className="text-slate-500">Média por Cultura</p>
                        <h2 className="text-4xl font-bold text-[#1F3D2B] mt-3">
                            {totalCulturas > 0 ? (totalArea / totalCulturas).toFixed(2) : "0"} ha
                        </h2>
                    </div>
                    <div className="bg-white border border-[#E5E0D5] rounded-3xl p-8 shadow-xl">
                        <p className="text-slate-500">Colheitas em 30 dias</p>
                        <h2 className="text-4xl font-bold text-[#2F6B3F] mt-3">
                            {culturas.filter(c => {
                                if (!c.data_colheita) return false;
                                const dias = Math.ceil((new Date(c.data_colheita) - new Date()) / (86400000));
                                return dias <= 30 && dias >= 0;
                            }).length}
                        </h2>
                    </div>
                </div>

                {/* Busca */}
                <div className="relative max-w-md mb-8">
                    <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Buscar cultura..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 bg-white border border-[#E5E0D5] rounded-2xl focus:outline-none focus:border-[#2F6B3F]"
                    />
                </div>

                {/* Tabela */}
                <div className="bg-white border border-[#E5E0D5] rounded-3xl shadow-xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-[#F8F6F0] border-b border-[#E5E0D5]">
                                    <th className="text-left p-6 font-semibold text-[#1F3D2B]">Cultura</th>
                                    <th className="text-left p-6 font-semibold text-[#1F3D2B]">Área</th>
                                    <th className="text-left p-6 font-semibold text-[#1F3D2B]">Plantio</th>
                                    <th className="text-left p-6 font-semibold text-[#1F3D2B]">Colheita</th>
                                    <th className="text-left p-6 font-semibold text-[#1F3D2B]">Status</th>
                                    <th className="text-left p-6 font-semibold text-[#1F3D2B]">Ações</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#E5E0D5]">
                                {filteredCulturas.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="p-20 text-center">
                                            <div className="flex flex-col items-center gap-3">
                                                <span className="text-6xl opacity-50">🌱</span>
                                                <p className="text-slate-500 font-medium">
                                                    {searchTerm ? "Nenhuma cultura encontrada." : "Nenhuma cultura cadastrada ainda."}
                                                </p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    filteredCulturas.map((cultura) => {
                                        const hoje = new Date();
                                        const plantio = new Date(cultura.data_plantio);
                                        const colheita = new Date(cultura.data_colheita);
                                        let status = "Planejada";
                                        let statusColor = "bg-yellow-100 text-yellow-700";

                                        if (hoje > colheita) {
                                            status = "Concluída";
                                            statusColor = "bg-green-100 text-green-700";
                                        } else if (hoje >= plantio) {
                                            status = "Em Andamento";
                                            statusColor = "bg-blue-100 text-blue-700";
                                        }

                                        return (
                                            <tr key={cultura.id} className="hover:bg-[#F8F6F0] transition-colors">
                                                <td className="p-6 font-medium text-[#1F3D2B]">{cultura.nome}</td>
                                                <td className="p-6 text-slate-600">{parseFloat(cultura.area).toFixed(2)} ha</td>
                                                <td className="p-6 text-slate-600">
                                                    {new Date(cultura.data_plantio).toLocaleDateString("pt-BR")}
                                                </td>
                                                <td className="p-6 text-slate-600">
                                                    {new Date(cultura.data_colheita).toLocaleDateString("pt-BR")}
                                                </td>
                                                <td className="p-6">
                                                    <span className={`inline-flex px-4 py-1.5 rounded-full text-sm font-medium ${statusColor}`}>
                                                        {status}
                                                    </span>
                                                </td>
                                                <td className="p-6">
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={() => handleEdit(cultura)}
                                                            className="p-2.5 hover:bg-yellow-100 text-yellow-600 rounded-xl transition"
                                                        >
                                                            <Edit2 className="w-5 h-5" />
                                                        </button>
                                                        <button
                                                            onClick={() => deleteCultura(cultura.id, cultura.nome)}
                                                            className="p-2.5 hover:bg-red-100 text-red-600 rounded-xl transition"
                                                        >
                                                            <Trash2 className="w-5 h-5" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Modal */}
                {showModal && (
                    <CulturaModal
                        mode={modalMode}
                        cultura={selectedCultura}
                        onClose={handleCloseModal}
                        onSave={handleSave}
                    />
                )}
            </div>
        </div>
    );
}

// Modal Component
function CulturaModal({ mode, cultura, onClose, onSave }) {
    const [formData, setFormData] = useState({
        nome: cultura?.nome || "",
        area: cultura?.area || "",
        data_plantio: cultura?.data_plantio ? cultura.data_plantio.split('T')[0] : "",
        data_colheita: cultura?.data_colheita ? cultura.data_colheita.split('T')[0] : "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden">
                <div className="p-8 border-b">
                    <h2 className="text-3xl font-bold text-[#1F3D2B]">
                        {mode === "create" ? "Nova Cultura" : "Editar Cultura"}
                    </h2>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    <div>
                        <label className="block text-sm text-slate-600 mb-2">Nome da Cultura</label>
                        <input
                            type="text"
                            name="nome"
                            value={formData.nome}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-[#E5E0D5] rounded-2xl focus:outline-none focus:border-[#2F6B3F]"
                            placeholder="Ex: Soja Safra 2026"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-slate-600 mb-2">Área (hectares)</label>
                        <input
                            type="number"
                            name="area"
                            value={formData.area}
                            onChange={handleChange}
                            step="0.01"
                            required
                            className="w-full px-4 py-3 border border-[#E5E0D5] rounded-2xl focus:outline-none focus:border-[#2F6B3F]"
                            placeholder="150.5"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-slate-600 mb-2">Data de Plantio</label>
                            <input
                                type="date"
                                name="data_plantio"
                                value={formData.data_plantio}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 border border-[#E5E0D5] rounded-2xl focus:outline-none focus:border-[#2F6B3F]"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-slate-600 mb-2">Data de Colheita</label>
                            <input
                                type="date"
                                name="data_colheita"
                                value={formData.data_colheita}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 border border-[#E5E0D5] rounded-2xl focus:outline-none focus:border-[#2F6B3F]"
                            />
                        </div>
                    </div>

                    <div className="flex gap-4 pt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-4 border border-[#E5E0D5] rounded-2xl font-medium hover:bg-slate-50 transition"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="flex-1 py-4 bg-[#2F6B3F] hover:bg-[#1F3D2B] text-white rounded-2xl font-medium transition"
                        >
                            {mode === "create" ? "Cadastrar Cultura" : "Salvar Alterações"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}