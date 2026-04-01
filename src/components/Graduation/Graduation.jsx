"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "./Graduation.module.scss";
import Link from "next/link";

export default function Graduation() {
  const INITIAL_COUNT = 3;
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const [activeVideo, setActiveVideo] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const videoRefs = useRef([]);
  const videoContainerRefs = useRef([]);
  const sectionRef = useRef(null);

  const graduations = [
    {
      title: "Программа Перемена",
      slug: "peremena",
      desc: "Шоу программа «Перемена» 2 ведущих и диджей, тик-ток тренды...",
      video: "/videos/graduations/peremena.mp4",
    },
    {
      title: "Программа Микс",
      slug: "mix",
      desc: "Шоу программа «Микс» 2 ведущих и диджей, авторская программа...",
      video: "/videos/graduations/mix.mp4",
    },
    {
      title: "Неоновая вечеринка",
      slug: "neon-party",
      desc: "Шоу программа «Микс» 2 ведущих и диджей, мастер класс...",
      video: "/videos/graduations/11176874478315.mp4",
    },
    {
      title: "Форт Боярд",
      slug: "fort-boyard",
      desc: "Шоу программа «Форт Боярд» 2 ведущих и диджей, 10 станций...",
      video: "/videos/graduations/fort.mp4",
    },
    {
      title: "Пенная вечеринка",
      slug: "foam-graduation",
      desc: "Ведущий, пенщик и диджей, море пены, биг волейбол...",
      video: "/videos/graduations/11176875985643.mp4",
    },
  ];

  // Проверка на мобильный экран
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize(); // Проверяем при первой загрузке
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Обработка полноэкранного режима
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  // Обработка событий видео
  useEffect(() => {
    if (activeVideo !== null) {
      const video = videoRefs.current[activeVideo];
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
    }
  }, [activeVideo]);

  const handleShowMore = () => {
    setVisibleCount(graduations.length);
  };

  const handleHide = () => {
    setVisibleCount(INITIAL_COUNT);
    if (activeVideo !== null && activeVideo >= INITIAL_COUNT) {
      if (videoRefs.current[activeVideo]) {
        videoRefs.current[activeVideo].pause();
      }
      setActiveVideo(null);
      setIsPlaying(false);
    }
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const handleMoreClick = (index, e) => {
    e.preventDefault();
    if (activeVideo === index) {
      if (videoRefs.current[index]) {
        videoRefs.current[index].pause();
        setIsPlaying(false);
      }
      setActiveVideo(null);
    } else {
      if (activeVideo !== null && videoRefs.current[activeVideo]) {
        videoRefs.current[activeVideo].pause();
      }
      setActiveVideo(index);
      setIsPlaying(true);
      setTimeout(() => {
        if (videoRefs.current[index]) {
          videoRefs.current[index].play();
        }
      }, 100);
    }
  };

  const handleVideoPlay = (index, e) => {
    e.stopPropagation();
    if (activeVideo !== index) {
      if (activeVideo !== null && videoRefs.current[activeVideo]) {
        videoRefs.current[activeVideo].pause();
      }
      setActiveVideo(index);
      setTimeout(() => {
        if (videoRefs.current[index]) {
          videoRefs.current[index].play();
          setIsPlaying(true);
        }
      }, 100);
    } else {
      if (videoRefs.current[index]) {
        if (isPlaying) {
          videoRefs.current[index].pause();
        } else {
          videoRefs.current[index].play();
        }
        setIsPlaying(!isPlaying);
      }
    }
  };

  const handleFullscreen = async (index, e) => {
    e.stopPropagation();
    const container = videoContainerRefs.current[index];
    if (!container) return;

    if (!document.fullscreenElement) {
      try {
        await container.requestFullscreen();
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

  // Если телефон - выводим все карточки (для свайп-слайдера), иначе обрезаем
  const displayedGraduations = isMobile
    ? graduations
    : graduations.slice(0, visibleCount);

  return (
    <section id="graduation" ref={sectionRef} className={styles.section}>
      <div className={styles.topSection}>
        <div className={styles.imageColumn}>
          <Image
            src="/images/quest/dembel.png"
            alt="Выпускной"
            width={600}
            height={600}
            className={styles.mainImage}
          />
        </div>
        <div className={styles.textColumn}>
          <h2 className={styles.title}>Выпускной</h2>
          <div className={styles.description}>
            <p>
              Организация незабываемых выпускных для детских садов и начальной
              школы. Мы создаем праздничную атмосферу и делаем этот день
              особенным.
            </p>
            <p>
              Наши программы включают торжественную часть, развлекательную
              программу, фотозону и все необходимое для проведения выпускного.
            </p>
            <p>
              Мы поможем организовать выпускной, который запомнится детям и
              родителям на долгие годы.
            </p>
          </div>
          <button className={styles.button}>Подробнее</button>
        </div>
      </div>

      <div className={styles.grid}>
        {displayedGraduations.map((item, index) => (
          <div key={index} className={styles.card}>
            <div
              className={styles.cardMedia}
              ref={(el) => (videoContainerRefs.current[index] = el)}
            >
              {activeVideo === index ? (
                <video
                  ref={(el) => (videoRefs.current[index] = el)}
                  src={item.video}
                  className={styles.video}
                  playsInline
                  onClick={(e) => handleVideoPlay(index, e)}
                />
              ) : (
                <>
                  <Image
                    src="/images/quest/dembel.png"
                    alt={item.title}
                    fill
                    className={styles.cardImage}
                  />
                  <div
                    className={styles.playButtonConstant}
                    onClick={(e) => handleVideoPlay(index, e)}
                  >
                    <Image
                      src="/icons/VideoSection/play.svg"
                      alt="Play"
                      width={50}
                      height={50}
                      className={styles.playIcon}
                    />
                  </div>
                </>
              )}

              {activeVideo === index && (
                <button
                  className={styles.fullscreenButton}
                  onClick={(e) => handleFullscreen(index, e)}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                    <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
                  </svg>
                </button>
              )}
            </div>

            {/* Обертка контента, чтобы кнопка всегда прижималась к низу */}
            <div className={styles.cardContent}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>{item.title}</h3>
              </div>
              <p className={styles.cardDescription}>{item.desc}</p>
              <Link
                href={`/graduation/${item.slug}`}
                className={styles.cardButton}
              >
                Подробнее
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.ctaWrapper}>
        {visibleCount < graduations.length ? (
          <button className={styles.ctaButton} onClick={handleShowMore}>
            Показать все
          </button>
        ) : (
          <button className={styles.ctaButton} onClick={handleHide}>
            Скрыть
          </button>
        )}
      </div>

      <Link href="#loft" className={styles.link}>
        Наши лофт-пространства для Выпускного
      </Link>
    </section>
  );
}
