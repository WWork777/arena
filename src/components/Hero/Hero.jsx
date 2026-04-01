import Image from "next/image";
import VideoSection from "../VideoSection/VideoSection";
import styles from "./Hero.module.scss";

export default function Hero() {
  return (
    <>
      <section className={styles.hero}>
        {/* Контейнер для графики (не кликабельный, скрывает лишнее за экраном) */}
        <div className={styles.graphicsContainer}>
          {/* Левая часть */}
          <div className={`${styles.graphicGroup} ${styles.leftGraphics}`}>
            <div
              className={`${styles.graphicWrapper} ${styles.leftGraphic1} ${styles.floatSlow}`}
            >
              <Image
                src="/images/Hero/Photoroom3.svg"
                alt=""
                width={509}
                height={539}
                className={styles.graphicImage}
              />
            </div>
            <div
              className={`${styles.graphicWrapper} ${styles.leftGraphic2} ${styles.floatMedium}`}
            >
              <Image
                src="/images/Hero/Photoroom4.svg"
                alt=""
                width={524}
                height={566}
                className={styles.graphicImage}
              />
            </div>
            <div
              className={`${styles.circleWrapper} ${styles.leftCircle} ${styles.floatFast}`}
            >
              <div className={styles.circleImageWrapper}>
                <Image
                  src="/images/Hero/cb1220558b500c6840f583a15ed29b7ae9863fec.png"
                  alt=""
                  width={465}
                  height={465}
                  className={styles.circleImage}
                />
              </div>
            </div>
          </div>

          {/* Правая часть */}
          <div className={`${styles.graphicGroup} ${styles.rightGraphics}`}>
            <div
              className={`${styles.graphicWrapper} ${styles.rightGraphic1} ${styles.floatMedium}`}
            >
              <Image
                src="/images/Hero/Photoroom2.svg"
                alt=""
                width={524}
                height={566}
                className={styles.graphicImage}
              />
            </div>
            <div
              className={`${styles.graphicWrapper} ${styles.rightGraphic2} ${styles.floatSlow}`}
            >
              <Image
                src="/images/Hero/Photoroom22.svg"
                alt=""
                width={509}
                height={539}
                className={styles.graphicImage}
              />
            </div>
            <div
              className={`${styles.circleWrapper} ${styles.rightCircle} ${styles.floatFast}`}
            >
              <div className={styles.circleImageWrapper}>
                <Image
                  src="/images/Hero/leftCircle.png"
                  alt=""
                  width={502}
                  height={502}
                  className={styles.circleImage}
                  style={{ objectPosition: "60% 40%" }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Центральный контент (Текст) */}
        <div className={styles.content}>
          <h1 className={styles.title}>Арена развлечений</h1>
          <p className={styles.subtitle}>детские праздники в Томске</p>
        </div>

        {/* Секция с видео */}
        <div className={styles.videoWrapper}>
          <VideoSection />
        </div>
      </section>

      {/* <section className={styles.under_hero}></section> */}
    </>
  );
}
