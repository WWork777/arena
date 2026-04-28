"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "./ShowPrograms.module.scss";
import Link from "next/link";
import { createPortal } from "react-dom";

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

export default function ShowPrograms() {
  const INITIAL_COUNT = 6;
  const [shows, setShows] = useState([]);
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState("");
  const videoRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    async function fetchShows() {
      try {
        const res = await fetch(`${STRAPI_URL}/api/shows?populate=*`);
        const result = await res.json();
        if (result.data) {
          const formatted = result.data.map((item) => ({
            title: item.title,
            slug: item.slug,
            desc: item.desc,
            // В Strapi 5 для Single Media берем url напрямую из объекта
            thumbnail: item.thumbnail?.url
              ? `${STRAPI_URL}${item.thumbnail.url}`
              : "/images/show/show.png",
            video: item.video?.url ? `${STRAPI_URL}${item.video.url}` : "",
          }));
          setShows(formatted);
        }
      } catch (err) {
        console.error("Ошибка загрузки шоу:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchShows();

    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const openModal = (videoUrl) => {
    if (!videoUrl) return;
    setSelectedVideoUrl(videoUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    if (videoRef.current) videoRef.current.pause();
    setModalOpen(false);
    setSelectedVideoUrl("");
  };

  const handleShowMore = () => setVisibleCount(shows.length);
  const handleHide = () => {
    setVisibleCount(INITIAL_COUNT);
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (loading) return null;

  const displayedShows = isMobile ? shows : shows.slice(0, visibleCount);

  return (
    <section id="shows" ref={sectionRef} className={styles.section}>
      <h2 className={styles.title}>Шоу-программы</h2>
      <div className={styles.grid}>
        {displayedShows.map((show, index) => (
          <div key={index} className={styles.card}>
            <div className={styles.cardMedia}>
              <img
                src={show.thumbnail}
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
                ref={videoRef}
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
    </section>
  );
}
