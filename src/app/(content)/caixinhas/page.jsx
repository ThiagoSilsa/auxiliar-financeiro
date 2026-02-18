"use client";
// React
import { useState, useMemo } from "react";

// Icons
import { TbPigMoney } from "react-icons/tb";
import { CiMenuKebab } from "react-icons/ci";
import { FaPlus } from "react-icons/fa";

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
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import GenericModal from "@/components/created/generic-modal/generic-modal";
import GenericDeleteModal from "@/components/created/generic-delete-modal/generic-delete-modal";
import FormFields from "./components/form-fields";
import CaixinhasInfo from "./components/caixinhas-info";

// Toast
import { toast } from "sonner";

// Mock
import CAIXINHAS_INICIAIS from "./Mock/data.json";

// lib
import { formatCurrency, formatDate } from "@/lib/format";
import DepositFields from "./components/deposit-fields";

const initialForm = {
  nome: "",
  contaVinculada: "",
  valorAtual: 0,
  valorObjetivo: 0,
  prazo: "",
  depositoMensal: 0,
  ativa: true,
};

export default function CaixinhasPage() {
  const [caixinhas, setCaixinhas] = useState(CAIXINHAS_INICIAIS?.data || []);

  const [isGenericModalOpen, setIsGenericModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState(initialForm);

  const [depositTarget, setDepositTarget] = useState(null);
  const [depositValue, setDepositValue] = useState(0);

  // Handlers de modal
  const handleOpenAddModal = () => {
    setIsEditing(false);
    setForm(initialForm);
    setIsGenericModalOpen(true);
  };

  const handleOpenEditModal = (caixinha) => {
    setIsEditing(true);
    setForm({
      id: caixinha.id,
      nome: caixinha.nome,
      contaVinculada: caixinha.contaVinculada,
      valorAtual: caixinha.valorAtual,
      valorObjetivo: caixinha.valorObjetivo,
      prazo: caixinha.prazo,
      depositoMensal: caixinha.depositoMensal,
      ativa: caixinha.ativa,
    });
    setIsGenericModalOpen(true);
  };

  const handleOpenDeleteModal = (caixinha) => {
    setForm({
      id: caixinha.id,
      nome: caixinha.nome,
    });
    setIsDeleteModalOpen(true);
  };

  const handleOpenDepositModal = (caixinha) => {
    setDepositTarget(caixinha);
    setDepositValue(caixinha.depositoMensal);
    setIsDepositModalOpen(true);
  };

  // CRUD
  const handleAdd = (e) => {
    e.preventDefault();
    setCaixinhas((prev) => [
      ...prev,
      {
        id: String(Date.now()),
        nome: form.nome,
        contaVinculada: form.contaVinculada,
        valorAtual: form.valorAtual,
        valorObjetivo: form.valorObjetivo,
        prazo: form.prazo,
        depositoMensal: form.depositoMensal,
        ativa: form.ativa,
      },
    ]);
    setIsGenericModalOpen(false);
    toast.success("Caixinha criada com sucesso!");
  };

  const handleEdit = (e) => {
    e.preventDefault();
    setCaixinhas((prev) =>
      prev.map((c) =>
        c.id === form.id
          ? {
              ...c,
              nome: form.nome,
              contaVinculada: form.contaVinculada,
              valorAtual: form.valorAtual,
              valorObjetivo: form.valorObjetivo,
              prazo: form.prazo,
              depositoMensal: form.depositoMensal,
              ativa: form.ativa,
            }
          : c,
      ),
    );
    setIsGenericModalOpen(false);
    toast.success("Caixinha editada com sucesso!");
  };

  const handleDelete = () => {
    setCaixinhas((prev) => prev.filter((c) => c.id !== form.id));
    setIsDeleteModalOpen(false);
    toast.success("Caixinha excluída com sucesso!");
  };

  const handleDeposit = (e) => {
    e.preventDefault();
    if (!depositTarget || depositValue <= 0) return;

    setCaixinhas((prev) =>
      prev.map((c) =>
        c.id === depositTarget.id
          ? {
              ...c,
              valorAtual: Math.min(
                c.valorAtual + depositValue,
                c.valorObjetivo,
              ),
            }
          : c,
      ),
    );
    setIsDepositModalOpen(false);
    toast.success(
      `Depósito de ${formatCurrency(depositValue)} realizado na caixinha "${depositTarget.nome}"!`,
    );
  };

  // Cálculos
  const caixinhasAtivas = useMemo(
    () => caixinhas.filter((c) => c.ativa).length,
    [caixinhas],
  );

  const percentualGeral = useMemo(() => {
    if (caixinhas.length === 0) return 0;
    const ativas = caixinhas.filter((c) => c.ativa);
    if (ativas.length === 0) return 0;
    const totalAtual = ativas.reduce((acc, c) => acc + c.valorAtual, 0);
    const totalObjetivo = ativas.reduce((acc, c) => acc + c.valorObjetivo, 0);
    return totalObjetivo > 0 ? (totalAtual / totalObjetivo) * 100 : 0;
  }, [caixinhas]);

  const getPercentual = (atual, objetivo) => {
    if (objetivo <= 0) return 0;
    return Math.min((atual / objetivo) * 100, 100);
  };

  return (
    <main>
      {/* Modal Criar/Editar */}
      <GenericModal
        isOpen={isGenericModalOpen}
        onOpenChange={setIsGenericModalOpen}
        title={isEditing ? "Editar Caixinha" : "Nova Caixinha"}
        description={
          isEditing
            ? "Edite os dados da caixinha selecionada."
            : "Crie uma nova caixinha para alcançar seu objetivo."
        }
        submitLabel={isEditing ? "Editar" : "Criar"}
        onSubmit={isEditing ? handleEdit : handleAdd}
      >
        <FormFields form={form} setForm={setForm} />
      </GenericModal>

      {/* Modal Excluir */}
      <GenericDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onDelete={handleDelete}
        itemName={form?.nome}
      />

      {/* Modal Depósito */}
      <GenericModal
        isOpen={isDepositModalOpen}
        onOpenChange={setIsDepositModalOpen}
        title="Novo Depósito"
        description={
          <span>
            Adicionar depósito na caixinha{" "}
            <span className="font-semibold">{depositTarget?.nome}</span>
          </span>
        }
        submitLabel="Depositar"
        onSubmit={handleDeposit}
      >
        <DepositFields
          depositValue={depositValue}
          setDepositValue={setDepositValue}
        />
      </GenericModal>

      <MainContainer>
        {/* Topo — Info geral + progress */}
        <ContainerDiv>
          <CaixinhasInfo
            totalCaixinhas={caixinhas.length}
            caixinhasAtivas={caixinhasAtivas}
            percentualGeral={percentualGeral}
            openModal={handleOpenAddModal}
          />
        </ContainerDiv>

        {/* Cards das caixinhas */}
        <ContainerDiv className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {caixinhas.map((caixinha) => {
            const percentual = getPercentual(
              caixinha.valorAtual,
              caixinha.valorObjetivo,
            );
            const concluida = percentual >= 100;

            return (
              <Card key={caixinha.id} className="w-full">
                <CardHeader className="flex gap-2 justify-between items-center">
                  <div className="flex items-center-safe justify-center gap-2">
                    <div
                      className={`p-2 rounded-md text-white ${concluida ? "bg-green-600" : "bg-primary"}`}
                    >
                      <TbPigMoney size={20} />
                    </div>
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {caixinha.nome}
                        {!caixinha.ativa && (
                          <Badge variant="secondary" className="text-xs">
                            Inativa
                          </Badge>
                        )}
                        {concluida && (
                          <Badge
                            variant="default"
                            className="text-xs bg-green-600"
                          >
                            Concluída
                          </Badge>
                        )}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {caixinha.contaVinculada}
                      </p>
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
                          onSelect={() => handleOpenEditModal(caixinha)}
                        >
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="cursor-pointer"
                          onSelect={() => handleOpenDeleteModal(caixinha)}
                        >
                          Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>

                <CardContent className="flex flex-col gap-4">
                  {/* Valores */}
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Valor atual
                      </p>
                      <p className="text-lg font-bold text-ring/80">
                        {formatCurrency(caixinha.valorAtual)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Objetivo</p>
                      <p className="text-lg font-semibold">
                        {formatCurrency(caixinha.valorObjetivo)}
                      </p>
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Progresso</span>
                      <span>{percentual.toFixed(1)}%</span>
                    </div>
                    <Progress value={percentual} className="h-2" />
                  </div>

                  {/* Info extra */}
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <div>
                      <p className="text-xs">Prazo</p>
                      <p className="font-medium text-foreground">
                        {formatDate(caixinha.prazo)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs">Depósito/mês</p>
                      <p className="font-medium text-foreground">
                        {formatCurrency(caixinha.depositoMensal)}
                      </p>
                    </div>
                  </div>

                  {/* Botão de depósito */}
                  {!concluida && caixinha.ativa && (
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => handleOpenDepositModal(caixinha)}
                    >
                      <FaPlus className="mr-2" /> Novo depósito
                    </Button>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </ContainerDiv>
      </MainContainer>
    </main>
  );
}
