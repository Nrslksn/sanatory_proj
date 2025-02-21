"use client";

import { useState, useEffect } from "react";
import { NextIntlClientProvider } from "next-intl";

interface ClientMessagesProviderProps {
  locale: string;
  children: React.ReactNode;
}

export default function ClientMessagesProvider({ locale, children }: ClientMessagesProviderProps) {
  const [messages, setMessages] = useState<{ [key: string]: string } | null>(null);

  useEffect(() => {
    async function fetchMessages() {
      const response = await fetch(`/locales/${locale}.json`); // Файл с переводами
      const data = await response.json();
      setMessages(data);
    }

    fetchMessages();
  }, [locale]);

  if (!messages) {
    return <div>Загрузка переводов...</div>; // Можно сделать красивый лоадер
  }

  return <NextIntlClientProvider locale={locale} messages={messages}>{children}</NextIntlClientProvider>;
}
