"use client";

import Image from "next/image";
import styles from "./NewYear.module.scss";

export default function NewYear() {
  return (
    <section id="new-year" className={styles.section}>
      <div className={styles.topSection}>
        <div className={styles.textColumn}>
          <h2 className={styles.title}>Новый год</h2>
          <div className={styles.description}>
            <p>
              Волшебные новогодние программы для детей. Встреча с Дедом Морозом
              и Снегурочкой, праздничные конкурсы, подарки и незабываемая
              атмосфера праздника.
            </p>
            <p>
              Мы создаем настоящую зимнюю сказку для ваших детей. Каждая
              программа уникальна и включает в себя интерактивные элементы, игры
              и развлечения.
            </p>
            <p>
              Забронируйте новогоднюю программу заранее и подарите детям
              незабываемый праздник!
            </p>
          </div>
          <button className={styles.button}>Подробнее</button>
        </div>

        <div className={styles.imageColumn}>
          <Image
            src="/images/quest/new-year.png"
            alt="Новый год"
            width={600}
            height={600}
            className={styles.mainImage}
          />
        </div>
      </div>

      <div className={styles.grid}>
        {[1, 2, 3].map((item) => (
          <div key={item} className={styles.card}>
            <div className={styles.cardMedia}>
              <Image
                src="/images/quest/new-year.png"
                alt="Программа НГ"
                fill
                className={styles.cardImage}
              />
            </div>

            <div className={styles.cardContent}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>Программа НГ</h3>
                <span className={styles.playIcon}>▶</span>
              </div>
              <button className={styles.cardButton}>Подробнее</button>
            </div>
          </div>
        ))}
      </div>

      <a href="#loft" className={styles.link}>
        Наши лофт-пространства для Нового года
      </a>
    </section>
  );
}
