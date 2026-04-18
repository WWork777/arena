"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import styles from "./VideoSection.module.scss";

export default function VideoSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState("");
  const modalVideoRef = useRef(null);

  const videos = [
    {
      id: 1,
      thumbnail: "/images/VideoSection/8e4171cb71b178f4572b70cc5b6317c802ef0e04.png",
      videoUrl: "/videos/video3.mov",
      title: "Видео о нас",
      description: "Такие яркие праздники можно получить только у нас",
    },
    {
      id: 2,
      thumbnail: "/images/VideoSection/8e4171cb71b178f4572b70cc5b6317c802ef0e04.png",
      videoUrl: "/videos/video1.mp4",
      title: "Наши аниматоры",
      description: "Профессиональные аниматоры для детских праздников",
    },
    {
      id: 3,
      thumbnail: "/images/VideoSection/8e4171cb71b178f4572b70cc5b6317c802ef0e04.png",
      videoUrl: "/videos/video2.mov",
      title: "Шоу программы",
      description: "Незабываемые шоу для ваших детей",
    },
    {
      id: 4,
      thumbnail: "/images/VideoSection/8e4171cb71b178f4572b70cc5b6317c802ef0e04.png",
      videoUrl: "/videos/video3.mov",
      title: "Игровые пространства",
      description: "Уникальные игровые зоны для праздников",
    },
  ];

  const buttons = [
    { text: "Аниматоры", icon: "/icons/VideoSection/play.svg" },
    { text: "Шоу", icon: "/icons/VideoSection/play.svg" },
    { text: "Игровые пространства", icon: "/icons/VideoSection/play.svg" },
  ];

  const currentVideo = videos[currentSlide];

  // Открытие модалки с видео
  const openModal = () => {
    setSelectedVideoUrl(currentVideo.videoUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    if (modalVideoRef.current) {
      modalVideoRef.current.pause();
      modalVideoRef.current.currentTime = 0;
    }
    setModalOpen(false);
    setSelectedVideoUrl("");
  };

  // Автовоспроизведение при открытии модалки
  useEffect(() => {
    if (modalOpen && modalVideoRef.current) {
      modalVideoRef.current.play().catch((err) => {
        console.warn("Автовоспроизведение заблокировано:", err);
      });
    }
  }, [modalOpen]);

  // Закрытие по Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && modalOpen) closeModal();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [modalOpen]);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? videos.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev === videos.length - 1 ? 0 : prev + 1));
  };

  const handleDotClick = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className={styles.section}>
      <div className={styles.videoCard_wrap}>
        {/* Белая карточка с видео (только превью) */}
        <div className={styles.videoCard}>
          <div className={styles.videoImage}>
            {/* Превью с кнопкой play */}
            <div className={styles.thumbnail} onClick={openModal}>
              <Image
                src={currentVideo.thumbnail}
                alt={currentVideo.title}
                fill
                className={styles.image}
              />
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

          <h3 className={styles.videoTitle}>{currentVideo.title}</h3>
          <p className={styles.videoDescription}>{currentVideo.description}</p>

          {/* Навигация (Стрелки + Точки) */}
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
                  onClick={() => handleDotClick(index)}
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

        {/* Розовая карточка справа */}
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

      {/* Кнопка "Позвонить" */}
      <div className={styles.callWrapper}>
        <Link href="tel:+79095431213" className={styles.callButton}>
          Позвонить
        </Link>
      </div>

      {/* Модальное окно с видео */}
      {modalOpen && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
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
        </div>
      )}
    </div>
  );
}