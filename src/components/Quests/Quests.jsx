import styles from './Quests.module.scss'

export default function Quests() {
	return (
		<section id='quests' className={styles.section}>
			<div className={styles.topSection}>
				<div className={styles.textColumn}>
					<h2 className={styles.title}>Квесты для детей</h2>
					<div className={styles.description}>
						<p>
							Увлекательные квесты для детей разных возрастов. Наши программы
							развивают логическое мышление, командный дух и творческие
							способности.
						</p>
						<p>
							Каждый квест имеет уникальный сюжет и интересные задания. Дети
							погружаются в захватывающие приключения, решают головоломки и
							проходят испытания.
						</p>
						<p>
							Мы предлагаем различные тематики: от приключенческих до
							мистических. Все квесты безопасны и адаптированы под возраст
							участников.
						</p>
					</div>
					<button className={styles.button}>Подробнее</button>
				</div>
				<div className={styles.imageColumn}>
					{/* <div className={styles.image}>
            <div className={styles.overlayText}>КВЕСТ-ЗОМБИ</div>
          </div> */}
					<img src='/images/quest/quest.png' alt='img' />
				</div>
			</div>
			<div className={styles.cards}>
				{[1, 2, 3].map(item => (
					<div key={item} className={styles.card}>
						<img
							src='/images/quest/quest.png'
							alt='img'
							className={styles.cardImage}
						/>
						<h3 className={styles.cardTitle}>Квест-зомби</h3>
						<button className={styles.cardButton}>Подробнее</button>
					</div>
				))}
			</div>
			<button className={styles.ctaButton}>Показать все</button>
		</section>
	)
}
