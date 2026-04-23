"use client";

import Link from "next/link";
import { MdPlayArrow, MdTrendingUp } from "react-icons/md";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import styles from "./ShowDetail.module.scss";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function RelatedShows({ params, showsData }) {
  const slug = params?.slug;

  // Если данные не дошли, не рендерим секцию, чтобы не упасть с ошибкой
  if (!showsData) return null;

  const otherShows = Object.entries(showsData).filter(([key]) => key !== slug);

  return (
    <section className={styles.related}>
      <div className={styles.relatedContainer}>
        <div className={styles.relatedHeader}>
          <h2 className={styles.relatedTitle}>Смотрите также</h2>
          <div className={styles.titleUnderline}></div>
        </div>

        <div className={styles.relatedSliderWrapper}>
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {otherShows.map(([key, data]) => (
              <SwiperSlide key={key}>
                <Link href={`/shows/${key}`} className={styles.relatedCard}>
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
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
