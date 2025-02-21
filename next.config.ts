// /** @type {import('next').NextConfig} */
// const withNextIntl = require('next-intl/plugin')();

// const nextConfig = {
//   i18n: {
//     locales: ["en", "ru"], // ✅ Доступные языки
//     defaultLocale: "ru", // ✅ Язык по умолчанию
//   },
//   async rewrites() {
//     return [
//       {
//         source: "/:locale/",
//         destination: "/",
//       },
//     ];
//   },
// };

// // Экспортируем конфигурацию с next-intl
// module.exports = withNextIntl(nextConfig);

/** @type {import('next').NextConfig} */
const withNextIntl = require('next-intl/plugin')();

const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/:locale/",
        destination: "/",
      },
    ];
  },
};

// Экспортируем конфигурацию с next-intl
module.exports = withNextIntl(nextConfig);
