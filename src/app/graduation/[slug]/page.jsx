import { notFound } from "next/navigation";
import Link from "next/link";
import VideoWithLoader from "./VideoPlayer";
import {
  MdArrowBack,
  MdSchool,
  MdTimer,
  MdLocalPhone,
  MdCheckCircle,
} from "react-icons/md";
import styles from "./GraduationDetail.module.scss";
import RelatedGraduations from "./RelatedGraduations";

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const res = await fetch(
    `${STRAPI_URL}/api/graduations?filters[slug][$eq]=${slug}`,
  );
  const result = await res.json();
  const data = result.data?.[0];
  if (!data) return { title: "Программа не найдена" };
  return { title: data.title, description: data.desc };
}

export default async function GraduationPage({ params }) {
  const { slug } = await params;

  // 1. Текущая программа
  const res = await fetch(
    `${STRAPI_URL}/api/graduations?filters[slug][$eq]=${slug}&populate=*`,
  );
  const result = await res.json();
  const rawData = result.data?.[0];

  if (!rawData) return notFound();

  // 2. Другие программы
  const otherRes = await fetch(
    `${STRAPI_URL}/api/graduations?filters[slug][$ne]=${slug}&populate=*&pagination[limit]=3`,
  );
  const otherResult = await otherRes.json();

  const data = {
    ...rawData,
    video: rawData.video?.url ? `${STRAPI_URL}${rawData.video.url}` : "",
    features: rawData.features?.map((f) => f.item) || [],
  };

  const otherGrads = otherResult.data.map((item) => ({
    slug: item.slug,
    title: item.title,
    duration: item.duration,
    video: item.video?.url ? `${STRAPI_URL}${item.video.url}` : "",
  }));

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
            <VideoWithLoader src={data.video} className={styles.video} />
            <div className={styles.videoOverlay}></div>
          </div>
        </section>
      </div>

      <RelatedGraduations items={otherGrads} />
    </main>
  );
}
