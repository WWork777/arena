"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "./Graduation.module.scss";
import Link from "next/link";

export default function Graduation() {
  const INITIAL_COUNT = 3;
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const [isMobile, setIsMobile] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState("");
  const videoRef = useRef(null);
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

  // Автовоспроизведение при открытии
  useEffect(() => {
    if (modalOpen && videoRef.current) {
      videoRef.current.play().catch((err) => console.warn(err));
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

  const handleShowMore = () => setVisibleCount(graduations.length);
  const handleHide = () => {
    setVisibleCount(INITIAL_COUNT);
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const displayedGraduations = isMobile ? graduations : graduations.slice(0, visibleCount);

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
            <div className={styles.cardMedia}>
              <Image
                src="/images/quest/dembel.png"
                alt={item.title}
                fill
                className={styles.cardImage}
              />
              <div
                className={styles.playButtonConstant}
                onClick={() => openModal(item.video)}
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