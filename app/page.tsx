"use client";

import Head from "next/head";
import { Main } from "@/components/main";
import { Cursor } from "@/components/cursor";
import FullpageProvider from "@/components/fullpageProvider";
import { HeaderNavigation } from "@/components/headerNavigation";
import "./index.css";

export default function HomePage() {
  return (
    <>
      <Head>
        {/* 🔹 Title: Ko‘p tilli + sinonim */}
        <title>SMK Web — IT компания в Самарканде | IT kompaniya Samarkandda | IT Services Uzbekistan</title>

        {/* 🔹 Description: Ko‘p tilli, boyitilgan kalit so‘zlar */}
        <meta
          name="description"
          content="SMK Web — Самаркандская IT компания. Raqamli yechimlar markazi, веб-разработка, сайтлар яратиш, mobil ilovalar ishlab chiqish. Tashkent, Buxoro, Andijon, Uzbekistan bo‘ylab xizmatlar."
        />

        {/* 🔹 Keywords: sinonim va turli tillarda */}
        <meta
          name="keywords"
          content="Samarkand IT, IT kompaniya, веб студия Самарканд, Web development, Mobile apps Uzbekistan, IT xizmatlar, sayt yasash, web dizayn, разработка сайта, дизайн сайта, SEO xizmatlar"
        />

        {/* 🔹 Robots: indeks va kuzatishga ruxsat */}
        <meta name="robots" content="index, follow" />

        {/* 🔹 Open Graph for social media */}
        <meta property="og:title" content="SMK Web — IT xizmatlar Samarkandda" />
        <meta
          property="og:description"
          content="Samarkandda zamonaviy veb xizmatlar — web-sayt, mobil ilovalar, SEO, digital marketing."
        />
        <meta property="og:image" content="https://smkweb.com/images/preview.jpg" />
        <meta property="og:url" content="https://smkweb.com/" />
        <meta property="og:type" content="website" />

        {/* 🔹 Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="SMK Web — IT xizmatlar Samarkandda" />
        <meta name="twitter:description" content="Web development, mobile apps, SEO xizmatlar — SMK Web" />
        <meta name="twitter:image" content="https://smkweb.com/images/preview.jpg" />

        {/* 🔹 Fav Icon */}
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* 🔹 Canonical URL */}
        <link rel="canonical" href="https://smkweb.com/" />

        {/* 🔹 Language meta (for multi-language support) */}
        <meta httpEquiv="Content-Language" content="ru, uz, en" />
      </Head>

      <Cursor />
      <HeaderNavigation />
      <FullpageProvider>
        <Main />
      </FullpageProvider>
    </>
  );
}
