"use client";
import React from "react";
import { Cursor } from "@/components/cursor";
import { Header } from "@/components/header";
import { HeaderNavigation } from "@/components/headerNavigation";
import { FAQComponent } from "@/components/faqPage/faqComponent";

const faqData = [
  {
    question: "Сколько времени займет разработка моего сайтa?",
    answer: "В зависимости от сложности сайта, это занимает от 5 дней до 3 недель. Минималистичный лендинг создается быстрее, а многофункциональная платформа — дольше."
  },
  {
    question: "Сколько стоит сайт или приложение?",
    answer: "Цена определяется исходя из типа проекта, его размера и требований к дизайну. Мы подберем для вас подходящий пакет услуг на бесплатной консультации."
  },
  {
    question: "Вы сами выбираете домен и хостинг?",
    answer: "Да, мы рекомендуем клиенту оптимальные варианты и помогаем с регистрацией. Мы работаем с популярными провайдерами, такими как DigitalOcean, AWS, UZHosting и другими."
  },
  {
    question: "Разрабатываете ли вы мобильное приложение?",
    answer: "Конечно! Мы разрабатываем полнофункциональные и простые в использовании мобильные приложения для Android и iOS. Мы используем нативные технологии для лучшей производительности и пользовательского опыта."
  },
  {
    question: "Могу ли я работать на сайте самостоятельно?",
    answer: "Да, мы создадим для вас удобную панель управления и научим ею пользоваться. Вы сможете добавлять контент, редактировать страницы и управлять настройками без технических знаний."
  },
  {
    question: "Можете ли вы доработать существующий сайт?",
    answer: "Конечно! Мы можем модернизировать ваш текущий сайт, добавить новый функционал, улучшить дизайн или производительность. Проведем аудит и предложим оптимальные решения."
  },
];

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-colorLight">
      <Cursor />
      <HeaderNavigation />
      
      {/* Navbar at the top */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-colorLight/95 backdrop-blur-sm border-b border-colorSecondaryLight/20">
        <Header mode="hamburger" color="Dark" />
      </nav>

      {/* Main content with top padding for fixed navbar */}
      <main className="pt-20">
        <FAQComponent faqData={faqData} />
      </main>
    </div>
  );
}
