"use client";

import Link from "next/link";
import { MdPlayArrow, MdLocationOn } from "react-icons/md";
import { Swiper, SwiperSlide } from "swiper/react";

// 1. Импортируем нужные модули из Swiper
import { Navigation, Pagination } from "swiper/modules";

// 2. Обязательно импортируем их CSS стили
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import styles from "./LoftDetail.module.scss";

export default function RelatedLofts({ lofts }) {
  // Если лофтов нет, вообще не рендерим секцию
  if (!lofts || lofts.length === 0) return null;

  return (
    <section className={styles.related}>
      <div className={styles.relatedContainer}>
        <div className={styles.relatedHeader}>
          <h2 className={styles.relatedTitle}>Другие лофты</h2>
          <div className={styles.titleUnderline}></div>
        </div>

        {/* Добавляем отступ (padding) снизу, чтобы влезли точки пагинации */}
        <div style={{ paddingBottom: "40px" }}>
          <Swiper
            // 3. Подключаем модули к компоненту
            modules={[Navigation, Pagination]}
            navigation // Включаем стрелочки
            pagination={{ clickable: true }} // Включаем кликабельные точки внизу
            spaceBetween={24}
            slidesPerView={1}
            grabCursor={true} // Меняет курсор на "руку", показывая, что можно свайпать
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {lofts.map(([key, data]) => (
              <SwiperSlide key={key}>
                <Link href={`/lofts/${key}`} className={styles.relatedCard}>
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
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
