"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import {
  MdPlayArrow,
  MdArrowBack,
  MdTrendingUp,
  MdPlace,
} from "react-icons/md"; // Иконка для видео
import Reviews from "@/components/Reviews/Reviews";

// Стили Swiper
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import styles from "./MasterClassDetail.module.scss";
// import RelatedShows from "./RelatedShows";

const loftsData = {
  arena: {
    title: "Арена Лофт",
    image: "/images/loft/arena_prev.jpg",
    color: "#ae305e",
  },
  konfetti: {
    title: "Конфетти Лофт",
    image: "/images/loft/konfetti_prev.jpg",
    color: "#13a7e9",
  },
  magic: {
    title: "Магический лофт",
    image: "/images/loft/magic_prev.jpg",
    color: "#f2c81c",
  },
  marmelad: {
    title: "Мармеладный дом",
    image: "/images/loft/marmelad_prev.jpg",
    color: "#d73973",
  },
  partyhall: {
    title: "Патихолл",
    image: "/images/loft/partyhall_prev.jpg",
    color: "#ae305e",
  },
  flint: {
    title: "Флинт",
    image: "/images/loft/flint_prev.jpg",
    color: "#3ab5ad",
  },
};
export default function MasterDetailClient({ master, masters }) {
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
    { id: 1, image: "/images/videos/1.jpg" },
    { id: 2, image: "/images/videos/2.jpg" },
    { id: 3, image: "/images/videos/3.jpg" },
    { id: 4, image: "/images/videos/3.jpg" },
    { id: 5, image: "/images/videos/3.jpg" },
  ];

  const photos = [
    { id: 1, url: "/images/master/1.jpg" },
    { id: 2, url: "/images/master/2.jpg" },
    { id: 3, url: "/images/master/3.jpg" },
    { id: 4, url: "/images/master/4.jpg" },
    { id: 5, url: "/images/master/4.jpg" },
    { id: 6, url: "/images/master/4.jpg" },
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
          <h1 className={styles.mainTitle}>{master.title}</h1>
          <p className={styles.subtitle}>{master.subtitle}</p>
        </header>

        {/* 2. БЛОК: СЛЕВА ТЕКСТ, СПРАВА КАРТИНКА */}
        <section className={styles.infoBlock}>
          <div className={styles.imageContent}>
            <Image
              src={
                master.thumbnail ||
                "/images/VideoSection/8e4171cb71b178f4572b70cc5b6317c802ef0e04.png"
              }
              alt={master.title}
              fill
              className={styles.mainImage}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className={styles.textContent}>
            <h2>О пространстве</h2>
            <p className={styles.description}>{master.desc}</p>
            <ul className={styles.featuresList}>
              {master.features?.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
            <button className={styles.requestButton}>Заказать</button>
          </div>
        </section>

        {/* 3. СЛАЙДЕР "ВЫГОДНЫЕ ТАРИФЫ" */}
        <section className={styles.sliderSection}>
          <h2 className={styles.sectionTitle}>Другие мастер-классы</h2>
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
              {masters.map(([key, data]) => (
                <SwiperSlide key={key}>
                  <div className={styles.tariffCard}>
                    <div className={styles.tariffImageWrap}>
                      <Image
                        src={data.image}
                        alt={data.title}
                        fill
                        className={styles.slideImage}
                        src={`${data.image}`}
                      />
                    </div>
                    <h3 className={styles.tariffTitle}>{data.title}</h3>
                    <span className={styles.tariffSubTitle}>
                      {data.metaTitle}
                    </span>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>
        <section className={styles.actionSection}>
          <button className={styles.requestButton}>Заказать</button>
        </section>

        {/* 5. ОТЗЫВЫ */}

        {/* 6. КНОПКА "ОСТАВИТЬ ЗАЯВКУ" */}
        {/* <section className={styles.actionSection}>
          <button className={styles.requestButton}>Оставить заявку</button>
        </section> */}

        <section className={styles.sliderSection}>
          <h2 className={styles.sectionTitle}>Наши лофт пространства</h2>
          <div className={styles.sliderWrapper}>
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              navigation
              pagination={{ clickable: true }}
              spaceBetween={25}
              slidesPerView={1}
              autoplay={{ delay: 4000 }}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
            >
              {Object.entries(loftsData).map(([key, loft]) => (
                <SwiperSlide key={key}>
                  <Link href={`/lofts/${key}`} className={styles.loftCardLink}>
                    <div className={styles.photoCard}>
                      <Image
                        src={loft.image || "/images/loft-placeholder.jpg"}
                        alt={loft.title}
                        fill
                        className={styles.slideImage}
                      />
                      <div className={styles.loftOverlay}>
                        <div
                          className={styles.loftIcon}
                          style={{ backgroundColor: loft.color }}
                        >
                          <MdPlace />
                        </div>
                      </div>
                    </div>
                    <div className={styles.loftCardInfo}>
                      <h3 className={styles.tariffTitle}>{loft.title}</h3>
                      <span className={styles.relatedLink}>
                        Посмотреть лофт <span>→</span>
                      </span>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>
        <Reviews />
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
