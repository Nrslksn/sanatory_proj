// import { ReactNode } from "react";
// import { getMessages } from "next-intl/server";
// import LanguageSwitcher from "@/components/LanguageSwitcher";
// import LocaleProvider from "@/components/LocaleProvider";

// interface LayoutProps {
//   children: ReactNode;
//   params: { locale: string };
// }

// export default async function LocaleLayout({ children, params: { locale } }: LayoutProps) {
//   console.log("Рендеринг layout.tsx для локали:", locale); // Лог для проверки
//   const messages = await getMessages({ locale });

//   return (
//     <html lang={locale}>
//       <body>
//         <LanguageSwitcher currentLocale={locale} />
//         <LocaleProvider locale={locale} messages={messages}>
//           {children}
//         </LocaleProvider>
//       </body>
//     </html>
//   );
// }





// // src/app/[locale]/layout.tsx
// import { NextIntlClientProvider } from 'next-intl';
// import { getMessages, setRequestLocale } from 'next-intl/server';
// import { notFound } from 'next/navigation';
// import { routing } from '@/i18n/routing';

// // Генерация параметров для статических страниц
// export function generateStaticParams() {
//   return routing.locales.map((locale) => ({ locale }));
// }

// // Основной компонент для локализации
// export default async function LocaleLayout({
//   children,
//   params: { locale },
// }: {
//   children: React.ReactNode;
//   params: { locale: "kz" | "ru" };
// }) {
//   // Убедитесь, что локаль валидна
//   if (!routing.locales.includes(locale)) {
//     notFound();
//   }

//   // Устанавливаем локаль для запроса
//   setRequestLocale(locale);

//   // Получаем переводы для текущей локали
//   const messages = await getMessages({locale});

//   return (
//     <html lang={locale}>
//       <body>
//         <NextIntlClientProvider messages={messages}>
//           {children}
//         </NextIntlClientProvider>
//       </body>
//     </html>
//   );
// }

import {notFound} from 'next/navigation';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import {ReactNode} from 'react';
import BaseLayout from '@/components/BaseLayout';
import {routing} from '@/i18n/routing';

type Props = {
  children: ReactNode;
  params: {locale: string};
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export async function generateMetadata({
  // params: {locale},
}: Omit<Props, 'children'>) {
  // Подождите, пока params загрузятся, перед использованием
  // const t = await getTranslations({locale});

  // return {
  //   title: t('title'),
  // };
}

export default async function LocaleLayout({
  children,
  params,
}: Props) {
  // Ожидайте получения параметров из асинхронного контекста
  const {locale} = await params;

  // Убедитесь, что входящий `locale` является валидным
  if (!routing.locales.includes(locale as "kz" | "ru")) {
    notFound();
  }

  // Включаем статическую рендеринг для текущего языка
  setRequestLocale(locale);

  return <BaseLayout locale={locale}>{children}</BaseLayout>;
}
