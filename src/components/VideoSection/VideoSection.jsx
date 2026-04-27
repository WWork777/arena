"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import styles from "./VideoSection.module.scss";
import { createPortal } from "react-dom";

// Базовый URL вашего Strapi
const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

export default function VideoSection() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState("");
  const modalVideoRef = useRef(null);

  // Те самые кнопки из вашего первого варианта
  const buttons = [
    { text: "Аниматоры", icon: "/icons/VideoSection/play.svg" },
    { text: "Шоу", icon: "/icons/VideoSection/play.svg" },
    { text: "Игровые пространства", icon: "/icons/VideoSection/play.svg" },
  ];

  useEffect(() => {
    async function fetchVideos() {
      try {
        const response = await fetch(
          `${STRAPI_URL}/api/hero-videos?populate=*`,
        );
        const result = await response.json();

        if (result.data && Array.isArray(result.data)) {
          const formattedVideos = result.data.map((item) => ({
            id: item.id,
            title: item.title,
            description: item.description,
            thumbnail: item.thumbnail?.[0]?.url
              ? `${STRAPI_URL}${item.thumbnail[0].url}`
              : "",
            videoUrl: item.videoFile?.[0]?.url
              ? `${STRAPI_URL}${item.videoFile[0].url}`
              : "",
          }));
          setVideos(formattedVideos);
        }
      } catch (error) {
        console.error("Ошибка при загрузке видео из Strapi:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchVideos();
  }, []);

  const currentVideo = videos[currentSlide];

  const openModal = () => {
    if (!currentVideo?.videoUrl) return;
    setSelectedVideoUrl(currentVideo.videoUrl);
    setModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    if (modalVideoRef.current) modalVideoRef.current.pause();
    setModalOpen(false);
    setSelectedVideoUrl("");
    document.body.style.overflow = "unset";
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && modalOpen) closeModal();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [modalOpen]);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? videos.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev === videos.length - 1 ? 0 : prev + 1));
  };

  if (loading) return <div className={styles.loader}>Загрузка...</div>;
  if (videos.length === 0) return null;

  return (
    <div className={styles.section} style={{ zIndex: modalOpen ? 99999 : 10 }}>
      <div className={styles.videoCard_wrap}>
        {/* Левая карточка со слайдером (данные из Strapi) */}
        <div className={styles.videoCard}>
          <div className={styles.videoImage} onClick={openModal}>
            <div className={styles.thumbnail}>
              {currentVideo?.thumbnail && (
                <Image
                  src={currentVideo.thumbnail}
                  alt={currentVideo.title || "video"}
                  fill
                  className={styles.image}
                  unoptimized
                />
              )}
              <div className={styles.playButton}>
                <Image
                  src="/icons/VideoSection/play.svg"
                  alt="Play"
                  width={50}
                  height={50}
                  className={styles.playIcon}
                />
              </div>
            </div>
          </div>

          <h3 className={styles.videoTitle}>{currentVideo?.title}</h3>
          <p className={styles.videoDescription}>{currentVideo?.description}</p>

          <div className={styles.navigation}>
            <button className={styles.navArrow} onClick={handlePrevSlide}>
              <Image
                src="/icons/VideoSection/leftYelow.svg"
                alt="Prev"
                width={40}
                height={40}
              />
            </button>

            <div className={styles.pagination}>
              {videos.map((_, index) => (
                <div
                  key={index}
                  className={`${styles.dot} ${index === currentSlide ? styles.active : ""}`}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>

            <button className={styles.navArrow} onClick={handleNextSlide}>
              <Image
                src="/icons/VideoSection/rightYelow.svg"
                alt="Next"
                width={40}
                height={40}
              />
            </button>
          </div>
        </div>

        {/* Правая карточка (ваши кнопки) */}
        <div className={styles.rightCard}>
          {buttons.map((button, index) => (
            <button key={index} className={styles.actionButton}>
              <div className={styles.iconCircle}>
                <Image
                  src={button.icon}
                  alt={button.text}
                  width={35}
                  height={35}
                  className={styles.playIconInCircle}
                />
              </div>
              <span className={styles.buttonText}>{button.text}</span>
            </button>
          ))}
        </div>
      </div>

      <div className={styles.callWrapper}>
        <Link href="tel:+79095431213" className={styles.callButton}>
          Позвонить
        </Link>
      </div>

      {modalOpen &&
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
                src={selectedVideoUrl}
                className={styles.modalVideo}
                controls
                autoPlay
                playsInline
              />
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}
