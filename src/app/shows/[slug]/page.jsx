import { notFound } from "next/navigation";
import Link from "next/link";
import {
  MdArrowBack,
  MdTimer,
  MdPeople,
  MdLocalPhone,
  MdCheckCircle,
} from "react-icons/md";
import styles from "./ShowDetail.module.scss";
import RelatedShows from "./RelatedShows";

const showsData = {
  "bloger-party": {
    title: "Блогер Пати",
    metaTitle: "Блогер Пати в Томске — Трендовая вечеринка для детей",
    metaDescription:
      "Детский день рождения в стиле TikTok и Reels в Томске! Челленджи, съемка видео и зажигательная дискотека. Почувствуй себя звездой! Заказывайте: +7(909)543-12-13",
    subtitle: "Стань звездой интернета на своем празднике",
    desc: "Зажигательная вечеринка в стиле популярных блогеров. Мы собрали самые актуальные тренды, чтобы дети могли не просто повеселиться, но и создать крутой контент. Танцы, конкурсы, челленджи и профессиональная атмосфера Instagram и TikTok!",
    duration: "60-90 минут",
    age: "от 7 до 14 лет",
    features: [
      "Съемка трендовых рилс",
      "Блогерские челленджи",
      "Танцевальные баттлы",
      "Фотосессия с реквизитом",
    ],
    video: "/videos/shows/bloger.mp4",
    color: "#ff0050",
  },
  "wednesday-quest": {
    title: "Венздей Квест",
    metaTitle: "Квест Уэнсдей в Томске — Таинственный праздник для детей",
    metaDescription:
      "Погрузитесь в атмосферу академии Nevermore! Таинственный квест, загадки и легендарный танец Уэнсдей на вашем празднике в Томске. Бронируйте онлайн!",
    subtitle: "Раскрой тайны академии Nevermore",
    desc: "Таинственный квест по мотивам популярного сериала. Участникам предстоит разгадать серию загадочных событий и выучить знаменитый танец Венздей. Мистическая атмосфера и логические задачи гарантированы.",
    duration: "60-80 минут",
    age: "от 6 до 12 лет",
    features: [
      "Поиск улик",
      "Уроки зельеварения",
      "Тот самый танец",
      "Встреча с Вещью",
    ],
    video: "/videos/shows/wednesday.mp4",
    color: "#2b2b2b",
  },
  "zvero-quest": {
    title: "Зверо-Квест",
    metaTitle: "Зверо-Квест в Томске — Познавательное шоу с животными",
    metaDescription:
      "Увлекательный квест с животными для детей в Томске. Игры, загадки и близкое знакомство с фауной. Идеально для любознательных детей!",
    subtitle: "Удивительный мир животных у вас в гостях",
    desc: "Увлекательное приключение, где дети познакомятся с удивительным миром фауны в игровой форме. Программа включает образовательные элементы и тактильный контакт.",
    duration: "60 минут",
    age: "от 3 до 10 лет",
    features: [
      "Знакомство с животными",
      "Тематические игры",
      "Тактильный контакт",
      "Интересные факты",
    ],
    video: "/videos/shows/zvero.mp4",
    color: "#4caf50",
  },
  "squid-game": {
    title: "Игра в Кальмара",
    metaTitle: "Игра в Кальмара для детей в Томске — Безопасный квест",
    metaDescription:
      "Популярный квест «Игра в Кальмара» в безопасном формате для детей в Томске. Командный дух, азарт и море эмоций! Узнайте подробности программы.",
    subtitle: "Испытай свою ловкость и смелость",
    desc: "Адаптированная и полностью безопасная версия популярных игр. Командный дух, азарт и желание победить! Программа учит взаимовыручке и стратегии.",
    duration: "90 минут",
    age: "от 8 до 15 лет",
    features: [
      "Тише едешь — дальше будешь",
      "Сахарные соты",
      "Перетягивание каната",
      "Финальное испытание",
    ],
    video: "/videos/shows/squidgame.mp4",
    color: "#ed1b76",
  },
  "science-show": {
    title: "Научное Шоу",
    metaTitle: "Научное шоу в Томске — Химические опыты на праздник",
    metaDescription:
      "Зрелищное научное шоу для детей в Томске! Настоящие эксперименты, сухой лед, азот и безопасные взрывы эмоций. Магия науки на вашем дне рождения!",
    subtitle: "Магия науки своими руками",
    desc: "Зрелищные эксперименты и удивительные опыты. Дети увидят химические реакции и физические фокусы.",
    duration: "45-60 минут",
    age: "от 5 до 14 лет",
    features: [
      "Жидкий азот",
      "Сухой лед",
      "Создание лизунов",
      "Огненные опыты",
    ],
    video: "/videos/shows/science.mp4",
    color: "#00bcd4",
  },
  "foam-party": {
    title: "Пенная Вечеринка",
    metaTitle: "Пенная вечеринка в Томске — Летний праздник для детей",
    metaDescription:
      "Лучшая пенная вечеринка для детей в Томске! Тонны безопасной пены, крутая музыка и драйв. Сделайте праздник незабываемым!",
    subtitle: "Самый пушистый и веселый праздник",
    desc: "Море пены, музыки и веселья! Дети обожают резвиться в облаках безопасной пены. Идеальное завершение любого активного праздника.",
    duration: "40-60 минут",
    age: "без ограничений",
    features: [
      "Безопасная пена",
      "Мощная пушка",
      "Танцевальные хиты",
      "Пенное шоу",
    ],
    video: "/videos/shows/foam.mov",
    color: "#2196f3",
  },
  "tesla-show": {
    title: "Тесла Шоу",
    metaTitle: "Тесла шоу в Томске — Укрощение молний на празднике",
    metaDescription:
      "Завораживающее электрическое шоу с катушками Тесла в Томске. Настоящие молнии, светящиеся лампы и полная безопасность. Закажите магию электричества!",
    subtitle: "Повелители молний и электричества",
    desc: "Завораживающее электрическое шоу с катушками Тесла. Настоящие молнии, светящиеся в руках лампы и музыка разрядов.",
    duration: "30-45 минут",
    age: "от 6 лет",
    features: [
      "Укрощение молний",
      "Музыка молний",
      "Опыты с плазмой",
      "Безопасный интерактив",
    ],
    video: "/videos/shows/tesla.mp4",
    color: "#673ab7",
  },
  "transformers-show": {
    title: "Трансформер Шоу",
    metaTitle: "Шоу Трансформеров в Томске — Роботы на день рождения",
    metaDescription:
      "Встречайте Бамблби и Оптимуса Прайма в Томске! Огромные роботы, дымовые пушки и захватывающий сюжет. Мечта любого ребенка!",
    subtitle: "Битва гигантов на вашем празднике",
    desc: "Встреча с настоящими трансформерами! Роботы-гиганты высотой 2.5 метра со звуковыми и световыми эффектами.",
    duration: "60 минут",
    age: "от 4 до 12 лет",
    features: [
      "Роботы 2.5 метра",
      "Дымовые пушки",
      "Голоса роботов",
      "Стальная дискотека",
    ],
    video: "/videos/shows/transformers.mp4",
    color: "#3f51b5",
  },
  "fort-boyard-quest": {
    title: "Форт-Квест",
    metaTitle: "Детский квест Форт Боярд в Томске — Собери ключи",
    metaDescription:
      "Легендарный Форт Боярд для детей в Томске! Командные испытания, тайны старца Фура и золото форта. Проверьте свою смелость и ловкость.",
    subtitle: "Победи старцев и забери золото Форта",
    desc: "Командный квест в стиле популярного телешоу. Преодоление препятствий и поиск ключей в ящиках с 'сюрпризами' и битва умов.",
    duration: "90 минут",
    age: "от 7 до 15 лет",
    features: [
      "Испытания на время",
      "Контактные задания",
      "Сбор ключей",
      "Финальный выкуп золота",
    ],
    video: "/videos/shows/fort.mp4",
    color: "#ff9800",
  },
  "hogwarts-party": {
    title: "Хогвартс-Туса",
    metaTitle: "Вечеринка Гарри Поттер в Томске — Магия и волшебство",
    metaDescription:
      "Письмо из Хогвартса уже здесь! Распределяющая шляпа, уроки магии и квиддич в Томске. Самый волшебный день рождения для юных магов.",
    subtitle: "Ваше письмо из Хогвартса уже здесь",
    desc: "Волшебная вечеринка в стиле Гарри Поттера. Распределение по факультетам, уроки зельеварения и квиддич.",
    duration: "60-90 минут",
    age: "от 6 до 13 лет",
    features: [
      "Распределяющая шляпа",
      "Уроки магии",
      "Турнир по Квиддичу",
      "Зелье удачи",
    ],
    video: "/videos/shows/hogwarts.mp4",
    color: "#740001",
  },
  "digital-circus": {
    title: "Цифровой Цирк",
    metaTitle: "Цифровой Цирк в Томске — Инновационное шоу для детей",
    metaDescription:
      "Шоу будущего в Томске! Неоновые эффекты, лазеры и атмосфера Digital Circus. Погружение в виртуальную реальность на вашем празднике.",
    subtitle: "Погружение в виртуальную реальность",
    desc: "Современное шоу с цифровыми технологиями. Световое шоу, лазеры, проекции и невероятные спецэффекты создают атмосферу будущего.",
    duration: "60 минут",
    age: "от 5 до 12 лет",
    features: [
      "Лазерное шоу",
      "Неоновый реквизит",
      "Цифровые герои",
      "Световая дискотека",
    ],
    video: "/videos/shows/digital.mp4",
    color: "#00e5ff",
  },
};

// SEO Мета-данные с поддержкой Canonical
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const show = showsData[slug];
  const baseUrl = "https://arena-tomsk.ru"; // Укажите свой домен

  if (!show) return { title: "Программа не найдена | Арена развлечений" };

  const canonicalUrl = `${baseUrl}/shows/${slug}`;

  return {
    title: show.metaTitle,
    description: show.metaDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: show.metaTitle,
      description: show.metaDescription,
      url: canonicalUrl,
      siteName: "Арена развлечений Томск",
      type: "article",
    },
  };
}

export default async function ShowPage({ params }) {
  const { slug } = await params;
  const show = showsData[slug];

  if (!show) return notFound();

  const otherShows = Object.entries(showsData)
    .filter(([key]) => key !== slug)
    .slice(0, 3);

  return (
    <main className={styles.wrapper}>
      <nav className={styles.topNav}>
        <Link href="/#shows" className={styles.backLink}>
          <MdArrowBack /> Назад к программам
        </Link>
      </nav>

      <div className={styles.container}>
        <section className={styles.info}>
          <div className={styles.head}>
            <span
              className={styles.badge}
              style={{ backgroundColor: show.color }}
            >
              Шоу-программа
            </span>
            <h1 className={styles.name}>{show.title}</h1>
            <p className={styles.subtitle}>{show.subtitle}</p>
          </div>

          <p className={styles.description}>{show.desc}</p>

          <div className={styles.stats}>
            <div className={styles.statItem}>
              <MdTimer style={{ color: show.color }} />
              <div>
                <span>Длительность:</span>
                <strong>{show.duration}</strong>
              </div>
            </div>
            <div className={styles.statItem}>
              <MdPeople style={{ color: show.color }} />
              <div>
                <span>Возраст:</span>
                <strong>{show.age}</strong>
              </div>
            </div>
          </div>

          <div className={styles.features}>
            <h3>В программе:</h3>
            <div className={styles.featureGrid}>
              {show.features.map((item, i) => (
                <div key={i} className={styles.featureItem}>
                  <MdCheckCircle style={{ color: show.color }} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <Link
            href="tel:+79095431213"
            className={styles.mainCta}
            style={{ backgroundColor: show.color }}
          >
            <MdLocalPhone /> Заказать шоу
          </Link>
        </section>

        <section className={styles.visual}>
          <div className={styles.videoCard}>
            <video
              src={show.video}
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

      <RelatedShows shows={otherShows} />
    </main>
  );
}
