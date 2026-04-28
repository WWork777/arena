"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { MdArrowBack, MdPlace } from "react-icons/md";
import Reviews from "@/components/Reviews/Reviews";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import styles from "./MasterClassDetail.module.scss";

export default function MasterDetailClient({ master, otherMasters, lofts }) {
  const router = useRouter();

  return (
    <main className={styles.wrapper}>
      <div className={styles.container}>
        <nav className={styles.topNav}>
          <button className={styles.backLink} onClick={() => router.back()}>
            <MdArrowBack /> Назад
          </button>
        </nav>

        <header className={styles.headerCentered}>
          <h1 className={styles.mainTitle}>{master.title}</h1>
          <p className={styles.subtitle}>{master.subtitle}</p>
        </header>

        <section className={styles.infoBlock}>
          <div className={styles.imageContent}>
            <Image
              src={master.thumbnail}
              alt={master.title}
              fill
              className={styles.mainImage}
              unoptimized
            />
          </div>
          <div className={styles.textContent}>
            <h2>О программе</h2>
            <p className={styles.description}>{master.desc}</p>
            <ul className={styles.featuresList}>
              {master.features?.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
            <button
              className={styles.requestButton}
              style={{ backgroundColor: master.color }}
            >
              Заказать
            </button>
          </div>
        </section>

        {/* Слайдер "Другие мастер-классы" */}
        <section className={styles.sliderSection}>
          <h2 className={styles.sectionTitle}>Другие мастер-классы</h2>
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {otherMasters.map((m) => (
              <SwiperSlide key={m.slug}>
                <Link
                  href={`/master-classes/${m.slug}`}
                  className={styles.tariffCard}
                >
                  <div className={styles.tariffImageWrap}>
                    <Image
                      src={m.image}
                      alt={m.title}
                      fill
                      className={styles.slideImage}
                      unoptimized
                    />
                  </div>
                  <h3 className={styles.tariffTitle}>{m.title}</h3>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>

        {/* Слайдер "Наши лофты" - ДАННЫЕ ИЗ STRAPI */}
        <section className={styles.sliderSection}>
          <h2 className={styles.sectionTitle}>Наши лофт пространства</h2>
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation
            pagination={{ clickable: true }}
            spaceBetween={25}
            slidesPerView={1}
            autoplay={{ delay: 4000 }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {lofts.map((loft) => (
              <SwiperSlide key={loft.slug}>
                <Link
                  href={`/lofts/${loft.slug}`}
                  className={styles.loftCardLink}
                >
                  <div className={styles.photoCard}>
                    <Image
                      src={loft.image}
                      alt={loft.title}
                      fill
                      className={styles.slideImage}
                      unoptimized
                    />
                    {/* <div className={styles.loftOverlay}>
                      <div
                        className={styles.loftIcon}
                        style={{ backgroundColor: loft.color }}
                      >
                        <MdPlace />
                      </div>
                    </div> */}
                  </div>
                  <div className={styles.loftCardInfo}>
                    <h3 className={styles.tariffTitle}>{loft.title}</h3>
                    <span className={styles.relatedLink}>
                      Посмотреть лофт <span>→</span>
                    </span>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>

        <Reviews />
        <nav className={styles.bottomNav}>
          <button className={styles.backButton} onClick={() => router.back()}>
            ← Назад
          </button>
        </nav>
      </div>
    </main>
  );
}
