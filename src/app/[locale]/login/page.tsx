"use client";
import React from "react";
import { LoginForm } from "@/components/ui/login-form";

export default function Signup() {
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-neutral-800">
      <div className="flex-1 h-full flex items-center justify-center">
        <LoginForm />
      </div>
    </div>
  );
}