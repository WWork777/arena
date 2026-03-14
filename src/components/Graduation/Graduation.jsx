import styles from './Graduation.module.scss'

export default function Graduation() {
	return (
		<section id='graduation' className={styles.section}>
			<div className={styles.topSection}>
				<div className={styles.imageColumn}>
					{/* <div className={styles.image}>
            <div className={styles.overlayText}>ВЫПУСКНОЙ ИЗ ШКОЛЫ</div>
          </div> */}
					<img src='/images/quest/dembel.png' alt='img' />
				</div>
				<div className={styles.textColumn}>
					<h2 className={styles.title}>Выпускной</h2>
					<div className={styles.description}>
						<p>
							Организация незабываемых выпускных для детских садов и начальной
							школы. Мы создаем праздничную атмосферу и делаем этот день
							особенным.
						</p>
						<p>
							Наши программы включают торжественную часть, развлекательную
							программу, фотозону и все необходимое для проведения выпускного.
						</p>
						<p>
							Мы поможем организовать выпускной, который запомнится детям и
							родителям на долгие годы.
						</p>
					</div>
					<button className={styles.button}>Подробнее</button>
				</div>
			</div>
			<div className={styles.cards}>
				{[1, 2, 3].map(item => (
					<div key={item} className={styles.card}>
						<img
							src='/images/quest/dembel.png'
							alt='img'
							className={styles.cardImage}
						/>
						<div className={styles.cardHeader}>
							<h3 className={styles.cardTitle}>Программа №{item}</h3>
							<span className={styles.playIcon}>▶</span>
						</div>
						<button className={styles.cardButton}>Подробнее</button>
					</div>
				))}
			</div>
			<a href='#loft' className={styles.link}>
				Наши лофт-пространства для Выпускного
			</a>
		</section>
	)
}
