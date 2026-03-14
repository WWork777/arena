import styles from './LoftSpaces.module.scss'

export default function LoftSpaces() {
	return (
		<section id='loft' className={styles.section}>
			<h2 className={styles.title}>Наши лофт-пространства</h2>
			<div className={styles.grid}>
				{[1, 2, 3, 4, 5].map(item => (
					<div key={item} className={styles.card}>
						{/* <div className={styles.cardImage}>
              <div className={styles.loftOverlay}>ЛОФТ</div>
            </div> */}
						<img
							src='/images/loft/loft.png'
							alt='loft'
							className={styles.cardImage}
						/>
						<h3 className={styles.cardTitle}>Арена лофт</h3>
						<p className={styles.cardDescription}>
							Просторное и современное пространство для проведения детских
							праздников, мастер-классов и развлекательных мероприятий.
						</p>
						<button className={styles.cardButton}>Подробнее</button>
					</div>
				))}
			</div>
		</section>
	)
}
