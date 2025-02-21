"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/DataTable";
import { EditDialog } from "@/components/EditDialog";
import { ColumnDef } from "@tanstack/react-table";
import { useTranslations } from "next-intl";

type User = { id: string; name: string; email: string; location: string; };
type Benefit = { id: string; name: string; priority: string; };

export default function Page() {
  const t = useTranslations();
  const [selectedItem, setSelectedItem] = useState<User | Benefit | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleEdit = (item: User | Benefit) => { setSelectedItem(item); setIsDialogOpen(true); };
  const handleDelete = (id: string) => { console.log("Удаление элемента:", id); };
  const handleSave = (data: User | Benefit) => { console.log("Сохранено:", data); setIsDialogOpen(false); };

  const columnsUser: ColumnDef<User>[] = [
    { header: t("Имя пользователя"), accessorKey: "name", cell: ({ row }) => <div>{row.getValue("name")}</div> },
    { header: t("E-mail"), accessorKey: "email", cell: ({ row }) => <div>{row.getValue("email")}</div> },
    { header: t("Район"), accessorKey: "location", cell: ({ row }) => <div>{row.getValue("location")}</div> }
  ];

  // const columnsBenefit: ColumnDef<Benefit>[] = [
  //   { header: t("Название"), accessorKey: "name", cell: ({ row }) => <div>{row.getValue("name")}</div> },
  //   { header: t("Приоритет"), accessorKey: "priority", cell: ({ row }) => <div>{row.getValue("priority")}</div> }
  // ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{t("Менеджер")}</h1>
      <Button onClick={() => setIsDialogOpen(true)}>Создать</Button>
      <DataTable columns={columnsUser} fetchUrl="/api/users" onEdit={handleEdit} onDelete={handleDelete} />
      <EditDialog isOpen={isDialogOpen} item={selectedItem} onClose={() => setIsDialogOpen(false)} onSave={handleSave} fields={[
        { key: "name", label: t("Имя") },
        { key: "email", label: t("E-mail") },
        { key: "location", label: t("Район") }
      ]} />
    </div>
  );
}