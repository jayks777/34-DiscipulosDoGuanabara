import { useEffect, useState } from "react";
import api from "../../api/requests";
import { useAuth } from "../../hooks/useAuth";

export default function Culturas() {
  const { user } = useAuth();
  const [culturas, setCulturas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCultura, setSelectedCultura] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("create"); // 'create' or 'edit'

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
    const confirmDelete = window.confirm(
      `Deseja realmente excluir a cultura "${nome}"? Esta ação não poderá ser desfeita.`
    );

    if (!confirmDelete) return;

    try {
      await api.deleteData(`/culturas/delete/${id}`);
      setCulturas((prev) => prev.filter((cultura) => cultura.id !== id));
      
      // Feedback opcional (você pode implementar um toast)
      console.log(`Cultura "${nome}" excluída com sucesso`);
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

  // Filtra culturas baseado no termo de busca
  const filteredCulturas = culturas.filter((cultura) =>
    cultura.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Estatísticas
  const totalArea = culturas.reduce((sum, c) => sum + (parseFloat(c.area) || 0), 0);
  const totalCulturas = culturas.length;

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F4F1E8] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#2F6B3F] mx-auto mb-4"></div>
          <p className="text-slate-600">Carregando culturas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F1E8] p-6">
      {/* Cabeçalho com navegação */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
            <a href="/dashboard" className="hover:text-[#2F6B3F]">Dashboard</a>
            <span>/</span>
            <span className="text-[#1F3D2B] font-medium">Culturas</span>
          </div>
          <h1 className="text-3xl font-bold text-[#1F3D2B]">
            Culturas
          </h1>
          <p className="text-slate-600 mt-1">
            Gerencie suas culturas cadastradas
          </p>
        </div>

        <button
          onClick={handleCreate}
          className="inline-flex items-center gap-2 bg-[#2F6B3F] text-white px-5 py-2.5 rounded-lg hover:bg-[#1F3D2B] transition shadow-sm font-medium"
        >
          <span className="text-xl">+</span>
          Nova Cultura
        </button>
      </div>

      {/* Cards de estatísticas */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <div className="bg-white border rounded-xl p-5 shadow-sm">
          <p className="text-sm text-slate-500 uppercase tracking-wide">
            Total de Culturas
          </p>
          <h2 className="text-2xl font-bold text-[#2F6B3F] mt-1">
            {totalCulturas}
          </h2>
        </div>

        <div className="bg-white border rounded-xl p-5 shadow-sm">
          <p className="text-sm text-slate-500 uppercase tracking-wide">
            Área Total
          </p>
          <h2 className="text-2xl font-bold text-[#2F6B3F] mt-1">
            {totalArea.toFixed(2)} ha
          </h2>
        </div>

        <div className="bg-white border rounded-xl p-5 shadow-sm">
          <p className="text-sm text-slate-500 uppercase tracking-wide">
            Média por Cultura
          </p>
          <h2 className="text-2xl font-bold text-[#2F6B3F] mt-1">
            {totalCulturas > 0 ? (totalArea / totalCulturas).toFixed(2) : "0"} ha
          </h2>
        </div>

        <div className="bg-white border rounded-xl p-5 shadow-sm">
          <p className="text-sm text-slate-500 uppercase tracking-wide">
            Próximas Colheitas
          </p>
          <h2 className="text-2xl font-bold text-[#2F6B3F] mt-1">
            {culturas.filter(c => {
              if (!c.data_colheita) return false;
              const diasRestantes = Math.ceil((new Date(c.data_colheita) - new Date()) / (1000 * 60 * 60 * 24));
              return diasRestantes <= 30 && diasRestantes >= 0;
            }).length}
          </h2>
        </div>
      </div>

      {/* Barra de pesquisa */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <input
            type="text"
            placeholder="🔍 Buscar cultura por nome..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 pl-10 pr-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2F6B3F] focus:border-transparent"
          />
          <svg
            className="absolute left-3 top-2.5 h-5 w-5 text-slate-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* Tabela de Culturas */}
      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-gradient-to-r from-slate-50 to-white">
                <th className="text-left p-4 font-semibold text-slate-700">
                  Cultura
                </th>
                <th className="text-left p-4 font-semibold text-slate-700">
                  Área (ha)
                </th>
                <th className="text-left p-4 font-semibold text-slate-700">
                  Data de Plantio
                </th>
                <th className="text-left p-4 font-semibold text-slate-700">
                  Data de Colheita
                </th>
                <th className="text-left p-4 font-semibold text-slate-700">
                  Status
                </th>
                <th className="text-left p-4 font-semibold text-slate-700">
                  Ações
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredCulturas.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-12 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-5xl">🌾</span>
                      <p className="text-slate-500 font-medium">
                        {searchTerm ? "Nenhuma cultura encontrada com este nome." : "Nenhuma cultura cadastrada."}
                      </p>
                      {!searchTerm && (
                        <button
                          onClick={handleCreate}
                          className="mt-2 text-[#2F6B3F] hover:underline font-medium"
                        >
                          Cadastrar primeira cultura
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ) : (
                filteredCulturas.map((cultura) => {
                  // Calcula status da cultura
                  let status = "Planejada";
                  let statusColor = "bg-gray-100 text-gray-700";
                  const hoje = new Date();
                  const dataPlantio = new Date(cultura.data_plantio);
                  const dataColheita = new Date(cultura.data_colheita);

                  if (hoje > dataColheita) {
                    status = "Concluída";
                    statusColor = "bg-green-100 text-green-700";
                  } else if (hoje >= dataPlantio && hoje <= dataColheita) {
                    status = "Em Andamento";
                    statusColor = "bg-blue-100 text-blue-700";
                  } else if (hoje < dataPlantio) {
                    status = "Planejada";
                    statusColor = "bg-yellow-100 text-yellow-700";
                  }

                  return (
                    <tr key={cultura.id} className="border-b hover:bg-slate-50 transition">
                      <td className="p-4 font-medium text-[#1F3D2B]">
                        {cultura.nome}
                      </td>
                      <td className="p-4 text-slate-600">
                        {parseFloat(cultura.area).toFixed(2)} ha
                      </td>
                      <td className="p-4 text-slate-600">
                        {new Date(cultura.data_plantio).toLocaleDateString("pt-BR")}
                      </td>
                      <td className="p-4 text-slate-600">
                        {new Date(cultura.data_colheita).toLocaleDateString("pt-BR")}
                      </td>
                      <td className="p-4">
                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${statusColor}`}>
                          {status}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(cultura)}
                            className="px-3 py-1.5 rounded-lg bg-yellow-500 text-white hover:bg-yellow-600 transition text-sm font-medium"
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => deleteCultura(cultura.id, cultura.nome)}
                            className="px-3 py-1.5 rounded-lg bg-red-500 text-white hover:bg-red-600 transition text-sm font-medium"
                          >
                            Excluir
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

      {/* Rodapé */}
      <footer className="mt-10 text-center text-sm text-slate-400 border-t pt-6">
        © {new Date().getFullYear()} Gaia — Sistema de Gestão Agrícola
      </footer>

      {/* Modal de Criar/Editar Cultura */}
      {showModal && (
        <CulturaModal
          mode={modalMode}
          cultura={selectedCultura}
          onClose={handleCloseModal}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

// Componente Modal para Criar/Editar Cultura
function CulturaModal({ mode, cultura, onClose, onSave }) {
  const [formData, setFormData] = useState({
    nome: cultura?.nome || "",
    area: cultura?.area || "",
    data_plantio: cultura?.data_plantio || "",
    data_colheita: cultura?.data_colheita || "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.nome || !formData.area || !formData.data_plantio || !formData.data_colheita) {
      alert("Por favor, preencha todos os campos.");
      return;
    }
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-[#1F3D2B]">
            {mode === "create" ? "Nova Cultura" : "Editar Cultura"}
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 text-2xl"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Nome da Cultura *
            </label>
            <input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2F6B3F]"
              placeholder="Ex: Soja, Milho, Trigo"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Área (hectares) *
            </label>
            <input
              type="number"
              name="area"
              value={formData.area}
              onChange={handleChange}
              step="0.01"
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2F6B3F]"
              placeholder="0.00"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Data de Plantio *
            </label>
            <input
              type="date"
              name="data_plantio"
              value={formData.data_plantio}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2F6B3F]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Data de Colheita *
            </label>
            <input
              type="date"
              name="data_colheita"
              value={formData.data_colheita}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2F6B3F]"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border rounded-lg text-slate-700 hover:bg-slate-50 transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-[#2F6B3F] text-white rounded-lg hover:bg-[#1F3D2B] transition font-medium"
            >
              {mode === "create" ? "Cadastrar" : "Salvar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}