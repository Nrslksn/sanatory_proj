"use client";
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { PasswordInput } from "./password-input";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function LoginForm() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Login form submitted");
  };

  return (
    <div className="max-w-md w-full mx-auto rounded-none shadow rounded-2xl p-4 p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-2xl text-center text-neutral-800 dark:text-neutral-200">
        Вход в аккаунт
      </h2>

      <form className="my-8" onSubmit={handleSubmit}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="iin">ИИН:</Label>
          <Input id="iin" type="text" className="shadow" />
        </LabelInputContainer>

        <LabelInputContainer className="mb-6">
          <Label htmlFor="password">Пароль:</Label>
          <PasswordInput />
          <Link href="/recovery" className="text-primary">Забыли пароль?</Link>
        </LabelInputContainer>

        <Button className="w-full">Войти</Button>

        <div className="text-center mt-3">
          <p>
            Нет аккаунта?{" "}
            <Link href="/signup" className="font-bold text-primary">
              Зарегистрироваться
            </Link>
          </p>
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
