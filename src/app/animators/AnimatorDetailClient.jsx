"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { MdPlayArrow, MdPlace, MdArrowBack } from "react-icons/md";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";
import Reviews from "@/components/Reviews/Reviews";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import styles from "./AnimatorDetail.module.scss";

export default function AnimatorDetailClient({ data, lofts }) {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState("");
  const videoRef = useRef(null);

  const openModal = (url) => {
    setSelectedVideo(url);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedVideo("");
  };

  return (
    <main className={styles.wrapper}>
      <div className={styles.container}>
        <button className={styles.backBtn} onClick={() => router.back()}>
          <MdArrowBack /> Назад
        </button>

        <header className={styles.header}>
          <h1 className={styles.title}>{data.title}</h1>
          <div className={styles.underline}></div>
        </header>

        <section className={styles.mainInfo}>
          <div className={styles.imageSide}>
            <div className={styles.imageWrapper}>
              {data.mainPhoto && (
                <Image
                  src={data.mainPhoto}
                  alt="Аниматоры"
                  fill
                  className={styles.img}
                  unoptimized
                />
              )}
            </div>
          </div>
          <div className={styles.textSide}>
            <p className={styles.desc}>{data.description}</p>
            <Link href="tel:+79095431213" className={styles.orderBtn}>
              Заказать
            </Link>
          </div>
        </section>

        {/* 3. ВИДЕО ИЗ STRAPI */}
        {data.videos.length > 0 && (
          <section className={styles.sliderSection}>
            <h2 className={styles.sectionTitle}>Видео с праздников</h2>
            <Swiper
              modules={[Navigation, Pagination]}
              // navigation
              pagination={{ clickable: true }}
              spaceBetween={20}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
            >
              {data.videos.map((vid) => (
                <SwiperSlide key={vid.id}>
                  <div
                    className={styles.tariffCard}
                    onClick={() => openModal(vid.url)}
                  >
                    <div className={styles.tariffImageWrap}>
                      <video
                        src={vid.url}
                        className={styles.videoPreviewImage}
                        muted
                      />
                      <div className={styles.playButton}>
                        <MdPlayArrow size={50} />
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </section>
        )}

        {/* 4. ФОТО ИЗ STRAPI */}
        {data.photos.length > 0 && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Фото с праздников</h2>
            <Swiper
              modules={[Navigation, Pagination]}
              // navigation
              pagination={{ clickable: true }}
              spaceBetween={15}
              slidesPerView={1}
              breakpoints={{ 768: { slidesPerView: 3 } }}
            >
              {data.photos.map((p) => (
                <SwiperSlide key={p.id}>
                  <div className={styles.photoCard}>
                    <Image
                      src={p.url}
                      alt="Фото праздника"
                      fill
                      className={styles.shot}
                      unoptimized
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </section>
        )}

        <Reviews />

        {/* 6. ЛОФТЫ ИЗ STRAPI */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Наши лофт-пространства</h2>
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            // navigation
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
                      unoptimized
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

      {/* Модалка для видео */}
      {modalOpen &&
        createPortal(
          <div className={styles.modalOverlay} onClick={closeModal}>
            <div
              className={styles.modalContent}
              onClick={(e) => e.stopPropagation()}
            >
              <video
                ref={videoRef}
                src={selectedVideo}
                controls
                autoPlay
                className={styles.modalVideo}
              />
              <button className={styles.closeBtn} onClick={closeModal}>
                ✕
              </button>
            </div>
          </div>,
          document.body,
        )}
    </main>
  );
}
