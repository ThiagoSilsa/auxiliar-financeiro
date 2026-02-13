import { Badge } from "@/components/ui/badge";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";

export const getExtratoColumns = () => [
  {
    accessorKey: "tipo",
    header: "Tipo",
    enableSorting: false,
    size: 50,
    cell: ({ row }) => (
      <Badge
        variant={row.original.tipo === "entrada" ? "success" : "destructive"}
      >
        {row.original.tipo === "entrada" ? <FaArrowDown /> : <FaArrowUp />}
      </Badge>
    ),
  },
  { accessorKey: "descricao", header: "Descrição", size: 300 },
  { accessorKey: "categoria", header: "Categoria", size: 75 },
  { accessorKey: "valor", header: "Valor", size: 75 },
  { accessorKey: "data", header: "Data", sortDescFirst: true, size: 75 },
  { accessorKey: "conta", header: "Conta", size: 75 },
];
