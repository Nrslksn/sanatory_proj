"use client";
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

import { usePagination } from "@/hooks/use-pagination";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ColumnDef,
  PaginationState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Pencil, Trash } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/password-input"
import { useTranslations } from "next-intl";

export default function SidebarDemo() {
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-neutral-800">
      <div className="flex-1 h-full overflow-y-auto">
        <Dashboard />
      </div>
    </div>
  );
}

type Item = {
  id: string;
  name: string;
  email: string;
  location: string;
  password: string;
};

const Dashboard = () => {
  const t = useTranslations();
  const pageSize = 15;

  const columns: ColumnDef<Item>[] = [
    {
        header: t("Имя пользователя"),
        accessorKey: "name",
        cell: ({ row }) => <div>{row.getValue("name")}</div>,
        size: 250,
    },
    {
        header: t("E-mail"),
        accessorKey: "email",
        cell: ({ row }) => <div>{row.getValue("email")}</div>,
        size: 250,
    },
    {
      header: t("Район"),
      accessorKey: "location",
      cell: ({ row }) => <div>{row.getValue("location")}</div>,
      size: 250,
    },
    {
      header: t("Действия"),
      id: "actions",
      cell: ({ row }) => {
        const item = row.original;
        return (
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleEdit(item)}
              className="flex items-center gap-1"
            >
              <Pencil size={16} />
              {t("change")}
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={() => handleDelete(item.id)}
              className="flex items-center gap-1"
            >
              <Trash size={16} />
              {t("delete")}
            </Button>
          </div>
        );
      },
      size: 180,
    },
  ];

  const [isDialogOpen_, setIsDialogOpen_] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  
  const handleEdit = (item: Item) => {
    setSelectedItem(item); // Сохраняем данные в стейте
    setIsDialogOpen_(true); // Открываем модальное окно
  };
  
  const handleDelete = (id: string) => {
    console.log("Удаление элемента:", id);
    // Тут можно вызвать API для удаления или показать подтверждение
  };
  
  const [inputValue, setInputValue] = useState({
    name: '',
    email: '',
    location: '',
    password: '',
  });

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: pageSize,
  });

  const [sorting, setSorting] = useState<SortingState>([
    {
      id: "name",
      desc: false,
    },
    {
      id: "email",
      desc: false,
    },
    {
      id: "location",
      desc: false,
    },
  ]);

  // const [selectedTotal, setSelectedTotal] = useState(0);
  // const [overallTotal, setOverallTotal] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [data, setData] = useState<Item[]>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    enableSortingRemoval: false,
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: {
      sorting,
      pagination,
    },
  });

  const { pages, showLeftEllipsis, showRightEllipsis } = usePagination({
    currentPage: table.getState().pagination.pageIndex + 1,
    totalPages: table.getPageCount(),
    paginationItemsToDisplay: 15,
  });
  
  useEffect(() => {
    async function fetchPosts() {
      const res = await fetch(
        "https://res.cloudinary.com/dlzlfasou/raw/upload/users-01_fertyx.json",
      );
      const data = await res.json();
      setData(data);
    }
    fetchPosts();
  }, []);

  useEffect(() => {
      if (selectedItem) {
        setInputValue({
          name: selectedItem.name,
          email: selectedItem.email,
          location: selectedItem.location,
          password: selectedItem.password,
        });
      }
    }, [selectedItem]);
  
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setInputValue((prevState) => ({
        ...prevState,
        [name]: name === "balance" ? parseFloat(value) : value,
      }));
    };
  
    const handleSave = (e: React.FormEvent) => {
      e.preventDefault();
      if (selectedItem) {
        // Perform save operation here, possibly with an API call
        console.log('Saved item:', inputValue);
        setIsDialogOpen_(false);
      }
    };

  return (
    <div className="h-full p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-gray-100 dark:bg-neutral-800 flex flex-col gap-4 flex-1 w-full">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">{t("Менеджер")}</h1>
        <div className="flex justify-end items-center rounded-md">
            <Button variant="default" onClick={() => setIsDialogOpen(true)}>{t("Создать")}</Button>
        </div>

        {/* Модальное окно из src/components/ui/dialog.tsx */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t("Создать новую запись")}</DialogTitle>
              <DialogDescription>{t("Введите данные для новой записи")}</DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-3">
                <Label>{t("Имя пользователя")}</Label>
                <Input type="text" />
                <Label>{t("Логин")}</Label>
                <Input type="number" />
                <Label>{t("Пароль")}</Label>
                <PasswordInput/>
                <Label>{t("Район")}</Label>
                <Input type="text" />    
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>{t("Отмена")}</Button>
              <Button variant="default">{t("Создать")}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        
        <div className="overflow-hidden rounded-lg border border-border bg-background">
          
          <Table className="table-fixed">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="hover:bg-transparent">
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead
                        key={header.id}
                        style={{ width: `${header.getSize()}px` }}
                        className="h-11"
                      >
                        {header.isPlaceholder ? null : header.column.getCanSort() ? (
                          <div
                            className={cn(
                              header.column.getCanSort() &&
                                "flex h-full cursor-pointer select-none items-center justify-between gap-2",
                            )}
                            onClick={header.column.getToggleSortingHandler()}
                            onKeyDown={(e) => {
                              // Enhanced keyboard handling for sorting
                              if (
                                header.column.getCanSort() &&
                                (e.key === "Enter" || e.key === " ")
                              ) {
                                e.preventDefault();
                                header.column.getToggleSortingHandler()?.(e);
                              }
                            }}
                            tabIndex={header.column.getCanSort() ? 0 : undefined}
                          >
                            {flexRender(header.column.columnDef.header, header.getContext())}
                            {{
                              asc: (
                                <ChevronUp
                                  className="shrink-0 opacity-60"
                                  size={16}
                                  strokeWidth={2}
                                  aria-hidden="true"
                                />
                              ),
                              desc: (
                                <ChevronDown
                                  className="shrink-0 opacity-60"
                                  size={16}
                                  strokeWidth={2}
                                  aria-hidden="true"
                                />
                              ),
                            }[header.column.getIsSorted() as string] ?? null}
                          </div>
                        ) : (
                          flexRender(header.column.columnDef.header, header.getContext())
                        )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {isDialogOpen_ && selectedItem && (
                <Dialog open={isDialogOpen_} onOpenChange={setIsDialogOpen}>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{t("Редактирование")}</DialogTitle>
                    </DialogHeader>
                    <form>
                      <Label>{t("Имя пользователя")}</Label>
                      <Input value={inputValue.name} type="text" onChange={handleInputChange}/>
                      <Label>{t("Логин")}</Label>
                      <Input value={inputValue.email} type="text" onChange={handleInputChange} />
                      <Label>{t("Пароль")}</Label>
                      <PasswordInput />
                      <Label>{t("Район")}</Label>
                      <Input value={inputValue.location} type="text" onChange={handleInputChange}/>
                      <DialogFooter className="mt-4">
                        <Button type="submit" variant="default" onClick={handleSave}>
                          {t("Сохранить")}
                        </Button>
                        <Button type="button" variant="outline" onClick={() => setIsDialogOpen_(false)}>
                          {t("Отмена")}
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              )}

              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    {t("No results")}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between gap-3 mb-4 max-sm:flex-col">
          {/* Page number information */}
          <p className="flex-1 whitespace-nowrap text-sm text-muted-foreground" aria-live="polite">
            Page <span className="text-foreground">{table.getState().pagination.pageIndex + 1}</span>{" "}
            of <span className="text-foreground">{table.getPageCount()}</span>
          </p>

          {/* Pagination buttons */}
          <div className="grow">
            <Pagination>
              <PaginationContent>
                {/* Previous page button */}
                <PaginationItem>
                  <Button
                    size="icon"
                    variant="outline"
                    className="disabled:pointer-events-none disabled:opacity-50"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                    aria-label="Go to previous page"
                  >
                    <ChevronLeft size={16} strokeWidth={2} aria-hidden="true" />
                  </Button>
                </PaginationItem>

                {/* Left ellipsis (...) */}
                {showLeftEllipsis && (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                )}

                {/* Page number buttons */}
                {pages.map((page) => {
                  const isActive = page === table.getState().pagination.pageIndex + 1;
                  return (
                    <PaginationItem key={page}>
                      <Button
                        size="icon"
                        variant={`${isActive ? "outline" : "ghost"}`}
                        onClick={() => table.setPageIndex(page - 1)}
                        aria-current={isActive ? "page" : undefined}
                      >
                        {page}
                      </Button>
                    </PaginationItem>
                  );
                })}

                {/* Right ellipsis (...) */}
                {showRightEllipsis && (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                )}

                {/* Next page button */}
                <PaginationItem>
                  <Button
                    size="icon"
                    variant="outline"
                    className="disabled:pointer-events-none disabled:opacity-50"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                    aria-label="Go to next page"
                  >
                    <ChevronRight size={16} strokeWidth={2} aria-hidden="true" />
                  </Button>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>

          {/* Results per page */}
          <div className="flex flex-1 justify-end">
            <Select
              value={table.getState().pagination.pageSize.toString()}
              onValueChange={(value) => {
                table.setPageSize(Number(value));
              }}
              aria-label="Results per page"
            >
              <SelectTrigger id="results-per-page" className="w-fit whitespace-nowrap">
                <SelectValue placeholder="Select number of results" />
              </SelectTrigger>
              <SelectContent>
                {[15, 30, 45, 60, 90].map((pageSize) => (
                  <SelectItem key={pageSize} value={pageSize.toString()}>
                    {pageSize} / {t("page")}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
};

