"use client";

import Sidebar_ from "@/components/Sidebar_";
import { ReactNode, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Loader2 } from "lucide-react";
import NextTopLoader from "nextjs-toploader";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 500); // Искусственная задержка для плавности
    return () => clearTimeout(timeout); // Чистка таймера при размонтировании
  }, [pathname]);

  return (
    <>
      {/* Линия загрузки сверху */}
      <NextTopLoader color="#3498db" height={3} showSpinner={false} />

      {/* Спиннер на весь экран */}
      {loading && (
        <div className="fixed inset-0 flex justify-center items-center bg-black/50 z-50 transition-opacity duration-300">
          <Loader2 className="w-12 h-12 animate-spin text-white" />
        </div>
      )}

      <div className="flex h-screen bg-gray-100 dark:bg-neutral-800">
        <Sidebar_ />
        <main className="flex-1">{children}</main>
      </div>
    </>
  );
}