import Advantage from "@/components/Advantage/Advantage";
import Animators from "@/components/Animators/Animators";
import Contacts from "@/components/Contacts/Contacts";
import Graduation from "@/components/Graduation/Graduation";
import Hero from "@/components/Hero/Hero";
import LoftSpaces from "@/components/LoftSpaces/LoftSpaces";
import MasterClasses from "@/components/MasterClasses/MasterClasses";
import NewYear from "@/components/NewYear/NewYear";
import Quests from "@/components/Quests/Quests";
import Reviews from "@/components/Reviews/Reviews";
import ShowPrograms from "@/components/ShowPrograms/ShowPrograms";

// МЕТА-ДАННЫЕ ДЛЯ ГЛАВНОЙ СТРАНИЦЫ
export const metadata = {
  title: "Арена Развлечений Томск — Организация детских праздников под ключ",
  description:
    "Проведение незабываемых детских праздников в Томске. Аниматоры, квесты, научные шоу, мастер-классы и 6 уникальных лофт-пространств. Сделайте день рождения ребенка особенным вместе с Ареной Развлечений!",
  keywords:
    "детские праздники Томск, день рождения ребенка Томск, аниматоры Томск, аренда лофта для праздника, детские квесты, шоу-программы для детей, выпускной начальная школа",
  alternates: {
    canonical: "https://arena-tomsk.ru", // ЗАМЕНИТЕ НА ВАШ ДОМЕН
  },
  openGraph: {
    title: "Арена Развлечений Томск — Лучшие детские праздники здесь!",
    description:
      "Лофты, аниматоры, квесты и шоу-программы в Томске. Мы создаем праздники, которые дети запомнят навсегда.",
    url: "https://arena-tomsk.ru",
    siteName: "Арена Развлечений",
    images: [
      {
        url: "/og-main.jpg", // Создайте картинку для соцсетей 1200x630 и положите в public
        width: 1200,
        height: 630,
        alt: "Детский праздник в Арене Развлечений",
      },
    ],
    locale: "ru_RU",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Арена Развлечений",
    image: "https://arena-tomsk.ru/icons/Header/logo.png",
    "@id": "https://arena-tomsk.ru",
    url: "https://arena-tomsk.ru",
    telephone: "+79095431213",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Томск",
      addressRegion: "Томская область",
      addressCountry: "RU",
    },
    description:
      "Организация детских дней рождения, квестов и шоу в Томске. Аренда лофтов для праздников.",
    openingHours: "Mo-Su 09:00-21:00", // Укажите ваше реальное время работы
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <LoftSpaces />
      <Advantage />
      <Animators />
      <ShowPrograms />
      <Quests />
      <MasterClasses />
      <NewYear />
      <Graduation />
      <Reviews />
      {/* <Contacts /> */}
    </>
  );
}
