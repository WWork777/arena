"use client";

import { useState } from "react";
import styles from "./LoftDetail.module.scss";

export default function VideoWithLoader({
  src,
  className,
  isAutoPlay = true,
  onVideoClick,
  ...props
}) {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleClick = (e) => {
    if (onVideoClick) onVideoClick(e);
  };

  return (
    <div className={`${styles.videoContainer} ${className}`}>
      {!isLoaded && (
        <div className={styles.videoLoader}>
          <div className={styles.spinner}></div>
          <div className={styles.shimmer}></div>
        </div>
      )}
      <video
        src={src}
        onLoadedData={() => setIsLoaded(true)}
        className={`${styles.videoElement} ${isLoaded ? styles.videoReady : ""}`}
        autoPlay={isAutoPlay}
        muted
        loop
        playsInline
        onClick={handleClick}
        {...props}
      />
    </div>
  );
}