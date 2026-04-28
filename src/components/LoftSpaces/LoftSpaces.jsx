"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import styles from "./LoftSpaces.module.scss";
import Link from "next/link";
import { createPortal } from "react-dom";

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

export default function LoftSpaces() {
  const [lofts, setLofts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState("");
  const videoRef = useRef(null);

  useEffect(() => {
    async function fetchLofts() {
      try {
        const res = await fetch(`${STRAPI_URL}/api/lofts?populate=*`);
        const result = await res.json();

        if (result.data) {
          const formatted = result.data.map((item) => ({
            slug: item.slug,
            title: item.title,
            desc: item.description,
            // Берем первый элемент из массива медиа
            image: item.image?.url
              ? `${STRAPI_URL}${item.image.url}`
              : "/placeholder.png",
            video: item.video?.url ? `${STRAPI_URL}${item.video.url}` : "",
          }));
          setLofts(formatted);
        }
      } catch (e) {
        console.error("Ошибка загрузки лофтов:", e);
      } finally {
        setLoading(false);
      }
    }
    fetchLofts();
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

  if (loading || lofts.length === 0) return null;

  return (
    <section id="loft" className={styles.section}>
      <h2 className={styles.title}>Наши лофт-пространства</h2>
      <div className={styles.grid}>
        {lofts.map((loft) => (
          <div key={loft.slug} className={styles.card}>
            <div className={styles.cardMedia}>
              <img
                src={loft.image}
                alt={loft.title}
                className={styles.cardImage}
              />
              <div
                className={styles.playButtonConstant}
                onClick={() => openModal(loft.video)}
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
              <h3 className={styles.cardTitle}>{loft.title}</h3>
              <p className={styles.cardDescription}>{loft.desc}</p>
              <Link href={`/lofts/${loft.slug}`} className={styles.cardButton}>
                Подробнее
              </Link>
            </div>
          </div>
        ))}
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
