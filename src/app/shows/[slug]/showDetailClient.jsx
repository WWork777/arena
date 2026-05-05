"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { MdPlayArrow, MdArrowBack, MdTimer, MdPeople } from "react-icons/md";
import Reviews from "@/components/Reviews/Reviews";
import RelatedShows from "./RelatedShows";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import styles from "./ShowDetail.module.scss";

export default function ShowDetailClient({ show, allShows }) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState(show.video);
  const modalVideoRef = useRef(null);

  const openModal = (videoUrl) => {
    setActiveVideo(videoUrl || show.video);
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
          <h1 className={styles.mainTitle}>{show.title}</h1>
          <p className={styles.subtitle}>{show.subtitle}</p>
        </header>

        <section className={styles.infoBlock}>
          <div className={styles.imageContent}>
            <Image
              src={show.thumbnail}
              alt={show.title}
              fill
              className={styles.mainImage}
              unoptimized
            />
          </div>
          <div className={styles.textContent}>
            <h2>О программе</h2>
            <p className={styles.description}>{show.desc}</p>
            <ul className={styles.featuresList}>
              {show.features?.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
            <div className={styles.stats}>
              <span>
                <MdTimer /> {show.duration}
              </span>
              <span>
                <MdPeople /> {show.age}
              </span>
            </div>
            <Link
              href={"https://max.ru/u/f9LHodD0cOJaFVvW9nUbeGO6KyU4YV4ECO1_CYWK8Iel22tTaDmxsz4THJA"}
              className={styles.requestButton}
              style={{ backgroundColor: show.color }}
            >
              Заказать
            </Link>
          </div>
        </section>

        {/* Слайдер ВИДЕО из Strapi */}
        {show.videos?.length > 0 && (
          <section className={styles.sliderSection}>
            <h2 className={styles.sectionTitle}>Видео с праздников</h2>
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
              {show.videos.map((vid) => (
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

        {/* Слайдер ФОТО из Strapi */}
        {show.photos?.length > 0 && (
          <section className={styles.sliderSection}>
            <h2 className={styles.sectionTitle}>Фото с праздников</h2>
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
              {show.photos.map((photo) => (
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

        <RelatedShows currentSlug={show.slug} allShows={allShows} />
        <Reviews />
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
                src={activeVideo}
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
