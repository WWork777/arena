"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "./LoftSpaces.module.scss";
import Link from "next/link";
import { createPortal } from "react-dom";
export default function LoftSpaces() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState("");
  const videoRef = useRef(null);

  const lofts = {
    arena: {
      title: "Арена Лофт",
      subtitle: "Технологичное пространство для современных школьников",
      desc: "Арена Лофт — это ответ на вопрос 'куда вести ребенка, который вырос из обычных игровых?'. Мы создали стильную, почти 'взрослую' атмосферу, где электроника сочетается с активным движением. Здесь не будет скучно даже самым требовательным подросткам.",
      features: [
        "Интерактивная стена с десятками игр",
        "Зона X-Box с последними новинками",
        "Большой профессиональный батут",
        "Профессиональное музыкальное оборудование",
      ],
      image: "/images/loft/loft.png",
      video: "/videos/loft/arena.mp4",
      color: "#ae305e",
      capacity: "до 25 гостей",
      equipment: "Звук 2кВт, Световое шоу, Лазеры",
      food: "Своя еда разрешена (без пробкового сбора)",
    },
    konfetti: {
      title: "Конфетти Лофт",
      subtitle: "Уютный и безопасный мир для самых маленьких",
      desc: "Пространство 'Конфетти' наполнено светом и нежностью. Мы продумали всё до мелочей, чтобы малыши от 1 года до 6 лет чувствовали себя комфортно, а родители могли спокойно отдохнуть в зоне видимости своих детей.",
      features: [
        "Огромный сухой бассейн с шариками",
        "Безопасная горка и мини-батут",
        "Грифельная стена для рисования мелом",
        "Много развивающих монтессори-игрушек",
      ],
      image: "/images/loft/loft.png",
      video: "/videos/loft/konfetti.mp4",
      color: "#13a7e9",
      capacity: "до 20 гостей",
      equipment: "Детская караоке-система, СВЧ, Чайник",
      food: "Есть кухонная зона для сервировки",
    },
    magic: {
      title: "Магический лофт",
      subtitle: "Территория драйва и настоящих приключений",
      desc: "Главная фишка этого лофта — масштаб. Если ваш ребенок обожает движение, лабиринты и гонки, то Магический лофт станет его любимым местом. Это полноценный парк развлечений, который на время праздника принадлежит только вам.",
      features: [
        "Настоящий детский картинг с машинками",
        "Двухуровневый лабиринт с препятствиями",
        "Две скоростные горки и бассейн",
        "Спортивный батут для прыжков",
      ],
      image: "/images/loft/loft.png",
      video: "/videos/loft/Магический Лофт.mp4",
      color: "#f2c81c",
      capacity: "до 35 гостей",
      equipment: "Телевизор 65', Акустика, Кондиционер",
      food: "Отдельная фуршетная зона для детей и взрослых",
    },
    marmelad: {
      title: "Мармеладный дом",
      subtitle: "Эстетика, уют и дзен среди праздничного движа",
      desc: "Нежный лофт для тех, кто ценит красоту и комфорт. Здесь можно устроить стильную фотосессию, пока дети резвятся на карусели. Идеальное место для семейных праздников, где важно внимание к деталям и общая атмосфера уюта.",
      features: [
        "Интерьерная карусель для детей",
        "Подвесные кресла-коконы для отдыха",
        "Бесплатный аэрохоккей для всех гостей",
        "Несколько дизайнерских фотозон",
      ],
      image: "/images/loft/loft.png",
      video: "/videos/loft/marmelad.mp4",
      color: "#d73973",
      capacity: "до 25 гостей",
      equipment: "Кофемашина, Праздничная посуда, Bluetooth-колонки",
      food: "Помогаем с заказом кейтеринга",
    },
    partyhall: {
      title: "Патихолл",
      subtitle: "Самое большое пространство для грандиозных событий",
      desc: "Патихолл — это лофт-гигант. Мы разделили его на функциональные зоны так, чтобы взрослые могли наслаждаться банкетом, а дети — активными играми в соседнем зале под присмотром. Здесь хватит места даже для самого масштабного шоу.",
      features: [
        "Отдельный зал для праздничного застолья",
        "Зона с виртуальной реальностью (VR)",
        "Большой лабиринт и картинг",
        "Тайная комната с консолями",
      ],
      image: "/images/loft/loft.png",
      video: "/videos/loft/partyhall.mp4",
      color: "#ae305e",
      capacity: "до 50 гостей",
      equipment: "Проектор, Профессиональный свет, VR-шлемы",
      food: "Полноценная кухонная зона, холодильник",
    },
    flint: {
      title: "Флинт",
      subtitle: "Дух приключений и морских открытий",
      desc: "Лофт 'Флинт' — это место для маленьких первооткрывателей. Просторный зал с активными игровыми элементами позволяет реализовать любой сценарий: от пиратского квеста до чемпионата по гонкам на картинге.",
      features: [
        "Детский автодром (картинг)",
        "Огромный игровой лабиринт",
        "Просторная зона для анимационной программы",
        "Тематический дизайн интерьера",
      ],
      image: "/images/loft/loft.png",
      video: "/videos/loft/magic.mp4",
      color: "#3ab5ad",
      capacity: "до 30 гостей",
      equipment: "Микрофоны, Звуковая система, Спецэффекты",
      food: "Большой стол для детского чаепития",
    },
  };

  const closeModal = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    setModalOpen(false);
    setSelectedVideoUrl("");
  };

  const openModal = (videoUrl) => {
    setSelectedVideoUrl(videoUrl);
    setModalOpen(true);
  };

  // Автовоспроизведение при открытии
  useEffect(() => {
    if (modalOpen && videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.warn("Автовоспроизведение заблокировано:", err);
      });
    }
  }, [modalOpen]);

  // Закрытие по Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && modalOpen) {
        closeModal();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [modalOpen]);

  return (
    <section id="loft" className={styles.section}>
      <h2 className={styles.title}>Наши лофт-пространства</h2>
      <div className={styles.grid}>
        {Object.entries(lofts).map(([slug, loft], index) => (
          <div key={slug} className={styles.card}>
            <div className={styles.cardMedia}>
              <img
                src={loft.image}
                alt={`loft-${index}`}
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
              <Link href={`/lofts/${slug}`} className={styles.cardButton}>
                Подробнее
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Модальное окно */}
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
