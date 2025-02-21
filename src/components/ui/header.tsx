"use client";

import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { Menu, MoveRight, X, Globe } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export function Header1() {
    const navigationItems = [
        { title: "Главная", href: "/home" },
        { title: "О нас", href: "/about" },
        { title: "Очередность", href: "/queue" },
        { title: "Контакты", href: "/contacts" },
    ];

    const [isOpen, setOpen] = useState(false);
    const pathname = usePathname(); // Текущий путь

    return (
        <header className="w-full fixed top-0 left-0 bg-transparent shadow z-50">
            <div className="container mx-auto flex items-center justify-between py-4 px-6">

                {/* Навигация (Десктоп) */}
                <nav className="hidden lg:flex gap-10">
                    {navigationItems.map((item) => (
                        <Link
                            key={item.title}
                            href={item.href}
                            className="relative text-lg font-medium text-white transition hover:text-primary group"
                        >
                            {item.title}
                            {/* Нижняя граница при активной странице или наведении */}
                            <span
                                className={`absolute left-0 bottom-[-2px] w-full h-[2px] bg-primary transition-all duration-300 scale-0 opacity-0
                                    group-hover:opacity-100 group-hover:scale-100 
                                    ${pathname === item.href ? "opacity-100 scale-100" : ""}`}
                            ></span>
                        </Link>
                    ))}
                </nav>

                {/* Кнопки справа */}
                <div className="hidden lg:flex items-center gap-4">
                    <Button variant="outline">Войти</Button>
                    <Globe className="w-5 h-5 cursor-pointer text-white hover:text-primary transition" />
                </div>

                {/* Мобильное меню */}
                <div className="lg:hidden">
                    <Button variant="ghost" onClick={() => setOpen(!isOpen)}>
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </Button>
                </div>
            </div>

            {/* Выпадающее меню (Мобильная версия) */}
            {isOpen && (
                <div className="absolute top-full left-0 w-full bg-background shadow-lg py-4">
                    <div className="container mx-auto flex flex-col gap-4 px-6">
                        {navigationItems.map((item) => (
                            <Link
                                key={item.title}
                                href={item.href}
                                className={`relative flex items-center justify-between text-lg font-medium py-2 transition 
                                    ${pathname === item.href ? "text-primary font-bold" : "text-gray-700 hover:text-primary"}`}
                                onClick={() => setOpen(false)}
                            >
                                {item.title}
                                <MoveRight className="w-4 h-4 text-muted-foreground" />
                                {/* Нижняя граница (только при наведении) */}
                                <span
                                    className={`absolute left-0 bottom-[-2px] w-full h-[2px] bg-primary transition-all duration-300 scale-0 opacity-0
                                        group-hover:opacity-100 group-hover:scale-100 
                                        ${pathname === item.href ? "opacity-100 scale-100" : ""}`}
                                ></span>
                            </Link>
                        ))}
                        <Button variant="outline" className="w-full mt-2">Войти</Button>
                    </div>
                </div>
            )}
        </header>
    );
}
