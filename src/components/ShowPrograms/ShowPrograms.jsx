"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "./ShowPrograms.module.scss";
import Link from "next/link";

export default function ShowPrograms() {
  const INITIAL_COUNT = 6;
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const [activeVideo, setActiveVideo] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMobile, setIsMobile] = useState(false); // Проверка на мобильный экран

  const videoRefs = useRef([]);
  const videoContainerRefs = useRef([]);
  const sectionRef = useRef(null);

  const shows = [
    {
      title: "Блогер Пати",
      slug: "bloger-party",
      desc: "Зажигательная вечеринка в стиле популярных блогеров. Танцы, конкурсы, челленджи и фотосессия. Ваш ребенок почувствует себя настоящей звездой Instagram!",
      video: "/videos/shows/bloger.mp4",
    },
    {
      title: "Венздей Квест",
      slug: "wednesday-quest",
      desc: "Таинственный квест по мотивам популярного сериала. Раскрывайте загадки, ищите улики и погружайтесь в мрачную атмосферу академии Nevermore.",
      video: "/videos/shows/wednesday.mp4",
    },
    {
      title: "Зверо-Квест",
      slug: "zvero-quest",
      desc: "Увлекательное приключение с животными. Детей ждут интересные задания, загадки и знакомство с удивительным миром фауны в игровой форме.",
      video: "/videos/shows/zvero.mp4",
    },
    {
      title: "Игра в Кальмара",
      slug: "squid-game",
      desc: "Адреналиновый квест по мотивам нашумевшего сериала. Безопасные версии популярных игр, командные соревнования и море эмоций для смелых участников.",
      video: "/videos/shows/squidgame.mp4",
    },
    {
      title: "Научное Шоу",
      slug: "science-show",
      desc: "Зрелищные эксперименты и удивительные опыты. Дети увидят химические реакции, физические фокусы и смогут сами поучаствовать в настоящих научных открытиях.",
      video: "/videos/shows/science.mp4",
    },
    {
      title: "Пенная Вечеринка",
      slug: "foam-party",
      desc: "Море пены, музыки и веселья! Дети обожают резвиться в облаках безопасной пены. Яркое и запоминающееся событие для любого праздника.",
      video: "/videos/shows/foam.mov",
    },
    {
      title: "Тесла Шоу",
      slug: "tesla-show",
      desc: "Завораживающее электрическое шоу с катушками Тесла. Молнии, разряды, светящиеся лампы и безопасные эксперименты с высоким напряжением.",
      video: "/videos/shows/tesla.mp4",
    },
    {
      title: "Трансформер Шоу",
      slug: "transformers-show",
      desc: "Встреча с настоящими трансформерами! Роботы-гиганты, сражения, фотосессия и интерактивная программа. Мечта любого ребенка становится реальностью.",
      video: "/videos/shows/transformers.mp4",
    },
    {
      title: "Форт-Квест",
      slug: "fort-boyard-quest",
      desc: 'Командный квест в стиле популярного телешоу "Форт Боярд". Преодоление препятствий, поиск ключей, битва с ветром и неожиданные испытания на ловкость.',
      video: "/videos/loft/magic.mp4",
    },
    {
      title: "Хогвартс-Туса",
      slug: "hogwarts-party",
      desc: "Волшебная вечеринка в стиле Гарри Поттера. Распределение по факультетам, уроки зельеварения, квиддич и настоящая магия для юных волшебников.",
      video: "/videos/shows/hogwarts.mp4",
    },
    {
      title: "Цифровой Цирк",
      slug: "digital-circus",
      desc: "Современное шоу с цифровыми технологиями. Световое шоу, лазеры, проекции и невероятные спецэффекты создают атмосферу будущего на вашем празднике.",
      video: "/videos/shows/digital.mp4",
    },
  ];

  // Проверяем ширину экрана
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize(); // Проверяем при первой загрузке
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
    setVisibleCount(shows.length);
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

  const handleMoreClick = (index) => {
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

  // Если мобильный экран - показываем все карточки. Иначе обрезаем до видимого количества.
  const displayedShows = isMobile ? shows : shows.slice(0, visibleCount);

  return (
    <section id="shows" ref={sectionRef} className={styles.section}>
      <h2 className={styles.title}>Шоу-программы</h2>

      <div className={styles.grid}>
        {displayedShows.map((show, index) => (
          <div key={index} className={styles.card}>
            <div
              className={styles.cardMedia}
              ref={(el) => (videoContainerRefs.current[index] = el)}
            >
              {activeVideo === index ? (
                <video
                  ref={(el) => (videoRefs.current[index] = el)}
                  src={show.video}
                  className={styles.video}
                  playsInline
                  onClick={(e) => handleVideoPlay(index, e)}
                />
              ) : (
                <>
                  <img
                    src="/images/show/show.png"
                    alt={show.title}
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

            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}>{show.title}</h3>
              <p className={styles.cardDescription}>{show.desc}</p>
              <Link href={`/shows/${show.slug}`} className={styles.cardButton}>
                Подробнее
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Кнопка показывается только на десктопе */}
      <div className={styles.ctaWrapper}>
        {visibleCount < shows.length ? (
          <button className={styles.ctaButton} onClick={handleShowMore}>
            Показать все
          </button>
        ) : (
          <button className={styles.ctaButton} onClick={handleHide}>
            Скрыть
          </button>
        )}
      </div>
    </section>
  );
}
