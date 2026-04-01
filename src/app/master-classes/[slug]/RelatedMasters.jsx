"use client";

import Link from "next/link";
import { MdBrush } from "react-icons/md";
import styles from "./MasterClassDetail.module.scss";

export default function RelatedMasters({ masters }) {
  return (
    <section className={styles.related}>
      <div className={styles.relatedContainer}>
        <div className={styles.relatedHeader}>
          <h2 className={styles.relatedTitle}>Другие мастер-классы</h2>
          <div className={styles.titleUnderline}></div>
        </div>

        <div className={styles.relatedGrid}>
          {masters.map(([key, data]) => (
            <Link
              href={`/master-classes/${key}`}
              key={key}
              className={styles.relatedCard}
            >
              <div className={styles.relatedImageWrap}>
                <img
                  src={data.image}
                  alt={data.title}
                  className={styles.relatedImg}
                />
                <div className={styles.ageBadge}>{data.age}</div>
              </div>

              <div className={styles.relatedInfo}>
                <div className={styles.relatedCategory}>
                  <MdBrush /> Творчество
                </div>
                <h4 className={styles.relatedCardTitle}>{data.title}</h4>
                <div className={styles.relatedLink}>
                  Подробнее <span>→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
