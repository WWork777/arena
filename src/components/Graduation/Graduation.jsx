// import styles from './Graduation.module.scss'

// export default function Graduation() {
// 	return (
// 		<section id='graduation' className={styles.section}>
// 			<div className={styles.topSection}>
// 				<div className={styles.imageColumn}>
// 					{/* <div className={styles.image}>
//             <div className={styles.overlayText}>ВЫПУСКНОЙ ИЗ ШКОЛЫ</div>
//           </div> */}
// 					<img src='/images/quest/dembel.png' alt='img' />
// 				</div>
// 				<div className={styles.textColumn}>
// 					<h2 className={styles.title}>Выпускной</h2>
// 					<div className={styles.description}>
// 						<p>
// 							Организация незабываемых выпускных для детских садов и начальной
// 							школы. Мы создаем праздничную атмосферу и делаем этот день
// 							особенным.
// 						</p>
// 						<p>
// 							Наши программы включают торжественную часть, развлекательную
// 							программу, фотозону и все необходимое для проведения выпускного.
// 						</p>
// 						<p>
// 							Мы поможем организовать выпускной, который запомнится детям и
// 							родителям на долгие годы.
// 						</p>
// 					</div>
// 					<button className={styles.button}>Подробнее</button>
// 				</div>
// 			</div>
// 			<div className={styles.cards}>
// 				{[1, 2, 3].map(item => (
// 					<div key={item} className={styles.card}>
// 						<img
// 							src='/images/quest/dembel.png'
// 							alt='img'
// 							className={styles.cardImage}
// 						/>
// 						<div className={styles.cardHeader}>
// 							<h3 className={styles.cardTitle}>Программа №{item}</h3>
// 							<span className={styles.playIcon}>▶</span>
// 						</div>
// 						<button className={styles.cardButton}>Подробнее</button>
// 					</div>
// 				))}
// 			</div>
// 			<a href='#loft' className={styles.link}>
// 				Наши лофт-пространства для Выпускного
// 			</a>
// 		</section>
// 	)
// }
'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import styles from './Graduation.module.scss'

export default function Graduation() {
	const [visibleCount, setVisibleCount] = useState(3) // Показываем 3 карточки сначала
	const [activeVideo, setActiveVideo] = useState(null)
	const [isPlaying, setIsPlaying] = useState(false)
	const [isFullscreen, setIsFullscreen] = useState(false)
	const videoRefs = useRef([])
	const videoContainerRefs = useRef([])

	const graduations = [
		{
			title: 'Программа 1',
			desc: 'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore.',
			video: '/videos/graduations/peremena.mp4',
		},
		{
			title: 'Программа 2',
			desc: 'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore.',
			video: '/videos/graduations/mix.mp4',
		},
		{
			title: 'Программа 3',
			desc: 'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore.',
			video: '/videos/graduations/mix2.mp4',
		},
		{
			title: 'Программа 4',
			desc: 'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore.',
			video: '/videos/graduations/foam.mp4',
		},
		{
			title: 'Программа 5',
			desc: 'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore.',
			video: '/videos/graduations/fort.mp4',
		},
		{
			title: 'Программа 6',
			desc: 'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore.',
			video: '/videos/graduations/neon.mp4',
		},
	]

	// Обработка полноэкранного режима
	useEffect(() => {
		const handleFullscreenChange = () => {
			setIsFullscreen(!!document.fullscreenElement)
		}

		document.addEventListener('fullscreenchange', handleFullscreenChange)
		return () => {
			document.removeEventListener('fullscreenchange', handleFullscreenChange)
		}
	}, [])

	// Обработка событий видео
	useEffect(() => {
		if (activeVideo !== null) {
			const video = videoRefs.current[activeVideo]
			if (!video) return

			const handlePlay = () => setIsPlaying(true)
			const handlePause = () => setIsPlaying(false)
			const handleEnded = () => setIsPlaying(false)

			video.addEventListener('play', handlePlay)
			video.addEventListener('pause', handlePause)
			video.addEventListener('ended', handleEnded)

			return () => {
				video.removeEventListener('play', handlePlay)
				video.removeEventListener('pause', handlePause)
				video.removeEventListener('ended', handleEnded)
			}
		}
	}, [activeVideo])

	const handleShowMore = () => {
		setVisibleCount(prev => Math.min(prev + 3, graduations.length))
	}

	const handleMoreClick = (index, e) => {
		e.preventDefault()
		if (activeVideo === index) {
			// Если это та же карточка, останавливаем видео и показываем картинку
			if (videoRefs.current[index]) {
				videoRefs.current[index].pause()
				setIsPlaying(false)
			}
			setActiveVideo(null)
		} else {
			// Если другая карточка, останавливаем предыдущее видео
			if (activeVideo !== null && videoRefs.current[activeVideo]) {
				videoRefs.current[activeVideo].pause()
			}
			setActiveVideo(index)
			setIsPlaying(true)
			// Автоматически запускаем видео
			setTimeout(() => {
				if (videoRefs.current[index]) {
					videoRefs.current[index].play()
				}
			}, 100)
		}
	}

	const handleVideoPlay = (index, e) => {
		e.stopPropagation()
		if (activeVideo !== index) {
			// Если видео еще не активно, сначала показываем его
			if (activeVideo !== null && videoRefs.current[activeVideo]) {
				videoRefs.current[activeVideo].pause()
			}
			setActiveVideo(index)
			setTimeout(() => {
				if (videoRefs.current[index]) {
					videoRefs.current[index].play()
					setIsPlaying(true)
				}
			}, 100)
		} else {
			// Если видео уже активно, переключаем воспроизведение/паузу
			if (videoRefs.current[index]) {
				if (isPlaying) {
					videoRefs.current[index].pause()
				} else {
					videoRefs.current[index].play()
				}
				setIsPlaying(!isPlaying)
			}
		}
	}

	const handleFullscreen = async (index, e) => {
		e.stopPropagation()
		const container = videoContainerRefs.current[index]
		if (!container) return

		if (!document.fullscreenElement) {
			try {
				await container.requestFullscreen()
				setIsFullscreen(true)
			} catch (err) {
				console.error('Ошибка при переходе в полноэкранный режим:', err)
			}
		} else {
			try {
				await document.exitFullscreen()
				setIsFullscreen(false)
			} catch (err) {
				console.error('Ошибка при выходе из полноэкранного режима:', err)
			}
		}
	}

	return (
		<section id='graduation' className={styles.section}>
			<div className={styles.topSection}>
				<div className={styles.imageColumn}>
					<img src='/images/quest/dembel.png' alt='Выпускной' />
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
				{graduations.slice(0, visibleCount).map((item, index) => (
					<div key={index} className={styles.card}>
						<div
							className={styles.cardMedia}
							ref={el => (videoContainerRefs.current[index] = el)}
						>
							{activeVideo === index ? (
								// Показываем видео
								<video
									ref={el => (videoRefs.current[index] = el)}
									src={item.video}
									className={styles.video}
									playsInline
									onClick={e => handleVideoPlay(index, e)}
								/>
							) : (
								// Показываем картинку
								<>
									<img
										src='/images/quest/dembel.png'
										alt={item.title}
										className={styles.cardImage}
									/>
									{/* Постоянная стрелочка в кружочке */}
									<div
										className={styles.playButtonConstant}
										onClick={e => handleVideoPlay(index, e)}
									>
										<Image
											src='/icons/VideoSection/play.svg'
											alt='Play'
											width={40}
											height={40}
											className={styles.playIcon}
										/>
									</div>
								</>
							)}

							{/* Кнопка полноэкранного режима */}
							{activeVideo === index && (
								<button
									className={styles.fullscreenButton}
									onClick={e => handleFullscreen(index, e)}
								>
									<svg width='20' height='20' viewBox='0 0 24 24' fill='white'>
										<path d='M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z' />
									</svg>
								</button>
							)}
						</div>
						<div className={styles.cardHeader}>
							<h3 className={styles.cardTitle}>{item.title}</h3>
							{/* Убрана лишняя стрелка */}
						</div>
						<p className={styles.cardDescription}>{item.desc}</p>
						<button
							className={styles.cardButton}
							onClick={e => handleMoreClick(index, e)}
						>
							{activeVideo === index ? 'Скрыть видео' : 'Подробнее'}
						</button>
					</div>
				))}
			</div>

			{visibleCount < graduations.length && (
				<button className={styles.showMoreButton} onClick={handleShowMore}>
					Показать еще
				</button>
			)}

			<Link href='#loft' className={styles.link}>
				Наши лофт-пространства для Выпускного
			</Link>
		</section>
	)
}
