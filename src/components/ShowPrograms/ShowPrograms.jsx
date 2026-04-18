"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "./ShowPrograms.module.scss";
import Link from "next/link";

export default function ShowPrograms() {
  const INITIAL_COUNT = 6;
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const [isMobile, setIsMobile] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState("");
  const videoRef = useRef(null);
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

  // Определяем мобильный экран
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const openModal = (videoUrl) => {
    setSelectedVideoUrl(videoUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    setModalOpen(false);
    setSelectedVideoUrl("");
  };

  useEffect(() => {
    if (modalOpen && videoRef.current) {
      videoRef.current.play().catch((err) => console.warn(err));
    }
  }, [modalOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && modalOpen) closeModal();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [modalOpen]);

  const handleShowMore = () => setVisibleCount(shows.length);
  const handleHide = () => {
    setVisibleCount(INITIAL_COUNT);
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const displayedShows = isMobile ? shows : shows.slice(0, visibleCount);

  return (
    <section id="shows" ref={sectionRef} className={styles.section}>
      <h2 className={styles.title}>Шоу-программы</h2>

      <div className={styles.grid}>
        {displayedShows.map((show, index) => (
          <div key={index} className={styles.card}>
            <div className={styles.cardMedia}>
              <img
                src="/images/show/show.png"
                alt={show.title}
                className={styles.cardImage}
              />
              <div
                className={styles.playButtonConstant}
                onClick={() => openModal(show.video)}
              >
                <Image
                  src="/icons/VideoSection/play.svg"
                  alt="Play"
                  width={50}
                  height={50}
                  className={styles.playIcon}
                />
              </div>
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

      {/* Модальное окно (как в LoftSpaces) */}
      {modalOpen && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeButton} onClick={closeModal}>
              ✕
            </button>
            <video
              ref={videoRef}
              src={selectedVideoUrl}
              className={styles.modalVideo}
              controls
              autoPlay
              playsInline
            />
          </div>
        </div>
      )}
    </section>
  );
}