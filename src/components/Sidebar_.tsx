// "use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { LayoutDashboard, UserCog, Settings } from "lucide-react";
import {Logo,LogoIcon} from "@/components/Logo"
import { useTranslations } from "next-intl";

export default function Sidebar_() {
  const t = useTranslations();
    // Sidebar -----------
  const links = [
    { label: t("Квоты"), href: "/admin/quotas", icon: <LayoutDashboard className="text-neutral-700 dark:text-neutral-200 flex-shrink-0" /> },
    { label: t("Менеджер"), href: "/admin/manager", icon: <UserCog className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" /> },
    { label: t("Управление льготами"), href: "/admin/benefits", icon: <Settings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" /> },
  ];
  const [open, setOpen] = useState(false);

  return (
    <div>
      {/* Фиксированный сайдбар */}
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
        </SidebarBody>
      </Sidebar>
    </div>
  );
}