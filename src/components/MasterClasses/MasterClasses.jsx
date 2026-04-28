"use client";

import { useEffect, useState } from "react";
import styles from "./MasterClasses.module.scss";
import Link from "next/link";
import { createPortal } from "react-dom";

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

export default function MasterClasses() {
  const [masters, setMasters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMaster, setSelectedMaster] = useState(null);

  useEffect(() => {
    async function fetchMasters() {
      try {
        const res = await fetch(`${STRAPI_URL}/api/master-classes?populate=*`);
        const result = await res.json();
        if (result.data) {
          const formatted = result.data.map((item) => ({
            ...item,
            src: item.thumbnail?.url
              ? `${STRAPI_URL}${item.thumbnail.url}`
              : "/images/placeholder.jpg",
          }));
          setMasters(formatted);
        }
      } catch (err) {
        console.error("Ошибка загрузки мастер-классов:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchMasters();
  }, []);

  const openModal = (master) => {
    setSelectedMaster(master);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMaster(null);
    document.body.style.overflow = "unset";
  };

  if (loading) return null;

  return (
    <section id="master-classes" className={styles.section}>
      <div className={styles.topSection}>
        <div className={styles.imageColumn}>
          <img src="/images/quest/master.png" alt="Мастер-классы" />
        </div>
        <div className={styles.textColumn}>
          <h2 className={styles.title}>Мастер-классы для детей</h2>
          <div className={styles.description}>
            <p>
              Развивающие мастер-классы для детей всех возрастов. Все материалы
              предоставляются.
            </p>
          </div>
          <button className={styles.button}>Все мастер-классы</button>
        </div>
      </div>

      <div className={styles.grid}>
        {masters.map((item) => (
          <div key={item.slug} className={styles.card}>
            <div className={styles.cardImageContainer}>
              <img
                src={item.src}
                alt={item.title}
                className={styles.cardImage}
              />
              <div className={styles.cardOverlay}>
                <button
                  className={styles.viewButton}
                  onClick={() => openModal(item)}
                >
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#333"
                    strokeWidth="2"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                </button>
              </div>
            </div>
            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardDescription}>{item.desc}</p>
              <Link
                href={`/master-classes/${item.slug}`}
                className={styles.cardButton}
              >
                Подробнее
              </Link>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen &&
        selectedMaster &&
        createPortal(
          <div
            className={styles.modalOverlay}
            onClick={(e) => e.target === e.currentTarget && closeModal()}
          >
            <div className={styles.modal}>
              <button className={styles.modalClose} onClick={closeModal}>
                ×
              </button>
              <div className={styles.modalContent}>
                <img
                  src={selectedMaster.src}
                  alt={selectedMaster.title}
                  className={styles.modalImage}
                />
                <div className={styles.modalInfo}>
                  <h3 className={styles.modalTitle}>{selectedMaster.title}</h3>
                  <p className={styles.modalDesc}>{selectedMaster.desc}</p>
                  <button className={styles.modalButton}>Записаться</button>
                </div>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </section>
  );
}
