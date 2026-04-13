"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  MdArrowBack,
  MdCheckCircle,
  MdGroups,
  MdSettingsInputComponent,
  MdRestaurant,
  MdLocalPhone,
} from "react-icons/md";
import VideoWithLoader from "./VideoPlayer";
import RelatedLofts from "./RelatedLofts";
import styles from "./LoftDetail.module.scss";

export default function LoftDetailClient({ loft, otherLofts }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalVideoRef = useRef(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    if (modalVideoRef.current) {
      modalVideoRef.current.pause();
      modalVideoRef.current.currentTime = 0;
    }
    setIsModalOpen(false);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isModalOpen) closeModal();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen]);

  return (
    <>
      <main className={styles.wrapper}>
        <nav className={styles.topNav}>
          <Link href="/#loft" className={styles.backLink}>
            <MdArrowBack /> Назад
          </Link>
        </nav>

        <div className={styles.container}>
          <section className={styles.info}>
            <div className={styles.head}>
              <span className={styles.badge} style={{ backgroundColor: loft.color }}>
                Пространство
              </span>
              <h1 className={styles.name}>{loft.title}</h1>
              <p className={styles.subtitle}>{loft.subtitle}</p>
            </div>
            <p className={styles.description}>{loft.desc}</p>
            <div className={styles.features}>
              <h3>Что внутри:</h3>
              <div className={styles.featureGrid}>
                {loft.features.map((item, i) => (
                  <div key={i} className={styles.featureItem}>
                    <MdCheckCircle style={{ color: loft.color }} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.actions}>
              <Link href="tel:+79095431213" className={styles.mainCta} style={{ backgroundColor: loft.color }}>
                <MdLocalPhone /> Забронировать лофт
              </Link>
            </div>
          </section>

          <section className={styles.visual}>
            <div className={styles.videoCard}>
              <VideoWithLoader
                src={loft.video}
                className={styles.video}
                onVideoClick={openModal}
              />
              <div className={styles.videoOverlay}></div>
            </div>
          </section>
        </div>

        <section className={styles.detailsGrid}>
          <div className={styles.detailCard}>
            <MdGroups className={styles.detailIcon} style={{ color: loft.color }} />
            <h4>Вместимость</h4>
            <p>{loft.capacity}</p>
          </div>
          <div className={styles.detailCard}>
            <MdSettingsInputComponent className={styles.detailIcon} style={{ color: loft.color }} />
            <h4>Оборудование</h4>
            <p>{loft.equipment}</p>
          </div>
          <div className={styles.detailCard}>
            <MdRestaurant className={styles.detailIcon} style={{ color: loft.color }} />
            <h4>Еда и напитки</h4>
            <p>{loft.food}</p>
          </div>
        </section>

        <RelatedLofts lofts={otherLofts} />
      </main>

      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeButton} onClick={closeModal}>✕</button>
            <video
              ref={modalVideoRef}
              src={loft.video}
              className={styles.modalVideo}
              controls
              autoPlay
              playsInline
            />
          </div>
        </div>
      )}
    </>
  );
}