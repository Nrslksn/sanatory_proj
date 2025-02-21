"use client";
import React, { useState,useMemo, useEffect } from "react";
import { cn } from "@/lib/utils";

import { usePagination } from "@/hooks/use-pagination";
// import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { Card } from "@/components/ui/card";
import {Carousel, CarouselContent,CarouselItem,CarouselNext,CarouselPrevious} from "@/components/ui/carousel"

// HeaderDemo.jsx
// HeaderDemo.jsx
// HeaderDemo.jsx
// HeaderDemo.jsx
import { Header1 } from "@/components/ui/header";
import { Button } from "@/components/ui/button";
import QueueTable from "@/components/QueueTable";
import ApplicationForm from "@/components/ApplicationForm";

export default function HeaderDemo() {
  return (
    <div className="relative min-h-screen bg-gray-100 dark:bg-neutral-800">
      {/* Блок с фоновым изображением */}
      <div className="relative w-full h-[600px] bg-cover bg-center" style={{ backgroundImage: 'url("/home.png")' }}>
        {/* Черный прозрачный слой */}
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>

        {/* Текст поверх изображения */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6">
          <h1 className="text-4xl font-bold max-w-4xl">
            Санаторно-курортное лечение в «KARAGAILY» для отдельных категорий граждан области Абай
          </h1>
          <Button className="mt-4 text-lg">Подать заявку</Button>
        </div>
      </div>

      {/* Контент после хедера */}
      <div className="relative z-10">
          <Header1 />

          <Card className="max-w-full mx-20 bg-white shadow-lg rounded-2xl border mt-14">
            {/* Блок 60/40 */}
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Текстовая часть (60%) */}
              <div className="lg:w-3/5 p-14">
                <h2 className="text-3xl font-bold text-gray-900">Санаторий Карагайлы</h2>
                <p className="mt-4 text-lg text-gray-700 leading-relaxed">
                  Санаторий Карагайлы – это опытные и высококвалифицированные врачи, которые будут заботиться о Вашем здоровье. 
                  Санаторий расположен в черте города, в красивом сосновом бору, где у Вас будет возможность отдохнуть на свежем воздухе.
                  Организация санаторно-курортного лечения для отдельных категорий граждан области Абай осуществляется в рамках обязательств, 
                  принятых по проекту государственно-частного партнерства «Организация санаторно-курортного лечения на базе Семейского 
                  медико-социального учреждения «KARAGAILY» решением маслихата области Абай от 21 сентября 2022 года № 7/37 – VII.
                  В период с 2022 по 2027 год планируется обеспечить санаторно-курортным лечением 5 022 человека.
                </p>
              </div>

              {/* Изображение (40%) */}
              <div className="lg:w-2/5 -mr-2">
                <img 
                  src="/grandmothers.png" 
                  alt="Санаторий Карагайлы" 
                  className="w-full h-full object-cover rounded-tr-xl rounded-br-xl"
                />
              </div>
            </div>
          </Card>

          <div className="max-w-5xl mx-auto rounded-xl">
            <div className="w-full py-20 py-40">
              <div className="container">
              {/* <div className="grid grid-cols-1 lg:grid-cols-2 justify-end items-end  gap-10"> */}
                <div className="w-full max-w-full px-20">
                  <Carousel>
                    <CarouselContent>
                      {Array.from({ length: 5 }).map((_, index) => (
                        <CarouselItem key={index}>
                          <div className="flex rounded-md aspect-video bg-gray-300 items-center justify-center p-6 border">
                            <span className="text-sm">
                              {/* Platform Screenshot {index + 1} */}
                            </span>
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                  </Carousel>
                </div>
              </div>
            </div>
          </div>
          {/* Линия с белой тенью */}
        </div>
        <QueueTable/>
        <ApplicationForm/>
      </div>
  );
}
