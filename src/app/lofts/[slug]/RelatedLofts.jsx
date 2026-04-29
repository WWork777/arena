"use client";

import Link from "next/link";
import { MdPlayArrow, MdLocationOn } from "react-icons/md";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import styles from "./LoftDetail.module.scss";

export default function RelatedLofts({ lofts }) {
  if (!lofts || lofts.length === 0) return null;

  return (
    <section className={styles.related}>
      <div className={styles.relatedContainer}>
        <div className={styles.relatedHeader}>
          <h2 className={styles.relatedTitle}>Другие лофты</h2>
          <div className={styles.titleUnderline}></div>
        </div>

        <div style={{ paddingBottom: "40px" }}>
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            spaceBetween={24}
            slidesPerView={1}
            grabCursor={true}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {lofts.map((loft) => (
              <SwiperSlide key={loft.slug}>
                <Link
                  href={`/lofts/${loft.slug}`}
                  className={styles.relatedCard}
                >
                  <div className={styles.relatedVideoWrap}>
                    {/* Если есть видео, показываем его при наведении, иначе картинку */}
                    {loft.video ? (
                      <video
                        src={loft.video}
                        muted
                        loop
                        playsInline
                        onMouseOver={(e) => e.currentTarget.play()}
                        onMouseOut={(e) => {
                          e.currentTarget.pause();
                          e.currentTarget.currentTime = 0;
                        }}
                      />
                    ) : (
                      <img
                        src={loft.image}
                        alt={loft.title}
                        className={styles.slideImage}
                      />
                    )}
                    <div className={styles.cardOverlay}>
                      <div className={styles.relatedPlayIcon}>
                        <MdPlayArrow />
                      </div>
                    </div>
                    <div className={styles.ageBadge}>{loft.capacity}</div>
                  </div>
                  <div className={styles.relatedInfo}>
                    <div className={styles.relatedCategory}>
                      <MdLocationOn /> Томск
                    </div>
                    <h4 className={styles.relatedCardTitle}>{loft.title}</h4>
                    <div className={styles.relatedLink}>
                      Посмотреть зал <span>→</span>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
