import styles from './MasterClasses.module.scss'

export default function MasterClasses() {
	return (
		<section id='master-classes' className={styles.section}>
			<div className={styles.topSection}>
				<div className={styles.imageColumn}>
					{/* <div className={styles.image}>
            <div className={styles.overlayText}>МАСТЕР-КЛАСС</div>
          </div> */}
					<img src='/images/quest/master.png' alt='img' />
				</div>
				<div className={styles.textColumn}>
					<h2 className={styles.title}>Мастер-классы для детей</h2>
					<div className={styles.description}>
						<p>
							Развивающие мастер-классы для детей всех возрастов. Мы учим
							создавать красивые поделки, рисовать, лепить и многое другое.
						</p>
						<p>
							Каждый мастер-класс разработан с учетом возрастных особенностей
							детей. Наши преподаватели имеют большой опыт работы с детьми и
							знают, как сделать занятие интересным и полезным.
						</p>
						<p>
							Все материалы предоставляются. Дети уносят домой свои творческие
							работы и массу положительных эмоций.
						</p>
					</div>
					<button className={styles.button}>Подробнее</button>
				</div>
			</div>
			<div className={styles.cards}>
				{[1, 2, 3].map(item => (
					<div key={item} className={styles.card}>
						{/* <div className={styles.cardImage}>
							<div className={styles.cardOverlayText}>МАСТЕР-КЛАСС</div>
						</div> */}
						<img
							src='/images/quest/master.png'
							alt='img'
							className={styles.cardImage}
						/>
						<h3 className={styles.cardTitle}>Мастер-класс {item}</h3>
						<p className={styles.cardDescription}>
							Увлекательное занятие для развития творческих способностей и
							мелкой моторики.
						</p>
						<button className={styles.cardButton}>Подробнее</button>
					</div>
				))}
			</div>
			<a href='#loft' className={styles.link}>
				Наши лофт-пространства для Мастер-классов
			</a>
		</section>
	)
}
