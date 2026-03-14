import styles from './ShowPrograms.module.scss'

export default function ShowPrograms() {
	return (
		<section id='shows' className={styles.section}>
			<h2 className={styles.title}>Шоу-программы</h2>
			<div className={styles.cards}>
				{[1, 2, 3].map(item => (
					<div key={item} className={styles.card}>
						{/* <div className={styles.cardImage}>
              <div className={styles.overlayText}>БУМАЖНОЕ ВЕЧЕРИНКА</div>
            </div> */}
						<img
							src='/images/show/show.png'
							alt='img'
							className={styles.cardImage}
						/>
						<h3 className={styles.cardTitle}>Бумажное вечеринка</h3>
						<button className={styles.cardButton}>Подробнее</button>
					</div>
				))}
			</div>
			<button className={styles.ctaButton}>Показать все</button>
		</section>
	)
}
