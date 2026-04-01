"use client";

import Image from "next/image";
import styles from "./Advantage.module.scss";

export default function Advantage() {
  const list = [
    { title: "нет чужих гостей", src: "/images/advantages/img1.png" },
    { title: "на любой кошелек", src: "/images/advantages/img2.png" },
    { title: "игровой зал", src: "/images/advantages/img3.png" },
    { title: "можно со своей едой", src: "/images/advantages/img4.png" },
    { title: "кухонная зона", src: "/images/advantages/img5.png" },
  ];

  return (
    <section className={styles.section}>
      <div className={styles.wrapper}>
        {list.map((item, i) => (
          <div key={i} className={styles.box}>
            <div className={styles.imageWrapper}>
              <Image
                src={item.src}
                alt={item.title}
                width={80}
                height={80}
                className={styles.img}
              />
            </div>
            {/* Исправлено: теперь тут styles.title вместо paragraph */}
            <p className={styles.title}>{item.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
