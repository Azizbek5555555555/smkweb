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
        <title>Samarkand IT Company | Raqamli yechimlar markazi</title>
        <meta name="description" content="Samarkandda zamonaviy IT xizmatlar. Web va mobil ilovalar." />
        <meta name="keywords" content="Samarkand IT, IT kompaniya, web development" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Samarkand IT Company" />
        <meta property="og:description" content="Zamonaviy veb xizmatlar Samarkandda." />
        <meta property="og:image" content="/images/preview.jpg" />
        <meta property="og:url" content="https://smkweb.com/" />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Cursor />
      <HeaderNavigation />
      <FullpageProvider>
        <Main />
      </FullpageProvider>
    </>
  );
}
