"use client";

import Link from "next/link";
import { MdPlayArrow, MdTrendingUp } from "react-icons/md";
import styles from "./ShowDetail.module.scss";

export default function RelatedShows({ shows }) {
  return (
    <section className={styles.related}>
      <div className={styles.relatedContainer}>
        <div className={styles.relatedHeader}>
          <h2 className={styles.relatedTitle}>Смотрите также</h2>
          <div className={styles.titleUnderline}></div>
        </div>

        <div className={styles.relatedGrid}>
          {shows.map(([key, data]) => (
            <Link
              href={`/shows/${key}`}
              key={key}
              className={styles.relatedCard}
            >
              <div className={styles.relatedVideoWrap}>
                <video
                  src={data.video}
                  muted
                  loop
                  playsInline
                  onMouseOver={(e) => e.currentTarget.play()}
                  onMouseOut={(e) => {
                    e.currentTarget.pause();
                    e.currentTarget.currentTime = 0; // Сбрасываем видео при уходе курсора
                  }}
                />

                <div className={styles.cardOverlay}>
                  <div className={styles.relatedPlayIcon}>
                    <MdPlayArrow />
                  </div>
                </div>

                {/* Бейджик на картинке */}
                <div className={styles.ageBadge}>{data.age}</div>
              </div>

              <div className={styles.relatedInfo}>
                <div className={styles.relatedCategory}>
                  <MdTrendingUp /> Популярное
                </div>
                <h4 className={styles.relatedCardTitle}>{data.title}</h4>
                <div className={styles.relatedLink}>
                  Узнать больше <span>→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
