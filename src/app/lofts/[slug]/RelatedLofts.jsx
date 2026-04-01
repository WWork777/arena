"use client";

import Link from "next/link";
import { MdPlayArrow, MdLocationOn } from "react-icons/md";
import styles from "./LoftDetail.module.scss";

export default function RelatedLofts({ lofts }) {
  return (
    <section className={styles.related}>
      <div className={styles.relatedContainer}>
        <div className={styles.relatedHeader}>
          <h2 className={styles.relatedTitle}>Другие лофты</h2>
          <div className={styles.titleUnderline}></div>
        </div>

        <div className={styles.relatedGrid}>
          {lofts.map(([key, data]) => (
            <Link
              href={`/lofts/${key}`}
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

                <div className={styles.cardOverlay}>
                  <div className={styles.relatedPlayIcon}>
                    <MdPlayArrow />
                  </div>
                </div>

                <div className={styles.ageBadge}>{data.capacity}</div>
              </div>

              <div className={styles.relatedInfo}>
                <div className={styles.relatedCategory}>
                  <MdLocationOn /> Томск
                </div>
                <h4 className={styles.relatedCardTitle}>{data.title}</h4>
                <div className={styles.relatedLink}>
                  Посмотреть зал <span>→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
