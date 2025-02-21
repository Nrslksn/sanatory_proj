// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";

// const languages = [
//   { code: "ru", label: "🇷🇺 Русский" },
//   { code: "kz", label: "🇰🇿 Қазақша" }
// ];

// interface LanguageSwitcherProps {
//   currentLocale: string;
// }

// export default function LanguageSwitcher({ currentLocale }: LanguageSwitcherProps) {
//   const pathname = usePathname(); // Получаем текущий путь

//   // Разбираем путь и заменяем локаль
//   const currentPath = pathname.split("/").slice(2).join("/") || ""; // Убираем первую пустую строку и локаль

//   return (
//     <div className="flex gap-2">
//       {languages.map(({ code, label }) => (
//         <Link key={code} href={`/${code}/${currentPath}`}>
//           <button
//             className={`px-3 py-1 border rounded-md ${
//               code === currentLocale ? "bg-gray-300" : ""
//             }`}
//           >
//             {label}
//           </button>
//         </Link>
//       ))}
//     </div>
//   );
// }
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const languages = [
  { code: "ru", label: "🇷🇺 Русский" },
  { code: "kz", label: "🇰🇿 Қазақша" }
];

export default function LanguageSwitcher({ currentLocale }: { currentLocale: string }) {
  const pathname = usePathname();
  const currentPath = pathname.split("/").slice(2).join("/") || "";

  return (
    <div>
      {languages.map(({ code, label }) => (
        <Link key={code} href={`/${code}/${currentPath}`}>
          <button className={code === currentLocale ? "font-bold" : ""}>{label}</button>
        </Link>
      ))}
    </div>
  );
}
