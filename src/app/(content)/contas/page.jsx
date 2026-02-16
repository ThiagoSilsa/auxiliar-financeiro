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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ContasInfo from "./components/contas-info";
import { Button } from "@/components/ui/button";

// Mock
import CONTAS_INICIAIS from "./Mock/data.json";

// lib
import { formatCurrency } from "@/lib/format";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function ContasPage() {
  const [contas, setContas] = useState(CONTAS_INICIAIS?.data || []);
  const [searchTerm, setSearchTerm] = useState("");
  const [filtroTipo, setFiltroTipo] = useState("todos");
  const [novaConta, setNovaConta] = useState({
    nome: "",
    tipo: "digital",
    valor: "",
  });
  const [sheetOpen, setSheetOpen] = useState(false);
  const [editandoId, setEditandoId] = useState(null);

  // Total de todas as contas
  const totalContas = useMemo(
    () => contas.reduce((acc, conta) => acc + conta.valor, 0),
    [contas],
  );

  // Adicionar ou editar conta
  const handleAdicionarConta = () => {
    if (novaConta.nome && novaConta.tipo && novaConta.valor) {
      if (editandoId) {
        // Editar conta existente
        setContas(
          contas.map((conta) =>
            conta.id === editandoId
              ? {
                  ...conta,
                  nome: novaConta.nome,
                  tipo: novaConta.tipo,
                  valor: parseFloat(novaConta.valor),
                }
              : conta,
          ),
        );
        setEditandoId(null);
      } else {
        // Adicionar nova conta
        const conta = {
          id: Date.now().toString(),
          nome: novaConta.nome,
          tipo: novaConta.tipo,
          valor: parseFloat(novaConta.valor),
        };
        setContas([conta, ...contas]);
      }
      setNovaConta({ nome: "", tipo: "digital", valor: "" });
      setSheetOpen(false);
    }
  };

  // Editar conta — preenche o formulário e abre o sheet
  const handleEditar = (conta) => {
    setEditandoId(conta.id);
    setNovaConta({
      nome: conta.nome,
      tipo: conta.tipo,
      valor: conta.valor.toString(),
    });
    setSheetOpen(true);
  };

  // Excluir conta
  const handleExcluir = (id) => {
    setContas(contas.filter((conta) => conta.id !== id));
  };

  // Ao fechar o sheet, limpar estado de edição
  const handleSheetChange = (open) => {
    setSheetOpen(open);
    if (!open) {
      setEditandoId(null);
      setNovaConta({ nome: "", tipo: "digital", valor: "" });
    }
  };

  return (
    <main>
      <MainContainer>
        <ContainerDiv>
          <ContasInfo
            totalContas={totalContas}
            sheetOpen={sheetOpen}
            setSheetOpen={handleSheetChange}
            novaConta={novaConta}
            setNovaConta={setNovaConta}
            handleAdicionarConta={handleAdicionarConta}
            editando={!!editandoId}
          />
        </ContainerDiv>

        <ContainerDiv>
          {contas.map((conta) => (
            <Card key={conta.id} className="mb-4 sm:w-100 w-full">
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
                        onSelect={() => handleEditar(conta)}
                      >
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="cursor-pointer"
                        onSelect={() => handleExcluir(conta.id)}
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
                    {formatCurrency(conta.valor)}
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
