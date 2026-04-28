"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { MdPlayArrow, MdArrowBack, MdTrendingUp } from "react-icons/md";
import Reviews from "@/components/Reviews/Reviews";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import styles from "./styles.module.scss";

export default function QuestDetailClient({ quest, otherQuests }) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState(quest.video);
  const modalVideoRef = useRef(null);

  const openModal = (videoUrl) => {
    setActiveVideo(videoUrl || quest.video);
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
          <h1 className={styles.mainTitle}>{quest.title}</h1>
          <p className={styles.subtitle}>{quest.subtitle}</p>
        </header>

        <section className={styles.infoBlock}>
          <div className={styles.imageContent}>
            <Image
              src={quest.thumbnail}
              alt={quest.title}
              fill
              className={styles.mainImage}
              unoptimized
            />
          </div>
          <div className={styles.textContent}>
            <h2>О квесте</h2>
            <p className={styles.description}>{quest.desc}</p>
            <ul className={styles.featuresList}>
              {quest.features?.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
            <button
              className={styles.requestButton}
              style={{ backgroundColor: quest.color }}
            >
              Заказать
            </button>
          </div>
        </section>

        {/* Слайдер ВИДЕО */}
        {quest.videos?.length > 0 && (
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
              {quest.videos.map((vid) => (
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

        {/* Слайдер ФОТО */}
        {quest.photos?.length > 0 && (
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
              {quest.photos.map((photo) => (
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

        {/* Смотрите также */}
        <section className={styles.related}>
          <div className={styles.relatedContainer}>
            <h2 className={styles.relatedTitle}>Смотрите также</h2>
            <div className={styles.relatedGrid}>
              {otherQuests.map((item) => (
                <Link
                  href={`/quests/${item.slug}`}
                  key={item.slug}
                  className={styles.relatedCard}
                >
                  <div className={styles.relatedVideoWrap}>
                    <video
                      src={item.video}
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
                    <div className={styles.ageBadge}>{item.age}</div>
                  </div>
                  <div className={styles.relatedInfo}>
                    <div className={styles.relatedCategory}>
                      <MdTrendingUp /> Популярное
                    </div>
                    <h4 className={styles.relatedCardTitle}>{item.title}</h4>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <Reviews />
        <section className={styles.actionSection}>
          <button className={styles.requestButton}>Оставить заявку</button>
        </section>
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
