import styles from './NewYear.module.scss'

export default function NewYear() {
	return (
		<section id='new-year' className={styles.section}>
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
					<img src='/images/quest/new-year.png' alt='img' />
				</div>
			</div>
			<div className={styles.cards}>
				{[1, 2, 3].map(item => (
					<div key={item} className={styles.card}>
						{/* <div className={styles.cardImage}>
              <div className={styles.cardOverlayText}>НОВЫЙ ГОД</div>
            </div> */}
						<img
							src='/images/quest/new-year.png'
							alt='img'
							className={styles.cardImage}
						/>
						<div className={styles.cardHeader}>
							<h3 className={styles.cardTitle}>Программа НГ</h3>
							<span className={styles.playIcon}>▶</span>
						</div>
						<button className={styles.cardButton}>Подробнее</button>
					</div>
				))}
			</div>
			<a href='#loft' className={styles.link}>
				Наши лофт-пространства для Нового года
			</a>
		</section>
	)
}
