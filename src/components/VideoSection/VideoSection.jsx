"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import styles from "./VideoSection.module.scss";

export default function VideoSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const videoRef = useRef(null);
  const videoContainerRef = useRef(null);

  const videos = [
    {
      id: 1,
      thumbnail:
        "/images/VideoSection/8e4171cb71b178f4572b70cc5b6317c802ef0e04.png",
      videoUrl: "/videos/video3.mov",
      title: "Видео о нас",
      description: "Такие яркие праздники можно получить только у нас",
    },
    {
      id: 2,
      thumbnail:
        "/images/VideoSection/8e4171cb71b178f4572b70cc5b6317c802ef0e04.png",
      videoUrl: "/videos/video1.mp4",
      title: "Наши аниматоры",
      description: "Профессиональные аниматоры для детских праздников",
    },
    {
      id: 3,
      thumbnail:
        "/images/VideoSection/8e4171cb71b178f4572b70cc5b6317c802ef0e04.png",
      videoUrl: "/videos/video2.mov",
      title: "Шоу программы",
      description: "Незабываемые шоу для ваших детей",
    },
    {
      id: 4,
      thumbnail:
        "/images/VideoSection/8e4171cb71b178f4572b70cc5b6317c802ef0e04.png",
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

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
      videoRef.current.load();
    }
  }, [currentSlide]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);

    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);
    video.addEventListener("ended", handleEnded);

    return () => {
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("ended", handleEnded);
    };
  }, [currentSlide]);

  const handlePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleFullscreen = async () => {
    if (!document.fullscreenElement && videoContainerRef.current) {
      try {
        await videoContainerRef.current.requestFullscreen();
        setIsFullscreen(true);
      } catch (err) {
        console.error("Ошибка при переходе в полноэкранный режим:", err);
      }
    } else {
      try {
        await document.exitFullscreen();
        setIsFullscreen(false);
      } catch (err) {
        console.error("Ошибка при выходе из полноэкранного режима:", err);
      }
    }
  };

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
        {/* Белая карточка с видео */}
        <div className={styles.videoCard}>
          <div className={styles.videoImage} ref={videoContainerRef}>
            <video
              ref={videoRef}
              className={styles.video}
              src={currentVideo.videoUrl}
              poster={currentVideo.thumbnail}
              onClick={handlePlay}
              controls={false}
              playsInline
            />

            {!isPlaying && (
              <div className={styles.thumbnail} onClick={handlePlay}>
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
            )}

            {isPlaying && (
              <button
                className={styles.fullscreenButton}
                onClick={handleFullscreen}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                  <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
                </svg>
              </button>
            )}
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
    </div>
  );
}
