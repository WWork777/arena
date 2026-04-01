import { notFound } from "next/navigation";
import Link from "next/link";
import {
  MdArrowBack,
  MdSchool,
  MdTimer,
  MdGroups,
  MdLocalPhone,
  MdCheckCircle,
} from "react-icons/md";
import styles from "./GraduationDetail.module.scss";
import RelatedGraduations from "./RelatedGraduations";

const graduationData = {
  peremena: {
    title: "Программа Перемена",
    metaTitle: "Выпускной «Перемена» в Томске — Трендовое шоу для классов",
    metaDescription:
      "Современный выпускной в Томске: Тик-Ток тренды, челленджи «Нащупай», задания на логику и крутая дискотека с диджеем.",
    subtitle: "Самый хайповый выпускной этого года",
    desc: "Программа «Перемена» создана для тех, кто хочет быть в тренде. Это динамичное шоу, где нет скучных поздравлений, а есть только драйв, современные задания и музыка, которую слушают дети.",
    duration: "2 часа",
    target: "4 классы / Детские сады",
    features: [
      "2 харизматичных ведущих",
      "Профессиональный DJ",
      "Челлендж «Нащупай» (с тараканами!)",
      "Тик-Ток баттлы",
    ],
    video: "/videos/graduations/peremena.mp4",
    color: "#ff3d00",
  },
  mix: {
    title: "Программа Микс",
    metaTitle: "Выпускной «Микс» в Томске — Квест и научное шоу",
    metaDescription:
      "Уникальный формат выпускного: авторский квест, научные эксперименты, фокусы и бумажная дискотека в Томске.",
    subtitle: "Всё лучшее в одной программе",
    desc: "Шоу-программа «Микс» — это идеальный баланс между таинственным квестом, зрелищными экспериментами и безудержным весельем на бумажной дискотеке.",
    duration: "2.5 часа",
    target: "Детские сады / 4 классы",
    features: [
      "Авторский сюжетный квест",
      "Научное шоу и фокусы",
      "Генератор мыльных пузырей",
      "Бумажная дискотека",
    ],
    video: "/videos/graduations/mix.mp4",
    color: "#00e676",
  },
  "neon-party": {
    title: "Неоновая вечеринка",
    metaTitle: "Неоновый выпускной в Томске — Светящееся шоу",
    metaDescription:
      "Яркий выпускной в неоновом стиле: рисование на футболках, аквагрим, светящийся реквизит и дискотека в ультрафиолете.",
    subtitle: "Сияй ярче всех на своем празднике",
    desc: "Погружение в мир ультрафиолета! Каждый ребенок создаст свою уникальную светящуюся футболку, а затем зажжет на самой яркой дискотеке города.",
    duration: "2 часа",
    target: "Для любого возраста",
    features: [
      "МК по рисованию на футболках",
      "Неоновые браслеты всем",
      "Светящийся аквагрим",
      "УФ-дискотека",
    ],
    video: "/videos/graduations/11176874478315.mp4",
    color: "#d500f9",
  },
  "fort-boyard": {
    title: "Форт Боярд",
    metaTitle: "Выпускной Форт Боярд в Томске — Командный квест",
    metaDescription:
      "Легендарное шоу на вашем выпускном! 10 станций испытаний, командный дух и золото Форта. Заказывайте в Томске.",
    subtitle: "Победи свои страхи и собери ключи",
    desc: "Настоящая проверка на прочность и сплоченность класса. 10 станций с испытаниями, таинственные ящики и финальная битва за золото.",
    duration: "2 часа",
    target: "4 классы / Подростки",
    features: [
      "10 станций испытаний",
      "Задания на командообразование",
      "Ящик «Нащупай»",
      "Шагодувы",
    ],
    video: "/videos/graduations/fort.mp4",
    color: "#ffab00",
  },
  "foam-graduation": {
    title: "Пенная вечеринка",
    metaTitle: "Пенный выпускной в Томске — Летний отрыв",
    metaDescription:
      "Лучшее решение для летнего выпускного: море пены, водные битвы и биг-волейбол в Томске.",
    subtitle: "Самый мокрый и веселый выпускной",
    desc: "Если выпускной проходит на улице или в теплое время — это лучший вариант. Тонны пены, огромные мячи и полное ощущение свободы.",
    duration: "1.5 - 2 часа",
    target: "Для всех",
    features: [
      "Мощная пенная пушка",
      "Биг волейбол",
      "Водные обливания",
      "Возможность добавить Холли",
    ],
    video: "/videos/graduations/11176875985643.mp4",
    color: "#00b0ff",
  },
};

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const data = graduationData[slug];
  if (!data) return { title: "Программа не найдена" };
  const domain = "https://arena-tomsk.ru";

  return {
    title: data.metaTitle,
    description: data.metaDescription,
    alternates: { canonical: `${domain}/graduation/${slug}` },
  };
}

export default async function GraduationPage({ params }) {
  const { slug } = await params;
  const data = graduationData[slug];

  if (!data) return notFound();

  const otherGrads = Object.entries(graduationData)
    .filter(([key]) => key !== slug)
    .slice(0, 3);

  return (
    <main className={styles.wrapper}>
      <nav className={styles.topNav}>
        <Link href="/#graduation" className={styles.backLink}>
          <MdArrowBack /> Ко всем выпускным
        </Link>
      </nav>

      <div className={styles.container}>
        <section className={styles.info}>
          <div className={styles.head}>
            <span
              className={styles.badge}
              style={{ backgroundColor: data.color }}
            >
              Выпускной 2026
            </span>
            <h1 className={styles.name}>{data.title}</h1>
            <p className={styles.subtitle}>{data.subtitle}</p>
          </div>

          <p className={styles.description}>{data.desc}</p>

          <div className={styles.stats}>
            <div className={styles.statItem}>
              <MdTimer style={{ color: data.color }} />
              <div>
                <span>Длительность:</span>
                <strong>{data.duration}</strong>
              </div>
            </div>
            <div className={styles.statItem}>
              <MdSchool style={{ color: data.color }} />
              <div>
                <span>Подходит для:</span>
                <strong>{data.target}</strong>
              </div>
            </div>
          </div>

          <div className={styles.features}>
            <h3>Что входит в стоимость:</h3>
            <div className={styles.featureGrid}>
              {data.features.map((f, i) => (
                <div key={i} className={styles.featureItem}>
                  <MdCheckCircle style={{ color: data.color }} />
                  <span>{f}</span>
                </div>
              ))}
            </div>
          </div>

          <Link
            href="tel:+79095431213"
            className={styles.mainCta}
            style={{ backgroundColor: data.color }}
          >
            <MdLocalPhone /> Забронировать дату
          </Link>
        </section>

        <section className={styles.visual}>
          <div className={styles.videoCard}>
            <video
              src={data.video}
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

      <RelatedGraduations items={otherGrads} />
    </main>
  );
}
