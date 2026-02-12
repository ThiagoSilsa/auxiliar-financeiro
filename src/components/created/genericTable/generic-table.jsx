// Tanstack Table: https://tanstack.com/table/v8/docs/guide/introduction

// Components
import { Button } from "@/components/ui/button";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
  getSortedRowModel,
} from "@tanstack/react-table";

// React
import { useState } from "react";

import isEven from "@/lib/isEven";
import {
  Select,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export default function GenericTable({ data, columns, pageSize = 10 }) {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: pageSize,
  });

  const sortStatusFn = (rowA, rowB, _columnId) => {
    const statusA = rowA.original.status;
    const statusB = rowB.original.status;
    const statusOrder = ["single", "complicated", "relationship"];
    return statusOrder.indexOf(statusA) - statusOrder.indexOf(statusB);
  };

  const [sorting, setSorting] = useState([]);

  const table = useReactTable({
    data: data,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(), //client-side sorting
    sortingFns: {
      sortStatusFn, //or provide our custom sorting function globally for all columns to be able to use
    },
    state: {
      pagination,
      sorting,
    },
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    enableMultiSort: true,
    maxMultiSortColCount: 3,
  });

  return (
    <div>
      <table className="w-full text-sm rounded-md overflow-hidden mb-3">
        <thead className="">
          {table.getHeaderGroups().map((hg) => (
            <tr key={hg.id} className="bg-chart-5/80 font-medium text-white">
              {hg.headers.map((header) => (
                <th
                  key={header.id}
                  colSpan={header.colSpan}
                  className="text-left py-3 px-3"
                >
                  {header.isPlaceholder ? null : (
                    <div
                      className={
                        header.column.getCanSort()
                          ? "cursor-pointer select-none"
                          : ""
                      }
                      onClick={header.column.getToggleSortingHandler()}
                      title={
                        header.column.getCanSort()
                          ? header.column.getNextSortingOrder() === "asc"
                            ? "Sort ascending"
                            : header.column.getNextSortingOrder() === "desc"
                              ? "Sort descending"
                              : "Clear sort"
                          : undefined
                      }
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                      {{
                        asc: " 🔼",
                        desc: " 🔽",
                      }[header.column.getIsSorted()] ?? null}
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className={`
                  py-3 px-3
                  ${!isEven(cell.row.index) ? "bg-muted/20" : ""}
                `}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Paginação */}
      <div className="w-full flex justify-between">
        <div>
          <Select
            value={table.getState().pagination.pageSize}
            onValueChange={(e) => {
              table.setPageSize(e);
            }}
          >
            <SelectTrigger>
              <SelectValue
                placeholder={`Mostrar ${table.getState().pagination.pageSize}`}
              />
            </SelectTrigger>
            <SelectContent>
              {[5, 10, 20, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={pageSize}>
                  Mostrar {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {/* Botões */}
        <div className="flex gap-1">
          <Button
            variant={"ghost"}
            size={"xs"}
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            {"<<"}
          </Button>
          <Button
            variant={"ghost"}
            size={"xs"}
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {"<"}
          </Button>
          <div>
            Página {table.getState().pagination.pageIndex + 1} de{" "}
            {table.getPageCount()}
          </div>
          <Button
            variant={"ghost"}
            size={"xs"}
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {">"}
          </Button>
          <Button
            variant={"ghost"}
            size={"xs"}
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            {">>"}
          </Button>
        </div>
        {/* Select */}
      </div>
    </div>
  );
}
