"use client";

import Image from "next/image";
import styles from "./Animators.module.scss";

export default function Animators() {
  return (
    <section id="animators" className={styles.section}>
      <div className={styles.container}>
        {/* Текстовая колонка */}
        <div className={styles.textColumn}>
          <h2 className={styles.title}>Аниматоры</h2>
          <div className={styles.description}>
            <p>
              Наши профессиональные аниматоры создадут незабываемую атмосферу
              для вашего праздника. Они умеют работать с детьми любого возраста
              и знают, как сделать мероприятие ярким и запоминающимся.
            </p>
            <p>
              Каждый аниматор проходит специальную подготовку и имеет большой
              опыт работы с детьми. Мы предлагаем различные тематические
              программы и костюмы персонажей.
            </p>
            <p>
              Наши аниматоры не только развлекают, но и развивают детей через
              игры, конкурсы и интерактивные программы.
            </p>
          </div>
          <button className={styles.button}>Подробнее</button>
        </div>

        {/* Колонка с картинками */}
        <div className={styles.imageColumn}>
          {/* Декоративный пузырь 2 (слева за аниматорами) */}
          <div className={`${styles.bubbleWrapper} ${styles.bubles2}`}>
            <Image
              src="/images/animators/bubles.png"
              alt="bubbles"
              width={300}
              height={300}
              className={styles.bubbleImage}
            />
          </div>

          {/* Главное фото аниматоров */}
          <Image
            src="/images/animators/animators.png"
            alt="Наши аниматоры"
            width={800}
            height={800}
            className={styles.mainImage}
          />
        </div>

        {/* Декоративный пузырь 1 (справа сверху) */}
        <div className={`${styles.bubbleWrapper} ${styles.bubles1}`}>
          <Image
            src="/images/animators/bubles.png"
            alt="bubbles"
            width={400}
            height={400}
            className={styles.bubbleImage}
          />
        </div>
      </div>
    </section>
  );
}
