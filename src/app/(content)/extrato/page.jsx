"use client";

// Components
import {
  ContainerDiv,
  MainContainer,
} from "@/components/created/main-container/main-container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ExtratoFilter from "./components/extrato-filter";
import { Badge } from "@/components/ui/badge";

import { useState } from "react";

import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import ExtratoInfo from "./components/extrato-info";

import GenericTable from "@/components/created/genericTable/generic-table";

import TRANSACOES_INICIAIS from "./Mock/data.json";

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

export default function ExtratoPage() {
  const [transacoes, setTransacoes] = useState(TRANSACOES_INICIAIS?.data || []);
  const [searchTerm, setSearchTerm] = useState("");
  const [filtroTipo, setFiltroTipo] = useState("todos");
  const [filtroCategoria, setFiltroCategoria] = useState("todos");
  const [novaTransacao, setNovaTransacao] = useState({
    tipo: "entrada",
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
      const transacao = {
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

  const columns = [
    { accessorKey: "tipo", header: "Tipo", enableSorting: false, size: 50 },
    { accessorKey: "descricao", header: "Descrição", size: 300 },
    { accessorKey: "categoria", header: "Categoria", size: 75 },
    { accessorKey: "valor", header: "Valor", size: 75 },
    { accessorKey: "data", header: "Data", sortDescFirst: true, size: 75 },
    { accessorKey: "conta", header: "Conta", size: 75 },
  ];
  return (
    <main>
      <MainContainer>
        <ContainerDiv>
          <ExtratoInfo
            CATEGORIAS={CATEGORIAS}
            CONTAS={CONTAS}
            sheetOpen={sheetOpen}
            setSheetOpen={setSheetOpen}
            novaTransacao={novaTransacao}
            setNovaTransacao={setNovaTransacao}
            handleAdicionarTransacao={handleAdicionarTransacao}
          />
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
              />
            </CardContent>
          </Card>
        </ContainerDiv>
       
      </MainContainer>
    </main>
  );
}
