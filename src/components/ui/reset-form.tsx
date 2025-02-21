"use client";
import React from "react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { PasswordInput } from "./password-input";
import {Button} from "@/components/ui/button";


export function ResetForm() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");
  };
  return (
    <div className="max-w-md w-full mx-auto rounded-none shadow rounded-2xl p-4 p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-2xl text-center text-neutral-800 dark:text-neutral-200">
        Сброс пароля
      </h2>

      <form className="my-8" onSubmit={handleSubmit}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Новый пароль:</Label>
          <PasswordInput/>
        </LabelInputContainer>
        <LabelInputContainer className="mb-8">
          <Label htmlFor="confirm_password">Подтвердите пароль:</Label>
          <PasswordInput/>
        </LabelInputContainer>

        <Button className="w-full">
          Сохранить
        </Button>
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
