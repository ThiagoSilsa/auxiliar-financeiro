"use client";
// React
import { useState, useMemo } from "react";

// Icons
import { AiFillBank } from "react-icons/ai";
import { CiMenuKebab } from "react-icons/ci";

// Components
import {
  ContainerDiv,
  MainContainer,
} from "@/components/created/main-container/main-container";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import GenericModal from "@/components/created/generic-modal/generic-modal";
import GenericDeleteModal from "@/components/created/generic-delete-modal/generic-delete-modal";
import FormFields from "./components/form-fields";
import ContasInfo from "./components/contas-info";

// Toast
import { toast } from "sonner";

// Mock
import CONTAS_INICIAIS from "./Mock/data.json";

// lib
import { formatCurrency } from "@/lib/format";

const initialform = {
  nome: "",
  tipo: "corrente",
  saldo: 0,
  ativa: false,
};

export default function ContasPage() {
  const [contas, setContas] = useState(CONTAS_INICIAIS?.data || []);

  const [isGenericModalOpen, setIsGenericModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [isEditing, setIsEditing] = useState(false);

  const [form, setForm] = useState(initialform);

  const handleOpenAddModal = () => {
    setIsEditing(false);
    setForm(initialform);
    setIsGenericModalOpen(true);
  };

  const handleOpenEditModal = (conta) => {
    setIsEditing(true);
    setForm({
      id: conta.id,
      nome: conta.nome,
      tipo: conta.tipo,
      saldo: conta.saldo,
      ativa: conta.ativa,
    });
    setIsGenericModalOpen(true);
  };

  const handleOpenDeleteModal = (conta) => {
    setForm({
      id: conta.id,
      nome: conta.nome,
      tipo: conta.tipo,
      saldo: conta.saldo,
      ativa: conta.ativa,
    });
    setIsDeleteModalOpen(true);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    setContas((prev) => [
      ...prev,
      {
        id: String(Date.now()),
        nome: form.nome,
        tipo: form.tipo,
        saldo: form.saldo,
        ativa: form.ativa,
      },
    ]);
    setIsGenericModalOpen(false);
    toast.success("Conta adicionada com sucesso!");
  };

  const handleEdit = (e) => {
    e.preventDefault();
    setContas((prev) =>
      prev.map((conta) =>
        conta.id === form.id
          ? {
              ...conta,
              nome: form.nome,
              tipo: form.tipo,
              saldo: form.saldo,
              ativa: !form.ativa,
            }
          : conta,
      ),
    );
    setIsGenericModalOpen(false);
    toast.success("Conta editada com sucesso!");
  };

  const handleDelete = () => {
    setContas((prev) => prev.filter((conta) => conta.id !== form.id));
    setIsDeleteModalOpen(false);
    toast.success("Conta excluída com sucesso!");
  };
  // Total de todas as contas
  const totalContas = useMemo(
    () => contas.reduce((acc, conta) => acc + conta.saldo, 0),
    [contas],
  );

  return (
    <main>
      <GenericModal
        isOpen={isGenericModalOpen}
        onOpenChange={setIsGenericModalOpen}
        title={isEditing ? "Editar Conta" : "Adicionar Conta"}
        description={
          isEditing
            ? "Edite os dados da conta selecionada."
            : "Adicione uma nova conta ao sistema."
        }
        submitLabel={isEditing ? "Editar" : "Adicionar"}
        onSubmit={isEditing ? handleEdit : handleAdd}
      >
        {/* Campos do formulário */}
        <FormFields form={form} setForm={setForm} />
      </GenericModal>

      <GenericDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onDelete={handleDelete}
        itemName={form?.nome}
      />
      <MainContainer>
        <ContainerDiv>
          <ContasInfo
            totalContas={totalContas}
            openModal={handleOpenAddModal}
          />
        </ContainerDiv>

        <ContainerDiv className="grid-cols-1 md:grid-cols-3">
          {contas.map((conta) => (
            <Card key={conta.id} className="w-full">
              <CardHeader className="flex gap-2 justify-between items-center">
                <div className="flex items-center-safe justify-center gap-2">
                  <div className="p-2 bg-primary  rounded-md text-white">
                    <AiFillBank />
                  </div>
                  <div>
                    <CardTitle>{conta.nome}</CardTitle>
                    <p>{conta.tipo}</p>
                  </div>
                </div>
                <div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <CiMenuKebab />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem
                        className="cursor-pointer"
                        onSelect={() => handleOpenEditModal(conta)}
                      >
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="cursor-pointer"
                        onSelect={() => handleOpenDeleteModal(conta)}
                      >
                        Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent>
                <p>
                  Saldo:{" "}
                  <span className="font-bold text-ring/80">
                    {formatCurrency(conta.saldo)}
                  </span>
                </p>
              </CardContent>
            </Card>
          ))}
        </ContainerDiv>
      </MainContainer>
    </main>
  );
}
