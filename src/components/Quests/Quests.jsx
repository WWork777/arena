"use client";

import Image from "next/image";
import styles from "./Quests.module.scss";

export default function Quests() {
  // Массив для вывода карточек
  const questsList = [1, 2, 3];

  return (
    <section id="quests" className={styles.section}>
      <div className={styles.topSection}>
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
            <p>
              Мы предлагаем различные тематики: от приключенческих до
              мистических. Все квесты безопасны и адаптированы под возраст
              участников.
            </p>
          </div>
          <button className={styles.button}>Подробнее</button>
        </div>

        <div className={styles.imageColumn}>
          <Image
            src="/images/quest/quest.png"
            alt="Квесты для детей"
            width={600}
            height={600}
            className={styles.mainImage}
          />
        </div>
      </div>

      <div className={styles.grid}>
        {questsList.map((item) => (
          <div key={item} className={styles.card}>
            <div className={styles.cardMedia}>
              <Image
                src="/images/quest/quest.png"
                alt="Квест-зомби"
                fill
                className={styles.cardImage}
              />
            </div>

            {/* Обертка для контента, чтобы кнопка всегда была внизу */}
            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}>Квест-зомби</h3>
              <button className={styles.cardButton}>Подробнее</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
