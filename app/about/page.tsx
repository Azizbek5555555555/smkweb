"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import "../work.css";
import "../header.css";
import FullpageProviderWork from "@/components/fullpageProviderWork";
import { Header } from "@/components/header";
import { HeaderNavigation } from "@/components/headerNavigation";
import Magentic from "@/components/ui/magentic";
import { redirect } from "next/navigation";
import { links } from "@/data/data";
import { Footer } from "@/components/contactSection/footer";

// ✅ SEO uchun metadata
export const metadata = {
  title: "Biz haqimizda | SMK Web",
  description:
    "SMK Web haqida to‘liq ma’lumot. Samarkanddagi yetakchi IT kompaniya, jamoamiz, maqsadlarimiz va xizmatlarimiz haqida bilib oling.",
  openGraph: {
    title: "Biz haqimizda | SMK Web",
    description:
      "Samarkanddagi SMK Web jamoasi, tajribamiz, missiyamiz va kelajak rejalari haqida.",
    url: "https://smkweb.uz/about",
    images: [
      {
        url: "/images/preview.jpg", // agar yo'q bo‘lsa /images/preview.jpg yozing
        width: 1200,
        height: 630,
        alt: "SMK Web — Biz haqimizda",
      },
    ],
  },
  robots: "index, follow",
};

export default function AboutPage() {
  const [delay, setDelay] = useState(15);
  let timer: NodeJS.Timeout;

  useEffect(() => {
    if (delay !== 0) {
      timer = setTimeout(() => {
        setDelay(delay - 1);
      }, 1000);
    } else {
      redirect(links.linkedin);
    }

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <>
      <Header color="Light" />
      <div className="darkGradient flex h-screen w-screen flex-col items-center justify-center px-paddingX py-paddingY text-center text-lg text-colorSecondaryLight md:text-3xl">
        About sahifasi hali tayyor emas, siz {delay} soniyada LinkedIn sahifaga yo‘naltirilasiz.
        <br />
        <span className="mt-5 text-xl text-colorLight">
          {delay} sekund ichida
        </span>
        <Link href={links.home} className="mt-5 underline">
          Bosh sahifaga qaytish
        </Link>
        <Footer className="bottom-0" />
      </div>
    </>
  );
}
