"use client";
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import { CircleAlert } from "lucide-react";


export function RecoveryForm() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");
  };
  return (
    <div className="max-w-md w-full mx-auto rounded-none shadow rounded-2xl p-4 p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-2xl text-center text-neutral-800 dark:text-neutral-200">
        Восстановление пароля
      </h2>

      <form className="my-8" onSubmit={handleSubmit}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">E-mail:</Label>
          <Input id="email" type="email" className="shadow"/>
        </LabelInputContainer>

        <p className="flex gap-2 w-full leading-tight">
          <CircleAlert className="w-12"/>
          Инструкция по восстановлению пароля отправлена на вашу почту. Проверьте вашу почту и следуйте инструкциям.
        </p>

        <p className="flex gap-2 w-full leading-tight">
          <CircleAlert className="w-12"/>
          Пользователь с таким email не найден. Попробуйте еще раз.
        </p>


        <Button className="w-full mt-3">
          Отправить
        </Button>
        <div className="text-center mt-3">
          <Link href="/login" className="text-primary">Вернуться к входу</Link>
        </div>
      </form>
    </div>
  );
}

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
