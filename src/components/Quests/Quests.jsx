"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import styles from "./Quests.module.scss";
import Link from "next/link";
import { createPortal } from "react-dom";
import { MdLocationOn } from "react-icons/md";
const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

export default function Quests() {
  const [quests, setQuests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedVideoUrl, setSelectedVideoUrl] = useState("");
    const videoRef = useRef(null);

  useEffect(() => {
    async function fetchQuests() {
      try {
        const res = await fetch(`${STRAPI_URL}/api/quests?populate=*`);
        const result = await res.json();

        if (result.data) {
          const formatted = result.data.map((item) => ({
            title: item.title,
            slug: item.slug,
            thumbnail: item.thumbnail?.url
              ? `${STRAPI_URL}${item.thumbnail.url}`
              : "/images/quest/quest.png",
            video: item.video?.url ? `${STRAPI_URL}${item.video.url}` : "",
            Adres: item.Adres,
          }));
          setQuests(formatted);
        }
      } catch (err) {
        console.error("Ошибка загрузки квестов:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchQuests();
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

  if (loading) return null;

  return (
    <section id="quests" className={styles.section}>
      <div className={styles.topSection}>
        <div className={styles.imageColumn}>
          <Image
            src="/images/quest/quest.png"
            alt="Квесты для детей"
            width={600}
            height={600}
            className={styles.mainImage}
          />
        </div>
        <div className={styles.textColumn}>
          <h2 className={styles.title}>Квесты для детей</h2>
          <div className={styles.description}>
            <p>
              Увлекательные квесты для детей разных возрастов. Наши программы
              развивают логическое мышление, командный дух и творческие
              способности.
            </p>
            <p>
              Каждый квест имеет уникальный сюжет и интересные задания. Дети
              погружаются в захватывающие приключения, решают головоломки и
              проходят испытания.
            </p>
          </div>
          <Link href={"https://max.ru/u/f9LHodD0cOJaFVvW9nUbeGO6KyU4YV4ECO1_CYWK8Iel22tTaDmxsz4THJA"} className={styles.button}>Заказать</Link>
        </div>
      </div>

      <div className={styles.grid}>
        {quests.map((quest) => (
          <div key={quest.slug} className={styles.card}>
            <div className={styles.cardMedia}>
              
              <Image
                src={quest.thumbnail}
                alt={quest.title}
                fill
                className={styles.cardImage}
                unoptimized
              />
                            <div
                className={styles.playButtonConstant}
                onClick={() => openModal(quest.video)}
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
              <div className={styles.relatedCategory}>
                <MdLocationOn /> {quest.Adres}
              </div>
              <h3 className={styles.cardTitle}>{quest.title}</h3>
              <Link
                className={styles.cardButton}
                href={`/quests/${quest.slug}`}
              >
                Подробнее
              </Link>
            </div>
          </div>
        ))}
      </div>
      <a href="#loft" className={styles.link}>
        Наши лофт-пространства для Квестов
      </a>
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
