"use client";

import { useState } from "react";
import styles from "./LoftDetail.module.scss";

export default function VideoWithLoader({
  src,
  className,
  isAutoPlay = true,
  ...props
}) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`${styles.videoContainer} ${className}`}>
      {/* Анимация загрузки (показывается, пока isLoaded === false) */}
      {!isLoaded && (
        <div className={styles.videoLoader}>
          <div className={styles.spinner}></div>
          <div className={styles.shimmer}></div>
        </div>
      )}

      <video
        src={src}
        onLoadedData={() => setIsLoaded(true)} // Срабатывает, когда первый кадр готов
        className={`${styles.videoElement} ${isLoaded ? styles.videoReady : ""}`}
        autoPlay={isAutoPlay}
        muted
        loop
        playsInline
        {...props}
      />
    </div>
  );
}
