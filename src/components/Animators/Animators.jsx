import styles from './Animators.module.scss'

export default function Animators() {
	return (
		<section id='animators' className={styles.section}>
			<div className={styles.container}>
				<div className={styles.textColumn}>
					<h2 className={styles.title}>Аниматоры</h2>
					<div className={styles.description}>
						<p>
							Наши профессиональные аниматоры создадут незабываемую атмосферу
							для вашего праздника. Они умеют работать с детьми любого возраста
							и знают, как сделать мероприятие ярким и запоминающимся.
						</p>
						<p>
							Каждый аниматор проходит специальную подготовку и имеет большой
							опыт работы с детьми. Мы предлагаем различные тематические
							программы и костюмы персонажей.
						</p>
						<p>
							Наши аниматоры не только развлекают, но и развивают детей через
							игры, конкурсы и интерактивные программы.
						</p>
					</div>
					<button className={styles.button}>Подробнее</button>
				</div>

				<div className={styles.imageColumn}>
					<img
						src='/images/animators/animators.png'
						alt='img'
						className={styles.img}
					/>
					<img
						src='/images/animators/bubles.png'
						alt='bubles'
						className={styles.bubles2}
					/>

					{/* <div className={styles.image}>
						<div className={styles.illustration}></div>
					</div> */}
				</div>
				<img
					src='/images/animators/bubles.png'
					alt='bubles'
					className={styles.bubles1}
				/>
			</div>
		</section>
	)
}
