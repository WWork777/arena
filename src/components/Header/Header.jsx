"use client";

import Image from "next/image";
import { useState } from "react";
import { MdPhone } from "react-icons/md";
import styles from "./Header.module.scss";
import Link from "next/link";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuItems = [
    { name: "главная", href: "#home" },
    { name: "лофт-пространства", href: "#loft" },
    { name: "аниматоры", href: "#animators" },
    { name: "шоу-программы", href: "#shows" },
    { name: "квесты", href: "#quests" },
    { name: "мастер-классы", href: "#master-classes" },
    { name: "новый год", href: "#new-year" },
    { name: "выпускной", href: "#graduation" },
    { name: "отзывы", href: "#reviews" },
    { name: "контакты", href: "#contacts" },
  ];

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Левая часть: Логотип */}
        <Link href="/" className={styles.logo}>
          <div className={styles.logoCircle}>
            <Image
              src="/icons/Header/logo.png"
              alt="Логотип"
              width={120} // Укажите размер в 1.5-2 раза больше реального для плотности пикселей
              height={120}
              className={styles.logoImage}
            />
          </div>
        </Link>

        {/* Центр: Навигация (скрыта на мобильных) */}
        <nav className={styles.nav}>
          <a href="#loft" className={styles.navLink}>
            Лофт-пространства
          </a>
          <a href="#shows" className={styles.navLink}>
            Шоу-программы
          </a>
          <a href="#master-classes" className={styles.navLink}>
            Мастер-классы
          </a>
        </nav>

        {/* Правая часть: Контакты, соцсети и кнопка */}
        <div className={styles.rightSection}>
          <a href="tel:+79095431213" className={styles.phone_number}>
            +7(909)-543-12-13
          </a>
          <a href="tel:+79095431213" className={styles.phone_icon}>
            <div className={styles.phone_icon_wrap}>
              <MdPhone size={24} color="white" />
            </div>
          </a>

          {/* VK */}
          <a
            href="https://vk.com/animatori_tomsk"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialIcon}
            aria-label="VK"
          >
            <Image
              src="/images/socials/logos-vk.png"
              alt="VK"
              width={46}
              height={46}
            />
          </a>

          {/* MAX */}
          <a
            href="https://max.ru/u/f9LHodD0cOJaFVvW9nUbeGO6KyU4YV4ECO1_CYWK8Iel22tTaDmxsz4THJA"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialIcon}
            aria-label="MAX"
          >
            <div className={styles.maxIcon}>
              <Image
                src="/icons/Header/MAX.svg"
                alt="MAX"
                width={28}
                height={28}
              />
            </div>
          </a>

          {/* Кнопка меню с анимацией крестика */}
          <button
            className={`${styles.menuButton} ${isMenuOpen ? styles.isOpen : ""}`}
            onClick={toggleMenu}
            aria-label="Меню"
            aria-expanded={isMenuOpen}
          >
            <span className={styles.menuLine}></span>
            <span className={styles.menuLine}></span>
            <span className={styles.menuLine}></span>
          </button>
        </div>
      </div>

      {/* Выпадающее меню */}
      {isMenuOpen && (
        <div className={styles.menu}>
          <div className={styles.menuContent}>
            {menuItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className={styles.menuItem}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
