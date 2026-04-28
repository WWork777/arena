"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { MdPlayArrow, MdArrowBack } from "react-icons/md";
import Reviews from "@/components/Reviews/Reviews";
import RelatedLofts from "./RelatedLofts";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import styles from "./LoftDetail.module.scss";

export default function LoftDetailClient({ loft, otherLofts }) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalVideoRef = useRef(null);

  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    if (modalVideoRef.current) modalVideoRef.current.pause();
    setIsModalOpen(false);
    document.body.style.overflow = "unset";
  };

  // Заглушки (если они не в Strapi)
  const tariffs = [
    { id: 1, image: "/images/tariffs/1.jpg", title: "Пакет Базовый" },
    { id: 2, image: "/images/tariffs/2.jpg", title: "Пакет Стандарт" },
    { id: 3, image: "/images/tariffs/3.jpg", title: "Пакет Максимум" },
  ];

  return (
    <main className={styles.wrapper}>
      <div className={styles.container}>
        <nav className={styles.topNav}>
          <button className={styles.backLink} onClick={() => router.back()}>
            <MdArrowBack /> Назад
          </button>
        </nav>

        <header className={styles.headerCentered}>
          <h1 className={styles.mainTitle}>{loft.title}</h1>
          <p className={styles.subtitle}>{loft.subtitle}</p>
        </header>

        <section className={styles.infoBlock}>
          <div className={styles.imageContent}>
            <Image
              src={loft.image}
              alt={loft.title}
              fill
              className={styles.mainImage}
              unoptimized
            />
          </div>
          <div className={styles.textContent}>
            <h2>О пространстве</h2>
            <p className={styles.description}>{loft.description}</p>
            <ul className={styles.featuresList}>
              {loft.features?.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className={styles.videoSection}>
          <h2 className={styles.sectionTitle}>Посмотрите видео о зале</h2>
          <div className={styles.videoPreviewCard} onClick={openModal}>
            <Image
              src={loft.image}
              alt="Превью"
              fill
              className={styles.videoPreviewImage}
              unoptimized
            />
            <div className={styles.playButton}>
              <MdPlayArrow size={50} />
            </div>
          </div>
        </section>

        {/* Слайдер тарифов */}
        <section className={styles.sliderSection}>
          <h2 className={styles.sectionTitle}>Выгодные тарифы</h2>
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
            {tariffs.map((t) => (
              <SwiperSlide key={t.id}>
                <div className={styles.tariffCard}>
                  <div className={styles.tariffImageWrap}>
                    <Image
                      src={t.image}
                      alt={t.title}
                      fill
                      className={styles.slideImage}
                    />
                  </div>
                  <h3 className={styles.tariffTitle}>{t.title}</h3>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>

        <Reviews />

        {/* Блок похожих лофтов */}
        <RelatedLofts lofts={otherLofts} />

        <nav className={styles.bottomNav}>
          <button className={styles.backButton} onClick={() => router.back()}>
            ← Назад
          </button>
        </nav>
      </div>

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
