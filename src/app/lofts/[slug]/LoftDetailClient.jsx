"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { MdPlayArrow, MdArrowBack } from "react-icons/md"; // Иконка для видео
import Reviews from "@/components/Reviews/Reviews";

// Стили Swiper
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import styles from "./LoftDetail.module.scss";

export default function LoftDetailClient({ loft }) {
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
  const tariffs = [
    { id: 1, image: "/images/tariffs/1.jpg", title: "Пакет Базовый" },
    { id: 2, image: "/images/tariffs/2.jpg", title: "Пакет Стандарт" },
    { id: 3, image: "/images/tariffs/3.jpg", title: "Пакет Максимум" },
    { id: 4, image: "/images/tariffs/3.jpg", title: "Пакет Максимум" },
    { id: 5, image: "/images/tariffs/3.jpg", title: "Пакет Максимум" },
  ];

  const photos = [
    { id: 1, url: "/images/holidays/1.jpg" },
    { id: 2, url: "/images/holidays/2.jpg" },
    { id: 3, url: "/images/holidays/3.jpg" },
    { id: 4, url: "/images/holidays/4.jpg" },
    { id: 5, url: "/images/holidays/4.jpg" },
    { id: 6, url: "/images/holidays/4.jpg" },
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
          <h1 className={styles.mainTitle}>{loft.title}</h1>
          <p className={styles.subtitle}>{loft.subtitle}</p>
        </header>

        {/* 2. БЛОК: СЛЕВА ТЕКСТ, СПРАВА КАРТИНКА */}
        <section className={styles.infoBlock}>
          <div className={styles.imageContent}>
            <Image
              src={
                loft.thumbnail ||
                "/images/VideoSection/8e4171cb71b178f4572b70cc5b6317c802ef0e04.png"
              }
              alt={loft.title}
              fill
              className={styles.mainImage}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className={styles.textContent}>
            <h2>О пространстве</h2>
            <p className={styles.description}>{loft.desc}</p>
            <ul className={styles.featuresList}>
              {loft.features?.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* НОВОЕ: ВИДЕО ПЕРЕД ТАРИФАМИ */}
        <section className={styles.videoSection}>
          <h2 className={styles.sectionTitle}>Посмотрите видео о зале</h2>
          <div className={styles.videoPreviewCard} onClick={openModal}>
            <Image
              src={
                loft.thumbnail ||
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
        </section>

        {/* 3. СЛАЙДЕР "ВЫГОДНЫЕ ТАРИФЫ" */}
        <section className={styles.sliderSection}>
          <h2 className={styles.sectionTitle}>Выгодные тарифы</h2>
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
              {tariffs.map((tariff) => (
                <SwiperSlide key={tariff.id}>
                  <div className={styles.tariffCard}>
                    <div className={styles.tariffImageWrap}>
                      <Image
                        src={tariff.image}
                        alt={tariff.title}
                        fill
                        className={styles.slideImage}
                      />
                    </div>
                    <h3 className={styles.tariffTitle}>{tariff.title}</h3>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
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
                src={loft.video}
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
