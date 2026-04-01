"use client";

import Link from "next/link";
import { MdPlayArrow, MdStars } from "react-icons/md";
import styles from "./GraduationDetail.module.scss";

export default function RelatedGraduations({ items }) {
  return (
    <section className={styles.related}>
      <div className={styles.relatedContainer}>
        <div className={styles.relatedHeader}>
          <h2 className={styles.relatedTitle}>Другие программы на выпускной</h2>
          <div className={styles.titleUnderline}></div>
        </div>

        <div className={styles.relatedGrid}>
          {items.map(([key, data]) => (
            <Link
              href={`/graduation/${key}`}
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
                    e.currentTarget.currentTime = 0;
                  }}
                />
                <div className={styles.ageBadge}>{data.duration}</div>
              </div>

              <div className={styles.relatedInfo}>
                <div className={styles.relatedCategory}>
                  <MdStars /> Хит продаж
                </div>
                <h4 className={styles.relatedCardTitle}>{data.title}</h4>
                <div className={styles.relatedLink}>
                  Узнать детали <span>→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
