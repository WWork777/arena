import { notFound } from "next/navigation";
import Link from "next/link";
import {
  MdArrowBack,
  MdCheckCircle,
  MdGroups,
  MdSettingsInputComponent,
  MdRestaurant,
  MdLocalPhone,
} from "react-icons/md";
import styles from "./LoftDetail.module.scss";
import RelatedLofts from "./RelatedLofts"; // Импортируем новый блок

// База данных лофтов
const loftsData = {
  arena: {
    title: "Арена Лофт",
    metaTitle: "Арена Лофт — Технологичный детский праздник в Томске",
    metaDescription:
      "Стильное пространство для подростков в Томске: интерактивная стена, X-Box Series X и батут.",
    keywords:
      "детский праздник томск, лофт для подростков, день рождения ребенка",
    subtitle: "Технологичное пространство для современных школьников",
    desc: "Арена Лофт — это ответ на вопрос 'куда вести ребенка, который вырос из обычных игровых?'. Мы создали стильную атмосферу, где электроника сочетается с активным движением.",
    features: [
      "Интерактивная стена с играми",
      "Зона X-Box Series X",
      "Профессиональный батут",
      "Диско-свет и звук",
    ],
    video: "/videos/loft/arena.mp4",
    color: "#ae305e",
    capacity: "до 25 гостей",
    equipment: "Звук 2кВт, Лазеры, Приставки",
    food: "Своя еда разрешена без сборов",
  },
  konfetti: {
    title: "Конфетти Лофт",
    metaTitle: "Конфетти Лофт — Игровое пространство для малышей в Томске",
    metaDescription:
      "Уютный детский лофт для детей от 1 до 6 лет. Сухой бассейн, развивающие игрушки и безопасная горка.",
    subtitle: "Уютный и безопасный мир для самых маленьких",
    desc: "Пространство 'Конфетти' наполнено светом и нежностью. Мы продумали всё до мелочей, чтобы малыши чувствовали себя комфортно.",
    features: [
      "Огромный сухой бассейн",
      "Безопасная горка",
      "Грифельная стена",
      "Развивающие игрушки",
    ],
    video: "/videos/loft/konfetti.mp4",
    color: "#13a7e9",
    capacity: "до 20 гостей",
    equipment: "Караоке, Чайник, СВЧ",
    food: "Есть зона для сервировки стола",
  },
  magic: {
    title: "Магический лофт",
    metaTitle: "Магический лофт — Парк развлечений с картингом в Томске",
    metaDescription:
      "Масштабный детский лофт с картингом, лабиринтом и скоростными горками в Томске.",
    subtitle: "Территория драйва и настоящих приключений",
    desc: "Главная фишка этого лофта — масштаб. Это полноценный парк развлечений только для вашей компании с настоящим картингом.",
    features: [
      "Детский картинг",
      "Двухуровневый лабиринт",
      "Две скоростные горки",
      "Бассейн с шариками",
    ],
    video: "/videos/loft/Магический Лофт.mp4",
    color: "#f2c81c",
    capacity: "до 35 гостей",
    equipment: "Большой ТВ, Акустика",
    food: "Отдельная фуршетная зона",
  },
  marmelad: {
    title: "Мармеладный дом",
    metaTitle: "Мармеладный дом — Эстетичный семейный лофт в Томске",
    metaDescription:
      "Самый красивый лофт Томска с каруселью и фотозонами. Идеально для нежных праздников.",
    subtitle: "Эстетика, уют и дзен для семейного праздника",
    desc: "Нежный лофт для тех, кто ценит красоту. Здесь можно устроить стильную фотосессию, пока дети резвятся на интерьерной карусели.",
    features: [
      "Интерьерная карусель",
      "Кресла-коконы",
      "Аэрохоккей",
      "Дизайнерские фотозоны",
    ],
    video: "/videos/loft/marmelad.mp4",
    color: "#d73973",
    capacity: "до 25 гостей",
    equipment: "Кофемашина, Посуда",
    food: "Помогаем с кейтерингом",
  },
  partyhall: {
    title: "Патихолл",
    metaTitle: "Патихолл — Большой лофт для праздников любого масштаба",
    metaDescription:
      "Самое большое пространство: VR-зона, картинг, лабиринт и банкетный зал в Томске.",
    subtitle: "Самое большое пространство для грандиозных событий",
    desc: "Патихолл — это лофт-гигант. Мы разделили его на зоны так, чтобы взрослые наслаждались банкетом, а дети — играми в соседнем зале.",
    features: [
      "Зал для банкета",
      "Зона VR",
      "Лабиринт и картинг",
      "Тайная комната с консолями",
    ],
    video: "/videos/loft/partyhall.mp4",
    color: "#ae305e",
    capacity: "до 50 гостей",
    equipment: "Проектор, Профессиональный свет",
    food: "Полноценная кухня, холодильник",
  },
  flint: {
    title: "Флинт",
    metaTitle: "Лофт Флинт — Пиратский квест и активные игры в Томске",
    metaDescription:
      "Тематический лофт с детским автодромом и лабиринтом для квестов.",
    subtitle: "Дух приключений и морских открытий",
    desc: "Лофт 'Флинт' — это место для маленьких первооткрывателей. Просторный зал позволяет реализовать любой сценарий: от квеста до гонок.",
    features: [
      "Детский автодром",
      "Игровой лабиринт",
      "Зона для шоу-программ",
      "Пиратский дизайн",
    ],
    video: "/videos/loft/magic.mp4",
    color: "#3ab5ad",
    capacity: "до 30 гостей",
    equipment: "Микрофоны, Спецэффекты",
    food: "Большой стол для чаепития",
  },
};

// SEO Мета-данные
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const loft = loftsData[slug];
  const domain = "https://arena-tomsk.ru";

  if (!loft) return { title: "Пространство не найдено" };

  return {
    title: loft.metaTitle,
    description: loft.metaDescription,
    keywords: loft.keywords,
    alternates: { canonical: `${domain}/lofts/${slug}` },
    openGraph: {
      title: loft.metaTitle,
      description: loft.metaDescription,
      url: `${domain}/lofts/${slug}`,
      siteName: "Арена Развлечений Томск",
      images: [{ url: "/icons/Header/logo.png", width: 1200, height: 630 }],
      locale: "ru_RU",
      type: "website",
    },
  };
}

export default async function LoftPage({ params }) {
  const { slug } = await params;
  const loft = loftsData[slug];

  if (!loft) return notFound();

  // Фильтруем другие лофты для блока "Смотрите также"
  const otherLofts = Object.entries(loftsData)
    .filter(([key]) => key !== slug)
    .slice(0, 3);

  // Микроразметка Schema.org
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EventVenue",
    name: loft.title,
    description: loft.metaDescription,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Томск",
      addressRegion: "Томская область",
      addressCountry: "RU",
    },
    telephone: "+79095431213",
    image: `https://arena-tomsk.ru/icons/Header/logo.png`,
    amenityFeature: loft.features.map((f) => ({
      "@type": "LocationFeatureSpecification",
      name: f,
      value: true,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className={styles.wrapper}>
        <nav className={styles.topNav}>
          <Link href="/#loft" className={styles.backLink}>
            <MdArrowBack /> Назад к лофтам
          </Link>
        </nav>

        <div className={styles.container}>
          <section className={styles.info}>
            <div className={styles.head}>
              <span
                className={styles.badge}
                style={{ backgroundColor: loft.color }}
              >
                Пространство
              </span>
              <h1 className={styles.name}>{loft.title}</h1>
              <p className={styles.subtitle}>{loft.subtitle}</p>
            </div>

            <p className={styles.description}>{loft.desc}</p>

            <div className={styles.features}>
              <h3>Что внутри:</h3>
              <div className={styles.featureGrid}>
                {loft.features.map((item, i) => (
                  <div key={i} className={styles.featureItem}>
                    <MdCheckCircle style={{ color: loft.color }} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.actions}>
              <Link
                href="tel:+79095431213"
                className={styles.mainCta}
                style={{ backgroundColor: loft.color }}
              >
                <MdLocalPhone /> Забронировать лофт
              </Link>
            </div>
          </section>

          <section className={styles.visual}>
            <div className={styles.videoCard}>
              <video
                src={loft.video}
                autoPlay
                muted
                loop
                playsInline
                className={styles.video}
              />
              <div className={styles.videoOverlay}></div>
            </div>
          </section>
        </div>

        <section className={styles.detailsGrid}>
          <div className={styles.detailCard}>
            <MdGroups
              className={styles.detailIcon}
              style={{ color: loft.color }}
            />
            <h4>Вместимость</h4>
            <p>{loft.capacity}</p>
          </div>
          <div className={styles.detailCard}>
            <MdSettingsInputComponent
              className={styles.detailIcon}
              style={{ color: loft.color }}
            />
            <h4>Оборудование</h4>
            <p>{loft.equipment}</p>
          </div>
          <div className={styles.detailCard}>
            <MdRestaurant
              className={styles.detailIcon}
              style={{ color: loft.color }}
            />
            <h4>Еда и напитки</h4>
            <p>{loft.food}</p>
          </div>
        </section>

        {/* ВСТАВЛЯЕМ НОВЫЙ БЛОК ТУТ */}
        <RelatedLofts lofts={otherLofts} />
      </main>
    </>
  );
}
