'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import styles from './LoftSpaces.module.scss'

export default function LoftSpaces() {
	const [activeVideo, setActiveVideo] = useState(null)
	const [isPlaying, setIsPlaying] = useState(false)
	const [isFullscreen, setIsFullscreen] = useState(false)
	const videoRefs = useRef([])
	const videoContainerRefs = useRef([])

	const lofts = [
		{
			title: 'Арена Лофт',
			desc: 'Стильное пространство для школьников с интерактивной стеной, батутом и X-Box. Для тех, кто устал от детских игровых с горками лабиринтами и игрушками.',
			video: '/videos/loft/arena.mp4',
		},
		{
			title: 'Конфетти Рум',
			desc: 'Уютное светлое пространство с горкой, батутом и большим сухим бассейном. Много развивающих игрушек для малышей и грифельная стенка для юных художников.',
			video: '/videos/loft/konfetti.mp4',
		},
		{
			title: 'Флинт',
			desc: 'Игровая в пиратском стиле для любителей активно провести время. Полоса препятствий, поролоновая яма 1,5м глубиной, скалодром, лабиринт с горкой и бассейном.',
			video: '/videos/loft/flint.mp4',
		},
		{
			title: 'Магический Лофт',
			desc: 'Просторная игровая комната с настоящим детским картингом, большим лабиринтом с двумя горками и бассейном, с игрушками для малышей и батутом для тех, кто любит постигать новые высоты.',
			video: '/videos/loft/magic.mp4',
		},
		{
			title: 'Мармеладный дом',
			desc: 'Нежный лофт с каруселью, лабиринтом и батутом. Бесплатный аэрохоккей для гостей постарше, несколько фотозон и удобнейшие подвесные кресла чтобы расслабиться и поймать дзен невзирая на весь движ вокруг.',
			video: '/videos/loft/marmelad.mp4',
		},
		{
			title: 'Патихолл',
			desc: 'Огромное пространство для мероприятия с комфортным зонированием - отдельная комната для застолья с активностями для деток, чтобы всегда были под присмотром, отдельная комната с батутом, лабиринтом и картингом и самая тайная комната с x-box и VR-очками.',
			video: '/videos/loft/partyhall.mp4',
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

	const handleMoreClick = index => {
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
		e.stopPropagation() // Предотвращаем всплытие события
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
		<section id='loft' className={styles.section}>
			<h2 className={styles.title}>Наши лофт-пространства</h2>
			<div className={styles.grid}>
				{lofts.map((loft, index) => (
					<div key={index} className={styles.card}>
						<div
							className={styles.cardMedia}
							ref={el => (videoContainerRefs.current[index] = el)}
						>
							{activeVideo === index ? (
								// Показываем видео
								<video
									ref={el => (videoRefs.current[index] = el)}
									src={loft.video}
									className={styles.video}
									playsInline
									onClick={e => handleVideoPlay(index, e)}
								/>
							) : (
								// Показываем картинку
								<>
									<img
										src='/images/loft/loft.png'
										alt={`loft-${index}`}
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
											width={50}
											height={50}
											className={styles.playIcon}
										/>
									</div>
								</>
							)}

							{/* Кнопка полноэкранного режима (показывается только когда видео активно) */}
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
						<h3 className={styles.cardTitle}>{loft.title}</h3>
						<p className={styles.cardDescription}>{loft.desc}</p>
						<button
							className={styles.cardButton}
							onClick={() => handleMoreClick(index)}
						>
							{activeVideo === index ? 'Скрыть видео' : 'Подробнее'}
						</button>
					</div>
				))}
			</div>
		</section>
	)
}
