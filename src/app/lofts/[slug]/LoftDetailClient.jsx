"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { MdPlayArrow, MdArrowBack } from "react-icons/md";
import Reviews from "@/components/Reviews/Reviews";
import RelatedLofts from "./RelatedLofts";
import Link from "next/link";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import styles from "./LoftDetail.module.scss";

export default function LoftDetailClient({ loft, otherLofts }) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeVideoUrl, setActiveVideoUrl] = useState("");
  const modalVideoRef = useRef(null);

  const openModal = (url) => {
    setActiveVideoUrl(url);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    if (modalVideoRef.current) modalVideoRef.current.pause();
    setIsModalOpen(false);
    document.body.style.overflow = "unset";
  };

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

        {/* ОСНОВНОЕ ИНФО */}
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
            <Link href={"https://max.ru/u/f9LHodD0cOJaFVvW9nUbeGO6KyU4YV4ECO1_CYWK8Iel22tTaDmxsz4THJA"}
              className={styles.requestButton}
              style={{ backgroundColor: loft.color }}
              >
              Забронировать
            </Link>
          </div>
        </section>

        {/* ГЛАВНОЕ ВИДЕО */}
        <section className={styles.videoSection}>
          <h2 className={styles.sectionTitle}>Видео о зале</h2>
          <div
            className={styles.videoPreviewCard}
            onClick={() => openModal(loft.video)}
          >
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

        {/* 1. СЛАЙДЕР ТАРИФОВ (КАРТИНКИ) */}
        {loft.tariffs?.length > 0 && (
          <section className={styles.sliderSection}>
            <h2 className={styles.sectionTitle}>Выгодные тарифы</h2>
            <Swiper
              modules={[Navigation, Pagination]}
              navigation
              pagination={{ clickable: true }}
              spaceBetween={20}
              slidesPerView={1}
              breakpoints={{
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
            >
              {loft.tariffs.map((img) => (
                <SwiperSlide key={img.id}>
                  <div className={styles.photoCard}>
                    <Image
                      src={img.url}
                      alt="Тариф"
                      fill
                      className={styles.slideImage}
                      unoptimized
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </section>
        )}

        {/* 2. СЛАЙДЕР ВИДЕО С ПРАЗДНИКОВ */}
        {loft.videos?.length > 0 && (
          <section className={styles.sliderSection}>
            <h2 className={styles.sectionTitle}>Видео с праздников</h2>
            <Swiper
              modules={[Navigation, Pagination]}
              navigation
              pagination={{ clickable: true }}
              spaceBetween={20}
              slidesPerView={1}
              breakpoints={{
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
            >
              {loft.videos.map((vid) => (
                <SwiperSlide key={vid.id}>
                  <div
                    className={styles.tariffCard}
                    onClick={() => openModal(vid.url)}
                  >
                    <div className={styles.tariffImageWrap}>
                      <video
                        src={vid.url}
                        className={styles.slideImage_video}
                        muted
                      />
                      <div className={styles.playButton}>
                        <MdPlayArrow size={30} />
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </section>
        )}

        {/* 3. СЛАЙДЕР ФОТО С ПРАЗДНИКОВ */}
        {loft.photos?.length > 0 && (
          <section className={styles.sliderSection}>
            <h2 className={styles.sectionTitle}>Фото с праздников</h2>
            <Swiper
              modules={[Navigation, Pagination]}
              navigation
              pagination={{ clickable: true }}
              spaceBetween={20}
              slidesPerView={1}
              breakpoints={{
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
            >
              {loft.photos.map((photo) => (
                <SwiperSlide key={photo.id}>
                  <div className={styles.photoCard}>
                    <Image
                      src={photo.url}
                      alt="Фото"
                      fill
                      className={styles.slideImage}
                      unoptimized
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </section>
        )}

        <Reviews />
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
                src={activeVideoUrl}
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
