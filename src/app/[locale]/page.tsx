// "use client";

// import { useTranslations } from "next-intl";
// import Link from "next/link";

// export default function HomePage() {
//   const t = useTranslations();

//   return (
//     <main className="p-4">
//       <h1 className="text-2xl font-bold">{t("title")}</h1>
//       <p>{t("description")}</p>

//       {/* Кнопки переключения языков */}
//       <div className="mt-4 space-x-2">
//         <Link href="/en" className="px-3 py-1 bg-blue-500 text-white rounded">English</Link>
//         <Link href="/ru" className="px-3 py-1 bg-blue-500 text-white rounded">Русский</Link>
//         <Link href="/kz" className="px-3 py-1 bg-blue-500 text-white rounded">Қазақша</Link>
//       </div>
//     </main>
//   );
// }
import {getTranslations} from 'next-intl/server';
import {Link} from '@/i18n/routing';
import {setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';

type Props = {
  params: {locale: string};
};

export default async function HomePage({params}: Props) {
  const {locale} = params;

  // Убедимся, что locale является допустимым
  if (!['ru', 'kz'].includes(locale)) {
    notFound();
  }

  // Устанавливаем локаль
  setRequestLocale(locale);

  // Получаем переводы для текущей локали
  const t = await getTranslations({locale});

  return (
    <div>
      {/* <h1>{t('title')}</h1>
      <Link href="/about">{t('about')}</Link> */}
    </div>
  );
  }






