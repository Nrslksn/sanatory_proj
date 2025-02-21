"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { User, Building, Phone, Home, BadgePercent, Paperclip } from "lucide-react";

export default function ApplicationForm() {
  const { register, handleSubmit, setValue } = useForm();

  const onSubmit = (data: any) => {
    console.log("Форма отправлена:", data);
  };

  return (
    <div className="mx-20 p-8">
      <h2 className="text-2xl font-bold mb-6">Заполните заявку</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="bg-green-900 p-6 rounded-lg shadow-lg space-y-4">

        {/* ФИО */}
        <div className="grid gap-2">
          <Label htmlFor="fullName">ФИО заявителя</Label>
          <Input id="fullName" placeholder="Введите ФИО" {...register("fullName", { required: true })} />
        </div>

        {/* Выбор отдела */}
        <div className="grid gap-2">
          <Label htmlFor="department">Отдел</Label>
          <Select onValueChange={(value) => setValue("department", value)}>
            <SelectTrigger>
              <SelectValue id="department" placeholder="Выберите отдел" />
            </SelectTrigger>
            <SelectContent>
            <SelectItem value="option1">Отдел занятости и социальных программ города Семей</SelectItem>
            <SelectItem value="option2">Отдел занятости и социальных программ города Курчатов</SelectItem>
            <SelectItem value="option3">Отдел занятости и социальных программ Абайского района</SelectItem>
            <SelectItem value="option4">Отдел занятости и социальных программ района Ақсуат</SelectItem>
            <SelectItem value="option5">Отдел занятости и социальных программ Аягозского района</SelectItem>
            <SelectItem value="option6">Отдел занятости и социальных программ Бескарагайского района</SelectItem>
            <SelectItem value="option7">Отдел занятости и социальных программ Бородулихинского района</SelectItem>
            <SelectItem value="option8">Отдел занятости и социальных программ Жарминского района</SelectItem>
            <SelectItem value="option9">Отдел занятости и социальных программ Кокпектинского района</SelectItem>
            <SelectItem value="option10">Отдел занятости и социальных программ района Мақаншы</SelectItem>
            <SelectItem value="option11">Отдел занятости и социальных программ Урджарского района</SelectItem>
            <SelectItem value="option12">Отдел занятости и социальных программ района Жаңасемей</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Номер телефона */}
        <div className="grid gap-2">
          <Label htmlFor="phone">Номер телефона</Label>
          <Input id="phone" type="tel" placeholder="+7 (XXX) XXX-XX-XX" {...register("phone", { required: true })} />
        </div>

        {/* Адрес проживания */}
        <div className="grid gap-2">
          <Label htmlFor="address">Адрес проживания</Label>
          <Input id="address" placeholder="Введите адрес" {...register("address", { required: true })} />
        </div>

        {/* Выбор статуса */}
        <div className="grid gap-2">
          <Label htmlFor="status">Статус</Label>
          <Select onValueChange={(value) => setValue("status", value)}>
            <SelectTrigger>
              <SelectValue id="status" placeholder="Выберите статус" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="op1">Пенсионер</SelectItem>
              <SelectItem value="op2">Ветераны ВОВ</SelectItem>
              <SelectItem value="op3">Труженики тыла</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Загрузка файла */}
        <div className="grid gap-2">
          <Label htmlFor="file">Прикрепить файл</Label>
          <Input id="file" type="file" {...register("file")} />
        </div>

        {/* Кнопка отправки */}
        <Button type="submit" className="w-full">
          Отправить
        </Button>
      </form>
    </div>
  );
}
