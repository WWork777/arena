"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { MdPlayArrow, MdArrowBack, MdTrendingUp } from "react-icons/md"; // Иконка для видео
import Reviews from "@/components/Reviews/Reviews";

// Стили Swiper
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import styles from "./ShowDetail.module.scss";
import RelatedShows from "./RelatedShows";
export default function ShowDetailClient({show, shows}) {
      const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalVideoRef = useRef(null);

  // Логика модального окна
  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    if (modalVideoRef.current) {
      modalVideoRef.current.pause();
      modalVideoRef.current.currentTime = 0;
    }
    setIsModalOpen(false);
    document.body.style.overflow = "unset";
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isModalOpen) closeModal();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen]);

  // Заглушки (замените на реальные данные)
  const videos = [
    { id: 1, image: "/images/videos/1.jpg"},
    { id: 2, image: "/images/videos/2.jpg"},
    { id: 3, image: "/images/videos/3.jpg"},
    { id: 4, image: "/images/videos/3.jpg"},
    { id: 5, image: "/images/videos/3.jpg"},
  ];

  const photos = [
    { id: 1, url: "/images/show/1.jpg" },
    { id: 2, url: "/images/show/2.jpg" },
    { id: 3, url: "/images/show/3.jpg" },
    { id: 4, url: "/images/show/4.jpg" },
    { id: 5, url: "/images/show/4.jpg" },
    { id: 6, url: "/images/show/4.jpg" },
  ];

  return (
    <main className={styles.wrapper}>
      <div className={styles.container}>
        <nav className={styles.topNav}>
          <button className={styles.backLink} onClick={() => router.back()}>
            <MdArrowBack /> Назад
          </button>
        </nav>
        {/* 1. НАЗВАНИЕ СВЕРХУ ПО ЦЕНТРУ */}
        <header className={styles.headerCentered}>
          <h1 className={styles.mainTitle}>{show.title}</h1>
          <p className={styles.subtitle}>{show.subtitle}</p>
        </header>

        {/* 2. БЛОК: СЛЕВА ТЕКСТ, СПРАВА КАРТИНКА */}
        <section className={styles.infoBlock}>
          <div className={styles.imageContent}>
            <Image
              src={
                show.thumbnail ||
                "/images/VideoSection/8e4171cb71b178f4572b70cc5b6317c802ef0e04.png"
              }
              alt={show.title}
              fill
              className={styles.mainImage}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className={styles.textContent}>
            <h2>О пространстве</h2>
            <p className={styles.description}>{show.desc}</p>
            <ul className={styles.featuresList}>
              {show.features?.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* 3. СЛАЙДЕР "ВЫГОДНЫЕ ТАРИФЫ" */}
        <section className={styles.sliderSection}>
          <h2 className={styles.sectionTitle}>Видео с праздников</h2>
          <div className={styles.sliderWrapper}>
            <Swiper
              modules={[Navigation, Pagination]}
              navigation
              pagination={{ clickable: true }}
              spaceBetween={20}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
            >
              {videos.map((tariff) => (
                <SwiperSlide key={tariff.id}>
                  <div className={styles.tariffCard}>
                    <div className={styles.tariffImageWrap} onClick={openModal}>
                        <Image
                        src={
                            show.thumbnail ||
                            "/images/VideoSection/8e4171cb71b178f4572b70cc5b6317c802ef0e04.png"
                        }
                        alt="Превью видео"
                        fill
                        className={styles.videoPreviewImage}
                        />
                        <div className={styles.playButton}>
                        <MdPlayArrow size={50} />
                        </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
            <section className={styles.actionSection}>
                <button className={styles.requestButton}>Заказать</button>
            </section>
        </section>

        {/* 4. СЛАЙДЕР "ФОТО С ПРАЗДНИКОВ" */}
        <section className={styles.sliderSection}>
          <h2 className={styles.sectionTitle}>Фото с праздников</h2>
          <div className={styles.sliderWrapper}>
            <Swiper
              modules={[Navigation, Pagination]}
              navigation
              pagination={{ clickable: true }}
              spaceBetween={20}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
            >
              {photos.map((photo) => (
                <SwiperSlide key={photo.id}>
                  <div className={styles.photoCard}>
                    <Image
                      src={photo.url}
                      alt="Фото с праздника"
                      fill
                      className={styles.slideImage}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>
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
        {/* 5. ОТЗЫВЫ */}
        <Reviews />

        {/* 6. КНОПКА "ОСТАВИТЬ ЗАЯВКУ" */}
        <section className={styles.actionSection}>
          <button className={styles.requestButton}>Оставить заявку</button>
        </section>

        {/* 7. 4 ССЫЛКИ И КНОПКА НАЗАД */}
        <nav className={styles.bottomNav}>
          <div className={styles.linksGrid}>
            <Link href="/#quests" className={styles.navLink}>
              Квесты
            </Link>
            <Link href="/#animators" className={styles.navLink}>
              Аниматоры
            </Link>
            <Link href="/#shows" className={styles.navLink}>
              Шоу-программы
            </Link>
            <Link href="/#master-classes" className={styles.navLink}>
              Мастер-классы
            </Link>
          </div>

          <button className={styles.backButton} onClick={() => router.back()}>
            ← Назад
          </button>
        </nav>
      </div>

      {/* МОДАЛЬНОЕ ОКНО ДЛЯ ВИДЕО */}
      {isModalOpen &&
        createPortal(
          <div className={styles.modalOverlay} onClick={closeModal}>
            <div
              className={styles.modalContent}
              onClick={(e) => e.stopPropagation()}
            >
              <button className={styles.closeButton} onClick={closeModal}>
                ✕
              </button>
              <video
                ref={modalVideoRef}
                src={show.video}
                className={styles.modalVideo}
                controls
                autoPlay
                playsInline
              />
            </div>
          </div>,
          document.body,
        )}
    </main>
  );
}