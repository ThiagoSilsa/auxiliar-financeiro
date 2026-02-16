"use client";
// React
import { useState } from "react";

// Components
import {
  ContainerDiv,
  MainContainer,
} from "@/components/created/main-container/main-container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ExtratoFilter from "./components/extrato-filter";
import ExtratoInfo from "./components/extrato-info";
import GenericTable from "@/components/created/generic-table/generic-table";
import GenericModal from "@/components/created/generic-modal/generic-modal";
import GenericDeleteModal from "@/components/created/generic-delete-modal/generic-delete-modal";
import FormFields from "./components/form-fields";

// Config
import { getExtratoColumns } from "./config/columns";

// Mock
import TRANSACOES_INICIAIS from "./Mock/data.json";

// lib
import { toast } from "sonner";

const CATEGORIAS = [
  "Moradia",
  "Alimentação",
  "Transporte",
  "Saúde",
  "Lazer",
  "Educação",
  "Utilidades",
  "Investimento",
];

const CONTAS = ["Nubank", "Banco do Brasil", "Itaú", "Bradesco"];

const initialForm = {
  tipo: "entrada",
  descricao: "",
  categoria: "",
  valor: 0,
  data: "",
  conta: "",
};

export default function ExtratoPage() {
  const [transacoes, setTransacoes] = useState(TRANSACOES_INICIAIS?.data || []);
  const [searchTerm, setSearchTerm] = useState("");
  const [filtroTipo, setFiltroTipo] = useState("todos");
  const [filtroCategoria, setFiltroCategoria] = useState("todos");

  const [isGenericModalOpen, setIsGenericModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [form, setForm] = useState(initialForm);

  const handleOpenAddModal = () => {
    setIsEditing(false);
    setForm(initialForm);
    setIsGenericModalOpen(true);
  };

  const handleOpenEditModal = (transacao) => {
    setIsEditing(true);
    setForm({
      id: transacao.id,
      tipo: transacao.tipo,
      descricao: transacao.descricao,
      categoria: transacao.categoria,
      valor: transacao.valor,
      data: transacao.data.split("T")[0], // Converte ISO para YYYY-MM-DD
      conta: transacao.conta,
    });
    setIsGenericModalOpen(true);
  };

  const handleOpenDeleteModal = (transacao) => {
    setForm({
      id: transacao.id,
      descricao: transacao.descricao,
    });
    setIsDeleteModalOpen(true);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const transacao = {
      id: Date.now().toString(),
      tipo: form.tipo,
      descricao: form.descricao,
      categoria: form.categoria,
      valor: parseFloat(form.valor),
      data: new Date(form.data).toISOString(),
      conta: form.conta,
    };
    setTransacoes([transacao, ...transacoes]);
    setIsGenericModalOpen(false);
    toast.success("Transação adicionada com sucesso!");
  };

  const handleEdit = (e) => {
    e.preventDefault();
    setTransacoes((prev) =>
      prev.map((transacao) =>
        transacao.id === form.id
          ? {
              ...transacao,
              tipo: form.tipo,
              descricao: form.descricao,
              categoria: form.categoria,
              valor: parseFloat(form.valor),
              data: new Date(form.data).toISOString(),
              conta: form.conta,
            }
          : transacao,
      ),
    );
    setIsGenericModalOpen(false);
    toast.success("Transação editada com sucesso!");
  };

  const handleDelete = () => {
    setTransacoes((prev) =>
      prev.filter((transacao) => transacao.id !== form.id),
    );
    setIsDeleteModalOpen(false);
    toast.success("Transação excluída com sucesso!");
  };

  // Filtragem das transações com base nos filtros e termo de busca
  const transacoesFiltradas = transacoes.filter((transacao) => {
    const matchBusca =
      transacao.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transacao.conta.toLowerCase().includes(searchTerm.toLowerCase());

    const matchTipo =
      filtroTipo === "todos" ||
      (filtroTipo === "entrada" && transacao.tipo === "entrada") ||
      (filtroTipo === "saida" && transacao.tipo === "saida");

    const matchCategoria =
      filtroCategoria === "todos" || transacao.categoria === filtroCategoria;

    return matchBusca && matchTipo && matchCategoria;
  });

  const columns = getExtratoColumns();
  return (
    <main>
      <GenericModal
        isOpen={isGenericModalOpen}
        onOpenChange={setIsGenericModalOpen}
        title={isEditing ? "Editar Transação" : "Adicionar Transação"}
        description={
          isEditing
            ? "Edite os dados da transação selecionada."
            : "Adicione uma nova transação ao sistema."
        }
        submitLabel={isEditing ? "Editar" : "Adicionar"}
        onSubmit={isEditing ? handleEdit : handleAdd}
      >
        <FormFields
          form={form}
          setForm={setForm}
          CATEGORIAS={CATEGORIAS}
          CONTAS={CONTAS}
        />
      </GenericModal>

      <GenericDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onDelete={handleDelete}
        itemName={form?.descricao}
      />

      <MainContainer>
        <ContainerDiv>
          <ExtratoInfo openModal={handleOpenAddModal} />
        </ContainerDiv>

        <ContainerDiv>
          <ExtratoFilter
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filtroTipo={filtroTipo}
            setFiltroTipo={setFiltroTipo}
            filtroCategoria={filtroCategoria}
            setFiltroCategoria={setFiltroCategoria}
            CATEGORIAS={CATEGORIAS}
          />
        </ContainerDiv>

        <ContainerDiv>
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Transações</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Tabela */}
              <GenericTable
                data={transacoesFiltradas}
                columns={columns}
                pageSize={10}
                showPagination={true}
                showActions={true}
                onStartEdit={handleOpenEditModal}
                onStartDelete={handleOpenDeleteModal}
              />
            </CardContent>
          </Card>
        </ContainerDiv>
      </MainContainer>
    </main>
  );
}
