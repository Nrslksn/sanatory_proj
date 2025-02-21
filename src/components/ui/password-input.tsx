"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";

function PasswordInput() {
  const [value, setValue] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full space-y-2">
      <div className="relative">
        <Input
          id="input-06"
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className={cn(
            "w-full px-3 py-2 pr-10",
            "rounded-md border shadow",
            "bg-white dark:bg-black/5",
            "border-zinc-200 dark:border-zinc-800",
            "focus:outline-none focus:ring-2",
            "focus:ring-zinc-900/20 dark:focus:ring-zinc-100/20"
          )}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          aria-label={showPassword ? "Hide password" : "Show password"}
          className="absolute right-3 top-1/2 -translate-y-1/2
          text-zinc-400 hover:text-zinc-900 
          dark:text-zinc-500 dark:hover:text-zinc-100
          transition-colors"
        >
          {showPassword ? (
            <EyeOff className="w-4 h-4" />
          ) : (
            <Eye className="w-4 h-4" />
          )}
        </button>
      </div>
    </div>
  );
}

export { PasswordInput };
