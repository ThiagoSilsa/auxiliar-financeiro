"use client";

import {
  ContainerDiv,
  MainContainer,
} from "@/components/created/main-container/main-container";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import {
  FaPlus,
  FaArrowDown,
  FaArrowUp,
  FaFilter,
  FaChartLine,
} from "react-icons/fa";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Transacao {
  id: string;
  tipo: "entrada" | "saida";
  descricao: string;
  categoria: string;
  valor: number;
  data: string;
  conta: string;
}

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

// Dados mocados para exemplo
const TRANSACOES_INICIAIS: Transacao[] = [
  {
    id: "1",
    tipo: "saida",
    descricao: "Pagamento de Conta de Luz",
    categoria: "Moradia",
    valor: 150.0,
    data: "12/12/2025",
    conta: "Nubank",
  },
  {
    id: "2",
    tipo: "saida",
    descricao: "Supermercado",
    categoria: "Alimentação",
    valor: 250.0,
    data: "11/12/2025",
    conta: "Nubank",
  },
  {
    id: "3",
    tipo: "entrada",
    descricao: "Salário",
    categoria: "Investimento",
    valor: 5000.0,
    data: "10/12/2025",
    conta: "Banco do Brasil",
  },
  {
    id: "4",
    tipo: "saida",
    descricao: "Uber",
    categoria: "Transporte",
    valor: 45.0,
    data: "09/12/2025",
    conta: "Nubank",
  },
  {
    id: "5",
    tipo: "saida",
    descricao: "Consulta Médica",
    categoria: "Saúde",
    valor: 200.0,
    data: "08/12/2025",
    conta: "Itaú",
  },
  
];

export default function ExtratoPage() {
  const [transacoes, setTransacoes] =
    useState<Transacao[]>(TRANSACOES_INICIAIS);
  const [searchTerm, setSearchTerm] = useState("");
  const [filtroTipo, setFiltroTipo] = useState<string>("todos");
  const [filtroCategoria, setFiltroCategoria] = useState<string>("todos");
  const [novaTransacao, setNovaTransacao] = useState({
    tipo: "entrada" as "entrada" | "saida",
    descricao: "",
    categoria: "",
    valor: "",
    data: "",
    conta: "",
  });
  const [sheetOpen, setSheetOpen] = useState(false);

  // Adiciona nova transação ao estado
  const handleAdicionarTransacao = () => {
    if (
      novaTransacao.descricao &&
      novaTransacao.categoria &&
      novaTransacao.valor &&
      novaTransacao.data &&
      novaTransacao.conta
    ) {
      const transacao: Transacao = {
        id: Date.now().toString(),
        tipo: novaTransacao.tipo,
        descricao: novaTransacao.descricao,
        categoria: novaTransacao.categoria,
        valor: parseFloat(novaTransacao.valor),
        data: novaTransacao.data,
        conta: novaTransacao.conta,
      };
      setTransacoes([transacao, ...transacoes]);
      setNovaTransacao({
        tipo: "entrada",
        descricao: "",
        categoria: "",
        valor: "",
        data: "",
        conta: "",
      });
      setSheetOpen(false);
    }
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

  return (
    <main>
      <MainContainer>
        <ContainerDiv>
          <Card className="flex-row w-full items-center justify-between">
            <CardHeader className="w-1/2">
              <CardTitle className="text-2xl font-bold">Extrato</CardTitle>
              <CardDescription className="text-md text-black/60 dark:text-white/60">
                Aqui está o seu extrato recente.
              </CardDescription>
            </CardHeader>
            <CardAction className="pr-6">
              <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                <SheetTrigger asChild>
                  <Button>
                    <FaPlus /> Nova transação
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Adicionar Transação</SheetTitle>
                    <SheetDescription>
                      Preencha os dados da nova transação.
                    </SheetDescription>
                  </SheetHeader>
                  <div className="space-y-4 py-4 px-3">
                    <div>
                      <label className="text-sm font-medium">Tipo</label>
                      <Select
                        value={novaTransacao.tipo}
                        onValueChange={(value) =>
                          setNovaTransacao({
                            ...novaTransacao,
                            tipo: value as "entrada" | "saida",
                          })
                        }
                      >
                        <SelectTrigger className="w-full mt-1">
                          <SelectValue placeholder="Selecione um tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="entrada">Entrada</SelectItem>
                            <SelectItem value="saida">Saída</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium">Descrição</label>
                      <Input
                        placeholder="Ex: Salário, Supermercado..."
                        value={novaTransacao.descricao}
                        onChange={(e) =>
                          setNovaTransacao({
                            ...novaTransacao,
                            descricao: e.target.value,
                          })
                        }
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium">Categoria</label>
                      <Select
                        value={novaTransacao.categoria}
                        onValueChange={(value) =>
                          setNovaTransacao({
                            ...novaTransacao,
                            categoria: value,
                          })
                        }
                      >
                        <SelectTrigger className="w-full mt-1">
                          <SelectValue placeholder="Selecione uma categoria" />
                        </SelectTrigger>
                        <SelectContent>
                          {CATEGORIAS.map((cat) => (
                            <SelectItem key={cat} value={cat}>
                              {cat}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium">Valor</label>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="0,00"
                        value={novaTransacao.valor}
                        onChange={(e) =>
                          setNovaTransacao({
                            ...novaTransacao,
                            valor: e.target.value,
                          })
                        }
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium">Conta</label>
                      <Select
                        value={novaTransacao.conta}
                        onValueChange={(value) =>
                          setNovaTransacao({
                            ...novaTransacao,
                            conta: value,
                          })
                        }
                      >
                        <SelectTrigger className="w-full mt-1">
                          <SelectValue placeholder="Selecione uma conta" />
                        </SelectTrigger>
                        <SelectContent>
                          {CONTAS.map((conta) => (
                            <SelectItem key={conta} value={conta}>
                              {conta}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium">Data</label>
                      <Input
                        type="date"
                        value={novaTransacao.data}
                        onChange={(e) =>
                          setNovaTransacao({
                            ...novaTransacao,
                            data: e.target.value,
                          })
                        }
                        className="mt-1"
                      />
                    </div>

                    <Button
                      onClick={handleAdicionarTransacao}
                      className="w-full mt-6"
                    >
                      Adicionar Transação
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </CardAction>
          </Card>
        </ContainerDiv>

        <ContainerDiv>
          <div className="w-full space-y-4">
            <div className="flex gap-4 flex-col md:flex-row">
              <Input
                placeholder="Buscar transações..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1"
              />
              <Select value={filtroTipo} onValueChange={setFiltroTipo}>
                <SelectTrigger className="w-full md:w-48">
                  <FaFilter className="mr-2 size-4" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="entrada">Entradas</SelectItem>
                  <SelectItem value="saida">Saídas</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={filtroCategoria}
                onValueChange={setFiltroCategoria}
              >
                <SelectTrigger className="w-full md:w-48">
                  <FaFilter className="mr-2 size-4" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todas as Categorias</SelectItem>
                  {CATEGORIAS.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </ContainerDiv>

        <ContainerDiv>
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Transações</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 font-medium">Tipo</th>
                      <th className="text-left py-3 px-4 font-medium">
                        Descrição
                      </th>
                      <th className="text-left py-3 px-4 font-medium">
                        Categoria
                      </th>
                      <th className="text-right py-3 px-4 font-medium">
                        Valor
                      </th>
                      <th className="text-left py-3 px-4 font-medium">Data</th>
                      <th className="text-left py-3 px-4 font-medium">Conta</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transacoesFiltradas.length > 0 ? (
                      transacoesFiltradas.map((transacao) => (
                        <tr
                          key={transacao.id}
                          className="border-b border-border hover:bg-muted/50 transition-colors"
                        >
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              {transacao.tipo === "entrada" ? (
                                <FaArrowUp className="size-4 text-green-600" />
                              ) : (
                                <FaArrowDown className="size-4 text-red-600" />
                              )}
                              <span className="capitalize">
                                {transacao.tipo}
                              </span>
                            </div>
                          </td>
                          <td className="py-3 px-4">{transacao.descricao}</td>
                          <td className="py-3 px-4">
                            <Badge variant="outline">
                              {transacao.categoria}
                            </Badge>
                          </td>
                          <td
                            className={`py-3 px-4 text-right font-medium ${
                              transacao.tipo === "entrada"
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {transacao.tipo === "entrada" ? "+" : "-"} R${" "}
                            {transacao.valor.toFixed(2)}
                          </td>
                          <td className="py-3 px-4">{transacao.data}</td>
                          <td className="py-3 px-4 text-sm">
                            {transacao.conta}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={6}
                          className="py-8 text-center text-muted-foreground"
                        >
                          Nenhuma transação encontrada
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
         
        </ContainerDiv>
      </MainContainer>
    </main>
  );
}
