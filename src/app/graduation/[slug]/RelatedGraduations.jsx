"use client";

import Link from "next/link";
import { MdPlayArrow, MdStars } from "react-icons/md";
import styles from "./GraduationDetail.module.scss";

export default function RelatedGraduations({ items }) {
  if (!items || items.length === 0) return null;

  return (
    <section className={styles.related}>
      <div className={styles.relatedContainer}>
        <div className={styles.relatedHeader}>
          <h2 className={styles.relatedTitle}>Другие программы на выпускной</h2>
          <div className={styles.titleUnderline}></div>
        </div>

        <div className={styles.relatedGrid}>
          {items.map((item) => (
            <Link
              href={`/graduation/${item.slug}`}
              key={item.slug}
              className={styles.relatedCard}
            >
              <div className={styles.relatedVideoWrap}>
                <video
                  src={item.video}
                  muted
                  loop
                  playsInline
                  onMouseOver={(e) => e.currentTarget.play()}
                  onMouseOut={(e) => {
                    e.currentTarget.pause();
                    e.currentTarget.currentTime = 0;
                  }}
                />
                <div className={styles.ageBadge}>{item.duration}</div>
              </div>
              <div className={styles.relatedInfo}>
                <div className={styles.relatedCategory}>
                  <MdStars /> Хит продаж
                </div>
                <h4 className={styles.relatedCardTitle}>{item.title}</h4>
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
