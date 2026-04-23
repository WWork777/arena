"use client";

import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { MdPlayArrow, MdPlace, MdArrowBack } from "react-icons/md";
import { useRouter } from "next/navigation";
import Reviews from "@/components/Reviews/Reviews";

// Стили Swiper
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import styles from "./AnimatorDetail.module.scss";

export default function AnimatorDetailClient() {
  const router = useRouter();

  // Данные лофтов (можно вынести в отдельный конфиг)
  const lofts = [
    {
      id: "arena",
      title: "Арена Лофт",
      addr: "ул. Ленина, 1", // Уточните адрес, если он отличается
      img: "/images/loft/arena.jpg",
    },
    {
      id: "konfetti",
      title: "Конфетти Лофт",
      addr: "пер. Светлый, 5",
      img: "/images/loft/konfetti.mp4", // Здесь лучше использовать путь к фото-превью .jpg
    },
    {
      id: "magic",
      title: "Магический лофт",
      addr: "пр. Фрунзе, 10",
      img: "/images/loft/magic.jpg",
    },
    {
      id: "marmelad",
      title: "Мармеладный дом",
      addr: "ул. Пушкина, 5",
      img: "/images/loft/marmelad.jpg",
    },
    {
      id: "partyhall",
      title: "Патихолл",
      addr: "ул. Сибирская, 15",
      img: "/images/loft/partyhall.jpg",
    },
    {
      id: "flint",
      title: "Флинт",
      addr: "ул. Набережная, 3",
      img: "/images/loft/flint.jpg",
    },
  ];

  return (
    <main className={styles.wrapper}>
      <div className={styles.container}>
        {/* Кнопка назад */}
        <button className={styles.backBtn} onClick={() => router.back()}>
          <MdArrowBack /> Назад
        </button>

        {/* 1. ЗАГОЛОВОК СВЕРХУ */}
        <header className={styles.header}>
          <h1 className={styles.title}>Аниматоры</h1>
          <div className={styles.underline}></div>
        </header>

        {/* 2. БЛОК: СЛЕВА КАРТИНКА, СПРАВА ТЕКСТ И КНОПКА */}
        <section className={styles.mainInfo}>
          <div className={styles.imageSide}>
            <div className={styles.imageWrapper}>
              <Image
                src="/images/animators/main-photo.jpg"
                alt="Аниматоры"
                fill
                className={styles.img}
              />
            </div>
          </div>
          <div className={styles.textSide}>
            <p className={styles.desc}>
              Наши аниматоры — это не просто люди в костюмах, а профессиональные
              актеры, которые знают подход к каждому ребенку. Мы создаем
              атмосферу сказки, в которую верят даже взрослые.
            </p>
            <button
              className={styles.orderBtn}
              onClick={() => window.alert("Открывается форма")}
            >
              Заказать
            </button>
          </div>
        </section>

        {/* 3. СЛАЙДЕР ВИДЕО С ПРАЗДНИКОВ */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Видео с праздников</h2>
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{ 768: { slidesPerView: 3 } }}
          >
            {[1, 2, 3, 4].map((v) => (
              <SwiperSlide key={v}>
                <div className={styles.videoCard}>
                  <MdPlayArrow className={styles.playIcon} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>

        {/* 4. СЛАЙДЕР ФОТО С ПРАЗДНИКОВ */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Фото с праздников</h2>
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            spaceBetween={15}
            slidesPerView={1}
            breakpoints={{ 768: { slidesPerView: 3 } }}
          >
            {[1, 2, 3, 4, 5, 6].map((f) => (
              <SwiperSlide key={f}>
                <div className={styles.photoCard}>
                  <Image
                    src={`/images/animators/shot-${f}.jpg`}
                    alt="Фото"
                    fill
                    className={styles.shot}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>

        {/* 5. ОТЗЫВЫ */}
        <Reviews />

        {/* 6. НАШИ ЛОФТ ПРОСТРАНСТВА (как на схеме 2) */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Наши лофт-пространства</h2>
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation
            pagination={{ clickable: true }}
            spaceBetween={25}
            slidesPerView={1}
            autoplay={{ delay: 5000 }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {lofts.map((loft) => (
              <SwiperSlide key={loft.id}>
                <div className={styles.loftCard}>
                  <div className={styles.loftImgWrap}>
                    <Image
                      src={loft.img}
                      alt={loft.title}
                      fill
                      className={styles.shot}
                    />
                  </div>
                  <div className={styles.loftContent}>
                    <h3>{loft.title}</h3>
                    <p>
                      <MdPlace /> {loft.addr}
                    </p>
                    <Link
                      href={`/lofts/${loft.id}`}
                      className={styles.moreLink}
                    >
                      Подробнее
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>
      </div>
    </main>
  );
}
