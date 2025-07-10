"use client";

import "../work.css";
import "../header.css";
import FullpageProviderWork from "@/components/fullpageProviderWork";
import { Header } from "@/components/header";
import { HeaderNavigation } from "@/components/headerNavigation";
import { Footer } from "@/components/contactSection/footer";
import Image from "next/image";

// ✅ SEO uchun metadata
export const metadata = {
  title: "Biz haqimizda | SMK Web",
  description:
    "SMK Web haqida to‘liq ma’lumot. Samarkanddagi yetakchi IT kompaniya, jamoamiz, maqsadlarimiz va xizmatlarimiz haqida bilib oling.",
  openGraph: {
    title: "Biz haqimizda | SMK Web",
    description:
      "Samarkanddagi SMK Web jamoasi, tajribamiz, missiyamiz va kelajak rejalari haqida.",
    url: "https://smkweb.com/about",
    images: [
      {
        url: "https://smkweb.com/images/preview.jpg",
        width: 1200,
        height: 630,
        alt: "SMK Web — Biz haqimizda",
      },
    ],
  },
  robots: "index, follow",
};

export default function AboutPage() {
  return (
    <>
      <Header color="Light" />
      <div className="min-h-screen w-full px-paddingX py-paddingY bg-black text-white flex flex-col items-center text-center gap-10">
        <h1 className="text-4xl md:text-6xl font-bold">Biz haqimizda</h1>

        <p className="max-w-3xl text-lg md:text-xl text-gray-300">
          SMK Web — bu zamonaviy veb yechimlar taqdim etuvchi kompaniya. Biz Samarkand va butun
          O‘zbekistonda mijozlarga web, mobil va dizayn xizmatlarini taqdim etamiz. Bizning
          maqsadimiz — raqamli texnologiyalar orqali bizneslarni rivojlantirish.
        </p>

        <Image
          src="/images/preview.jpg"
          alt="SMK Web jamoasi"
          width={800}
          height={400}
          className="rounded-xl shadow-xl"
        />

        <div className="max-w-2xl text-gray-400 text-base md:text-lg">
          <p>
            Biz jamoamiz bilan 2020-yildan beri ishlaymiz. Loyihalarimiz orasida ko‘plab davlat va
            xususiy tashkilotlar mavjud. Har bir mijoz biz uchun muhim.
          </p>
          <p className="mt-4">
            SMK Web — Sizning ishonchli IT hamkoringiz. Biz bilan bog‘laning!
          </p>
        </div>

        <Footer className="mt-10" />
      </div>
    </>
  );
}
