import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { formatCurrency, formatDate } from "@/lib/format";
export const getExtratoColumns = () => [
  {
    accessorKey: "tipo",
    header: "Tipo",
    enableSorting: true,
    size: 50,
    cell: ({ row }) =>
      row.original.tipo === "entrada" ? (
        <div className="flex items-center gap-1 text-ring/80 font-bold">
          <FaArrowUp />
          <p>Entrada</p>
        </div>
      ) : (
        <div className="flex items-center gap-1 text-destructive/80 font-bold">
          <FaArrowDown />
          <p>Saída</p>
        </div>
      ),
  },

  { accessorKey: "descricao", header: "Descrição", size: 250 },
  { accessorKey: "categoria", header: "Categoria", size: 75 },

  {
    accessorKey: "data",
    header: "Data",
    sortDescFirst: true,
    size: 75,
    cell: ({ row }) => formatDate(row.original.data),
  },
  { accessorKey: "conta", header: "Conta", size: 75 },
  {
    accessorKey: "valor",
    header: "Valor",
    size: 75,
    cell: ({ row }) => (
      <span
        className={` flex items-center font-bold
          ${
            row.original.tipo === "entrada"
              ? "text-ring/80 "
              : "text-destructive/80 "
          }
        `}
      >
        {row.original.tipo === "entrada" ? (
          <p className="w-2">+</p>
        ) : (
          <p className="w-2">-</p>
        )}
        {formatCurrency(row.original.valor)}
      </span>
    ),
  },
];
