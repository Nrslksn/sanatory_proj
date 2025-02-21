import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash, ChevronLeft, ChevronRight } from "lucide-react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  ColumnDef,
  flexRender
} from "@tanstack/react-table";
import { Pagination, PaginationContent, PaginationItem, PaginationEllipsis } from "@/components/ui/pagination";

type DataTableProps<T extends { id: string }> = {
  columns: ColumnDef<T>[];
  fetchUrl: string;
  onEdit: (item: T) => void;
  onDelete: (id: string) => void;
};

export function DataTable<T extends { id: string }>({ columns, fetchUrl, onEdit, onDelete }: DataTableProps<T>) {
  const pageSize = 15;
  const [data, setData] = useState<T[]>([]);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize });

  useEffect(() => {
    fetch(fetchUrl).then(res => res.json()).then(setData);
  }, [fetchUrl]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: { pagination }
  });

  return (
    <div className="overflow-hidden rounded-lg border bg-background">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <TableHead key={header.id}>{flexRender(header.column.columnDef.header, header.getContext())}</TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map(row => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
                <TableCell>
                  <Button size="sm" variant="outline" onClick={() => onEdit(row.original)}>
                    <Pencil size={16} />
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => onDelete(row.original.id)}>
                    <Trash size={16} />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length + 1} className="text-center">
                Нет данных
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Pagination */}
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <Button size="icon" variant="outline" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
              <ChevronLeft size={16} />
            </Button>
          </PaginationItem>
          <PaginationEllipsis />
          <PaginationItem>
            <Button size="icon" variant="outline" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
              <ChevronRight size={16} />
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
