import Image from 'next/image'
import VideoSection from '../VideoSection/VideoSection'
import styles from './Hero.module.scss'

export default function Hero() {
	return (
		<>
			<section className={styles.hero}>
				{/* Левая часть - графические элементы */}
				<div className={styles.leftGraphics}>
					<div className={styles.leftGraphic1}>
						<Image
							src='/images/Hero/Photoroom3.svg'
							alt=''
							width={509}
							height={539}
							className={styles.graphicImage}
						/>
					</div>
					<div className={styles.leftGraphic2}>
						<Image
							src='/images/Hero/Photoroom4.svg'
							alt=''
							width={524}
							height={566}
							className={styles.graphicImage}
						/>
					</div>
					<div className={styles.leftCircle}>
						<div className={styles.circleImageWrapper}>
							<Image
								src='/images/Hero/cb1220558b500c6840f583a15ed29b7ae9863fec.png'
								alt=''
								width={465}
								height={465}
								className={styles.circleImage}
							/>
						</div>
					</div>
				</div>

				{/* Центр - текст */}
				<h1 className={styles.title}>Арена развлечений</h1>
				<p className={styles.subtitle}>детские праздники в Томске</p>

				{/* Правая часть - графические элементы */}
				<div className={styles.rightGraphics}>
					<div className={styles.rightGraphic1}>
						<Image
							src='/images/Hero/Photoroom2.svg'
							alt=''
							width={524}
							height={566}
							className={styles.graphicImage}
						/>
					</div>
					<div className={styles.rightGraphic2}>
						<Image
							src='/images/Hero/Photoroom22.svg'
							alt=''
							width={509}
							height={539}
							className={styles.graphicImage}
						/>
					</div>
					<div className={styles.rightCircle}>
						<div className={styles.circleImageWrapper}>
							<Image
								src='/images/Hero/leftCircle.png'
								alt=''
								width={502}
								height={502}
								className={styles.circleImage}
								style={{ objectPosition: '60% 40%' }}
							/>
						</div>
					</div>
				</div>
				<VideoSection />
			</section>
			<section className={styles.under_hero}></section>
		</>
	)
}
