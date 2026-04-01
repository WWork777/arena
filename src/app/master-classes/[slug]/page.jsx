import { notFound } from "next/navigation";
import Link from "next/link";
import {
  MdArrowBack,
  MdBrush,
  MdAccessTime,
  MdChildCare,
  MdLocalPhone,
  MdCheckCircle,
} from "react-icons/md";
import styles from "./MasterClassDetail.module.scss";
import RelatedMasters from "./RelatedMasters";

const mastersData = {
  "bath-bombs": {
    title: "Бомбочка для ванны",
    metaTitle: "Мастер-класс по созданию бомбочек для ванны в Томске",
    metaDescription:
      "Творческий мастер-класс для детей: создаем шипучие бомбочки своими руками. Выбор ароматов, цветов и декора. Веселая химия для детей!",
    subtitle: "Ароматное творчество и капля науки",
    desc: "Создаем ароматные шипучие бомбочки для ванны своими руками. Ребенок выбирает цвета, запахи и формочки, смешивает ингредиенты и узнает основы химии. Готовая бомбочка украсит любой праздник и подарит радость во время купания.",
    duration: "40 минут",
    age: "от 5 лет",
    materials: "Все материалы включены в стоимость",
    features: [
      "Свой дизайн бомбочки",
      "Натуральные компоненты",
      "Упаковка в подарок",
      "Основы химии в игре",
    ],
    image: "/images/masters/bomb.webp",
    color: "#e91e63",
  },
  "cryo-cocktails": {
    title: "Крио Коктейль",
    metaTitle: "Мастер-класс Крио-коктейли в Томске — Научное шоу",
    metaDescription:
      "Увлекательное шоу с жидким азотом. Дети сами готовят дымящиеся и вкусные коктейли. Наука — это вкусно!",
    subtitle: "Самые холодные и вкусные напитки в мире",
    desc: "Увлекательное научное шоу с жидким азотом. Дети готовят дымящиеся коктейли, узнают о свойствах экстремально низких температур и наблюдают за удивительными превращениями. Каждый участник пробует результат эксперимента!",
    duration: "30-45 минут",
    age: "от 4 лет",
    materials: "Безопасный жидкий азот и соки",
    features: [
      "Шоу с жидким азотом",
      "Дымящиеся напитки",
      "Дегустация",
      "Научные факты",
    ],
    image: "/images/masters/cocktail.webp",
    color: "#2196f3",
  },
  "taba-paws": {
    title: "ТабаЛапки",
    metaTitle: "Мастер-класс ТабаЛапки в Томске — Создание антистресс игрушек",
    metaDescription:
      "Трендовый мастер-класс: создаем мягкие лапки-антистресс. Развитие мелкой моторики и крутой сувенир с собой!",
    subtitle: "Создай свою идеальную мягкую лапку",
    desc: "Создаем мягкие игрушечные лапки-антистресс из таба. Этот материал невероятно приятен на ощупь. Развиваем мелкую моторику, творческое мышление и уносим домой милый сувенир, который не хочется выпускать из рук.",
    duration: "45 минут",
    age: "от 6 лет",
    materials: "Гипоаллергенный таба-материал",
    features: [
      "Трендовая игрушка",
      "Развитие моторики",
      "Разные цвета и формы",
      "Сувенир с собой",
    ],
    image: "/images/masters/taba.webp",
    color: "#9c27b0",
  },
  slimes: {
    title: "Слаймы",
    metaTitle: "Мастер-класс по слаймам в Томске — Сделай свой слайм",
    metaDescription:
      "Самый популярный детский мастер-класс! Создаем яркие, тянущиеся слаймы с декором. Огромный выбор добавок!",
    subtitle: "Огромная лаборатория ярких слаймов",
    desc: "Самый популярный мастер-класс! Создаем яркие слаймы с блестками, ароматами и разными наполнителями. Дети учатся правильно смешивать ингредиенты, чтобы получить идеальную текстуру, и забирают игрушку домой.",
    duration: "45 минут",
    age: "от 5 лет",
    materials: "Клей, активатор, шармики, блестки",
    features: [
      "Текстура на выбор",
      "Более 20 видов декора",
      "Контейнер в комплекте",
      "Арома-добавки",
    ],
    image: "/images/masters/slaym.webp",
    color: "#4caf50",
  },
  "bead-bracelets": {
    title: "Браслеты из бисера",
    metaTitle: "Мастер-класс по бисероплетению в Томске для детей",
    metaDescription:
      "Плетение модных украшений из бисера. Развиваем стиль и усидчивость. Уникальный браслет своими руками!",
    subtitle: "Школа юного ювелира",
    desc: "Учимся плести модные браслеты из качественного бисера. Развиваем творческое мышление, чувство стиля и мелкую моторику. Каждый ребенок создает уникальное украшение, которое станет отличным подарком себе или близким.",
    duration: "45-60 минут",
    age: "от 7 лет",
    materials: "Чешский бисер, бусины, леска",
    features: [
      "Чувство стиля",
      "Развитие усидчивости",
      "Готовое украшение",
      "Схемы плетения",
    ],
    image: "/images/masters/bracelet.webp",
    color: "#ff9800",
  },
  "cryo-ice-cream": {
    title: "Крио Мороженое",
    metaTitle: "Мастер-класс Крио-мороженое в Томске — Вкусная наука",
    metaDescription:
      "Готовим натуральное мороженое с помощью жидкого азота. Удивительное шоу и самая вкусная дегустация!",
    subtitle: "Наука, которую можно съесть",
    desc: "Вкусное научное шоу! Готовим настоящее мороженое с помощью жидкого азота прямо на глазах у детей. Удивительные облака пара, мгновенная заморозка натуральных сливок и дегустация самого свежего мороженого в мире.",
    duration: "40 минут",
    age: "от 3 лет",
    materials: "Натуральные сливки, топпинги",
    features: [
      "Мгновенная заморозка",
      "Шоу-программа",
      "Дегустация",
      "Без консервантов",
    ],
    image: "/images/masters/icecreem.webp",
    color: "#00bcd4",
  },
};

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const master = mastersData[slug];
  const baseUrl = "https://arena-tomsk.ru";

  if (!master) return { title: "Мастер-класс не найден" };

  return {
    title: master.metaTitle,
    description: master.metaDescription,
    alternates: { canonical: `${baseUrl}/master-classes/${slug}` },
    openGraph: {
      title: master.metaTitle,
      description: master.metaDescription,
      url: `${baseUrl}/master-classes/${slug}`,
      type: "article",
      images: [{ url: master.image }],
    },
  };
}

export default async function MasterPage({ params }) {
  const { slug } = await params;
  const master = mastersData[slug];

  if (!master) return notFound();

  const otherMasters = Object.entries(mastersData)
    .filter(([key]) => key !== slug)
    .slice(0, 3);

  return (
    <main className={styles.wrapper}>
      <nav className={styles.topNav}>
        <Link href="/#master-classes" className={styles.backLink}>
          <MdArrowBack /> Ко всем мастер-классам
        </Link>
      </nav>

      <div className={styles.container}>
        <section className={styles.info}>
          <div className={styles.head}>
            <span
              className={styles.badge}
              style={{ backgroundColor: master.color }}
            >
              Мастер-класс
            </span>
            <h1 className={styles.name}>{master.title}</h1>
            <p className={styles.subtitle}>{master.subtitle}</p>
          </div>

          <p className={styles.description}>{master.desc}</p>

          <div className={styles.stats}>
            <div className={styles.statItem}>
              <MdAccessTime style={{ color: master.color }} />
              <div>
                <span>Длительность:</span>
                <strong>{master.duration}</strong>
              </div>
            </div>
            <div className={styles.statItem}>
              <MdChildCare style={{ color: master.color }} />
              <div>
                <span>Возраст:</span>
                <strong>{master.age}</strong>
              </div>
            </div>
          </div>

          <div className={styles.features}>
            <h3>Особенности:</h3>
            <div className={styles.featureGrid}>
              {master.features.map((item, i) => (
                <div key={i} className={styles.featureItem}>
                  <MdCheckCircle style={{ color: master.color }} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <Link
            href="tel:+79095431213"
            className={styles.mainCta}
            style={{ backgroundColor: master.color }}
          >
            <MdLocalPhone /> Записаться на занятие
          </Link>
        </section>

        <section className={styles.visual}>
          <div className={styles.imageCard}>
            <img
              src={master.image}
              alt={master.title}
              className={styles.mainImage}
            />
            <div className={styles.imageOverlay}></div>
          </div>
        </section>
      </div>

      <RelatedMasters masters={otherMasters} />
    </main>
  );
}
