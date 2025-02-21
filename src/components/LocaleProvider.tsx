"use client";

import {NextIntlClientProvider} from 'next-intl';
import {ReactNode} from 'react';

interface Messages {
  [key: string]: string | Messages; // ✅ Разрешает вложенные объекты
}

interface LocaleProviderProps {
  locale: string;
  messages: Messages; // ✅ Разрешает вложенные объекты в messages
  children: ReactNode;
}


export default function LocaleProvider({ locale, messages, children }: LocaleProviderProps) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
