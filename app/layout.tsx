import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import localFont from "next/font/local";
import GoogleAnalytics from "@/app/GoogleAnalytics";
import Script from "next/script";

import "./globals.css";
import StoreProvider from "@/redux/storeProvider";
import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
gsap.registerPlugin(CustomEase);

// Fontlar
const dM_Sans = DM_Sans({ subsets: ["latin-ext"] });
const satoshi = localFont({
  src: "../font/satoshi/Satoshi-Variable.woff2",
  style: "normal",
});
const helvetica = localFont({
  src: "../font/helvetica/HelveticaNowDisplay-Medium.woff2",
  style: "normal",
});

// ✅ SEO metadata (Next.js 13+ uchun avtomatik head)
export const metadata: Metadata = {
  title: "SMKWeb | Разработка 3D сайтов, CEM систем и мобильных приложений в Узбекистане",
  description:
    "Ведущая IT компания в Узбекистане, специализирующаяся на создании 3D веб-сайтов, CEM системах и разработке мобильных приложений.",
  keywords:
    "разработка 3D сайтов, 3D веб-дизайн, CEM системы, разработка мобильных приложений, IT компания Узбекистан",
  robots: "index, follow",
  alternates: {
    canonical: "https://smkweb.com",
    languages: {
      "ru-RU": "https://smkweb.com",
      "uz-UZ": "https://smkweb.com",
      "en-US": "https://smkweb.com",
    },
  },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: "https://smkweb.com",
    siteName: "SMKWeb",
    title: "SMKWeb | 3D сайты, CEM системы и мобильные приложения в Узбекистане",
    description:
      "Профессиональная разработка 3D веб-сайтов, CEM систем и мобильных приложений в Ташкенте, Самарканде, Бухаре и других городах.",
    images: [
      {
        url: "https://smkweb.com/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "SMKWeb - IT компания в Узбекистане",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SMKWeb | Разработка 3D сайтов и мобильных приложений",
    description:
      "Ведущая IT компания в Узбекистане по разработке 3D сайтов, CEM систем и мобильных приложений.",
    images: ["https://smkweb.com/images/twitter-image.jpg"],
  },
  authors: [{ name: "SMKWeb" }],
  publisher: "SMKWeb",
  creator: "SMKWeb",
  formatDetection: {
    telephone: true,
    date: true,
    address: true,
    email: true,
    url: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <head>
        {/* Favicon va Font optimizatsiya */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans&display=swap"
          rel="stylesheet"
        />

        {/* Schema.org mikrodata */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "SMKWeb",
              url: "https://smkweb.com",
              logo: "/sprinter.jpg",
              description: "Разработка 3D сайтов, CEM систем и мобильных приложений в Узбекистане",
              address: {
                "@type": "PostalAddress",
                addressCountry: "UZ",
                addressLocality: "Samarkand",
                streetAddress: "Taraqyot, 6",
              },
              telephone: "+998950107688",
              email: "smkgroupsinc@gmail.com",
              sameAs: [
                "https://facebook.com/smkweb",
                "https://instagram.com/smkweb",
                "https://t.me/smkweb",
              ],
              serviceArea: [
                "Ташкент", "Самарканд", "Бухара", "Наманган", 
                "Андижан", "Фергана", "Нукус", "Хива", 
                "Коканд", "Карши", "Ургенч", "Термез", 
                "Джизак", "Навои", "Чирчик", "Гулистан"
              ],
              services: [
                {
                  "@type": "Service",
                  name: "Разработка 3D веб-сайтов",
                  description: "Создание интерактивных 3D сайтов с высокой конверсией",
                },
                {
                  "@type": "Service",
                  name: "CEM системы",
                  description: "Внедрение систем управления клиентским опытом",
                },
                {
                  "@type": "Service",
                  name: "Разработка мобильных приложений",
                  description: "Создание нативных и кроссплатформенных мобильных приложений",
                },
              ],
            }),
          }}
        />
        <GoogleAnalytics />
      </head>
      <body className={helvetica.className}>
        <StoreProvider>{children}</StoreProvider>
      </body>
      <Script src="https://cdn.jsdelivr.net/gh/vipulkumar-dev/gsap@2024/ScrambleTextPlugin.min.js" />
    </html>
  );
}
