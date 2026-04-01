"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "./LoftSpaces.module.scss";
import Link from "next/link";

export default function LoftSpaces() {
  const [activeVideo, setActiveVideo] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const videoRefs = useRef([]);
  const videoContainerRefs = useRef([]);

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
      color: "#ae305e", // Темно-розовый
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
      color: "#13a7e9", // Голубой
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
      color: "#f2c81c", // Желтый
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
      color: "#d73973", // Ярко-розовый
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
      color: "#ae305e", // Бордовый
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
      color: "#3ab5ad", // Бирюзовый
      capacity: "до 30 гостей",
      equipment: "Микрофоны, Звуковая система, Спецэффекты",
      food: "Большой стол для детского чаепития",
    },
  };

  // Обработка полноэкранного режима
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  // Обработка событий видео
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

  const handleMoreClick = (index) => {
    if (activeVideo === index) {
      // Если это та же карточка, останавливаем видео и показываем картинку
      if (videoRefs.current[index]) {
        videoRefs.current[index].pause();
        setIsPlaying(false);
      }
      setActiveVideo(null);
    } else {
      // Если другая карточка, останавливаем предыдущее видео
      if (activeVideo !== null && videoRefs.current[activeVideo]) {
        videoRefs.current[activeVideo].pause();
      }
      setActiveVideo(index);
      setIsPlaying(true);
      // Автоматически запускаем видео
      setTimeout(() => {
        if (videoRefs.current[index]) {
          videoRefs.current[index].play();
        }
      }, 100);
    }
  };

  const handleVideoPlay = (index, e) => {
    e.stopPropagation(); // Предотвращаем всплытие события
    if (activeVideo !== index) {
      // Если видео еще не активно, сначала показываем его
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
      // Если видео уже активно, переключаем воспроизведение/паузу
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

  return (
    <section id="loft" className={styles.section}>
      <h2 className={styles.title}>Наши лофт-пространства</h2>
      <div className={styles.grid}>
        {/* Превращаем объект в массив записей: [slug, данные] */}
        {Object.entries(lofts).map(([slug, loft], index) => (
          <div key={slug} className={styles.card}>
            <div
              className={styles.cardMedia}
              ref={(el) => (videoContainerRefs.current[index] = el)}
            >
              {activeVideo === index ? (
                <video
                  ref={(el) => (videoRefs.current[index] = el)}
                  src={loft.video}
                  className={styles.video}
                  playsInline
                  onClick={(e) => handleVideoPlay(index, e)}
                />
              ) : (
                <>
                  <img
                    src="/images/loft/loft.png"
                    alt={`loft-${index}`}
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
              <h3 className={styles.cardTitle}>{loft.title}</h3>
              <p className={styles.cardDescription}>{loft.desc}</p>

              {/* Использовали переменную slug, которую получили из Object.entries */}
              <Link href={`/lofts/${slug}`} className={styles.cardButton}>
                Подробнее
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
