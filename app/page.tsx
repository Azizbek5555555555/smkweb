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
  {/* Title */}
  <title>
    SMK Web — IT компания Самарканд | Web studio Uzbekistan | Mobil ilovalar, SEO xizmatlar, веб разработка
  </title>

  {/* Charset */}
  <meta charSet="UTF-8" />
  <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

  {/* Viewport */}
  <meta name="viewport" content="width=device-width, initial-scale=1" />

  {/* Description */}
  <meta
    name="description"
    content="SMK Web — IT компания в Самарканде. Web studio O‘zbekistonda: saytlar yaratish, mobil ilovalar, SEO xizmatlar, digital marketing, Telegram botlar, CRM tizimlar. Tashkent, Buxoro, Andijon, Qarshi, Xorazm bo‘ylab xizmatlar."
  />

  {/* Keywords */}
  <meta
    name="keywords"
    content="IT kompaniya Samarkand, Web studio, Веб студия Самарканд, IT xizmatlar, SEO xizmatlar, sayt yaratish, web dizayn, mobil ilova, Telegram bot, сайт заказать, разработка сайта, Digital marketing Uzbekistan, CRM tizim, UX/UI dizayn, веб разработка, sayt yasash"
  />

  {/* Robots */}
  <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />

  {/* Author / Publisher */}
  <meta name="author" content="SMK Web Team" />
  <meta name="publisher" content="SMK Web" />

  {/* Language */}
  <meta httpEquiv="Content-Language" content="uz, ru, en" />

  {/* Canonical */}
  <link rel="canonical" href="https://smkweb.com/" />

  {/* Favicons */}
  <link rel="icon" href="/favicon.ico" />
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
  <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#f59e0b" />

  {/* Open Graph */}
  <meta property="og:title" content="SMK Web — Web-saytlar, Mobil ilovalar, SEO xizmatlar" />
  <meta
    property="og:description"
    content="SMK Web — Zamonaviy IT xizmatlar: web development, mobil ilovalar, SEO optimizatsiya, CRM, Telegram botlar. Samarkand, Uzbekistan bo‘ylab."
  />
  <meta property="og:url" content="https://smkweb.com/" />
  <meta property="og:type" content="website" />
  <meta property="og:image" content="https://smkweb.com/images/preview.jpg" />
  <meta property="og:site_name" content="SMK Web" />
  <meta property="og:locale" content="uz_UZ" />
  <meta property="og:locale:alternate" content="ru_RU" />
  <meta property="og:locale:alternate" content="en_US" />

  {/* Twitter Card */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="SMK Web — Web sayt, mobil ilova va SEO xizmatlar" />
  <meta
    name="twitter:description"
    content="Professional IT kompaniya: Web studio Samarkand, mobil ilovalar, SEO xizmatlar, CRM va Telegram botlar"
  />
  <meta name="twitter:image" content="https://smkweb.com/images/preview.jpg" />
  <meta name="twitter:site" content="@smkweb" />
  <meta name="twitter:creator" content="@smkweb" />

  {/* Theme color for mobile browsers */}
  <meta name="theme-color" content="#f59e0b" />
  <meta name="msapplication-TileColor" content="#f59e0b" />

  {/* Geo data */}
  <meta name="geo.region" content="UZ-SK" />
  <meta name="geo.placename" content="Samarkand" />
  <meta name="geo.position" content="39.6270;66.9749" />
  <meta name="ICBM" content="39.6270, 66.9749" />

  {/* Rating */}
  <meta name="rating" content="general" />

  {/* Referrer Policy */}
  <meta name="referrer" content="no-referrer-when-downgrade" />

  {/* Structured Data: JSON-LD (SEO boost) */}
  <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "SMK Web",
      "url": "https://smkweb.com",
      "logo": "https://smkweb.com/images/logo.png",
      "description": "SMK Web — Самаркандская IT компания. Веб-разработка, сайты, мобильные приложения, SEO, CRM.",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Samarkand",
        "addressCountry": "UZ"
      },
      "sameAs": [
        "https://t.me/smkweb",
        "https://www.instagram.com/smkweb",
        "https://www.facebook.com/smkweb"
      ]
    }
  `}} />

</Head>


      <Cursor />
      <HeaderNavigation />
      <FullpageProvider>
        <Main />
      </FullpageProvider>
    </>
  );
}
