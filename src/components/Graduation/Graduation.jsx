"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "./Graduation.module.scss";
import Link from "next/link";
import { createPortal } from "react-dom";

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

export default function Graduation() {
  const INITIAL_COUNT = 3;
  const [graduations, setGraduations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const [isMobile, setIsMobile] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState("");
  const videoRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    async function fetchGraduations() {
      try {
        const res = await fetch(`${STRAPI_URL}/api/graduations?populate=*`);
        const result = await res.json();
        if (result.data) {
          const formatted = result.data.map((item) => ({
            title: item.title,
            slug: item.slug,
            desc: item.desc,
            video: item.video?.url ? `${STRAPI_URL}${item.video.url}` : "",
          }));
          setGraduations(formatted);
        }
      } catch (err) {
        console.error("Ошибка загрузки выпускных:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchGraduations();

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
    if (videoRef.current) videoRef.current.pause();
    setModalOpen(false);
    setSelectedVideoUrl("");
  };

  const handleShowMore = () => setVisibleCount(graduations.length);
  const handleHide = () => {
    setVisibleCount(INITIAL_COUNT);
    sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (loading) return null;

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
              школы.
            </p>
          </div>
          <button className={styles.button}>Подробнее</button>
        </div>
      </div>

      <div className={styles.grid}>
        {displayedGraduations.map((item) => (
          <div key={item.slug} className={styles.card}>
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
              <h3 className={styles.cardTitle}>{item.title}</h3>
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

      {graduations.length > INITIAL_COUNT && (
        <div className={styles.ctaWrapper}>
          <button
            className={styles.ctaButton}
            onClick={
              visibleCount < graduations.length ? handleShowMore : handleHide
            }
          >
            {visibleCount < graduations.length ? "Показать все" : "Скрыть"}
          </button>
        </div>
      )}

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
