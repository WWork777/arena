'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import styles from './VideoSection.module.scss'

export default function VideoSection() {
	const [currentSlide, setCurrentSlide] = useState(0)
	const [isPlaying, setIsPlaying] = useState(false)
	const [isFullscreen, setIsFullscreen] = useState(false)
	const videoRef = useRef(null)
	const videoContainerRef = useRef(null)

	const videos = [
		{
			id: 1,
			thumbnail:
				'/images/VideoSection/8e4171cb71b178f4572b70cc5b6317c802ef0e04.png',
			videoUrl: '/videos/VideoSection/video1.mp4', // Замените на реальные URL видео
			title: 'Видео о нас',
			description: 'Такие яркие праздники можно получить только у нас',
		},
		{
			id: 2,
			thumbnail:
				'/images/VideoSection/8e4171cb71b178f4572b70cc5b6317c802ef0e04.png',
			videoUrl: '/videos/VideoSection/video2.mp4',
			title: 'Наши аниматоры',
			description: 'Профессиональные аниматоры для детских праздников',
		},
		{
			id: 3,
			thumbnail:
				'/images/VideoSection/8e4171cb71b178f4572b70cc5b6317c802ef0e04.png',
			videoUrl: '/videos/VideoSection/video3.mp4',
			title: 'Шоу программы',
			description: 'Незабываемые шоу для ваших детей',
		},
		{
			id: 4,
			thumbnail:
				'/images/VideoSection/8e4171cb71b178f4572b70cc5b6317c802ef0e04.png',
			videoUrl: '/videos/VideoSection/video4.mp4',
			title: 'Игровые пространства',
			description: 'Уникальные игровые зоны для праздников',
		},
	]

	const buttons = [
		{ text: 'Аниматоры', icon: '/icons/VideoSection/play.svg' },
		{ text: 'Шоу', icon: '/icons/VideoSection/play.svg' },
		{ text: 'Игровые пространства', icon: '/icons/VideoSection/play.svg' },
	]

	const currentVideo = videos[currentSlide]

	// Обработка переключения слайдов
	useEffect(() => {
		if (videoRef.current) {
			videoRef.current.pause()
			setIsPlaying(false)
			videoRef.current.load()
		}
	}, [currentSlide])

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
		const video = videoRef.current
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
	}, [currentSlide])

	const handlePlay = () => {
		if (videoRef.current) {
			if (isPlaying) {
				videoRef.current.pause()
			} else {
				videoRef.current.play()
			}
			setIsPlaying(!isPlaying)
		}
	}

	const handleFullscreen = async () => {
		if (!document.fullscreenElement && videoContainerRef.current) {
			try {
				await videoContainerRef.current.requestFullscreen()
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

	const handlePrevSlide = () => {
		setCurrentSlide(prev => (prev === 0 ? videos.length - 1 : prev - 1))
	}

	const handleNextSlide = () => {
		setCurrentSlide(prev => (prev === videos.length - 1 ? 0 : prev + 1))
	}

	const handleDotClick = index => {
		setCurrentSlide(index)
	}

	return (
		<section className={styles.section}>
			<div>
				<div className={styles.videoCard_wrap}>
					{/* Белая карточка с видео */}
					<div className={styles.videoCard}>
						<div className={styles.videoImage} ref={videoContainerRef}>
							{/* Видео */}
							<video
								ref={videoRef}
								className={styles.video}
								src={currentVideo.videoUrl}
								poster={currentVideo.thumbnail}
								onClick={handlePlay}
								controls={false}
							/>

							{/* Заставка (thumbnail) - показывается когда видео не воспроизводится */}
							{!isPlaying && (
								<div className={styles.thumbnail}>
									<Image
										src={currentVideo.thumbnail}
										alt={currentVideo.title}
										width={654}
										height={370}
										className={styles.image}
									/>
								</div>
							)}

							{/* Кнопка воспроизведения на изображении */}
							{!isPlaying && (
								<div className={styles.playButton} onClick={handlePlay}>
									<Image
										src='/icons/VideoSection/play.svg'
										alt='Play'
										width={73}
										height={77}
										className={styles.playIcon}
									/>
								</div>
							)}

							{/* Кнопка полноэкранного режима */}
							{isPlaying && (
								<button
									className={styles.fullscreenButton}
									onClick={handleFullscreen}
								>
									<svg width='24' height='24' viewBox='0 0 24 24' fill='white'>
										<path d='M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z' />
									</svg>
								</button>
							)}
						</div>

						<div className={styles.videoTitle}>{currentVideo.title}</div>
						<div className={styles.videoDescription}>
							{currentVideo.description}
						</div>

						{/* Навигация с пагинацией */}
						<div className={styles.navigation}>
							{/* Стрелки навигации */}
							<button className={styles.navArrowLeft} onClick={handlePrevSlide}>
								<Image
									src='/icons/VideoSection/leftYelow.svg'
									alt='Previous'
									width={53}
									height={57}
									className={styles.arrowIcon}
								/>
							</button>

							{/* Пагинация */}
							<div className={styles.pagination}>
								{videos.map((_, index) => (
									<div
										key={index}
										className={`${styles.dot} ${index === currentSlide ? styles.active : ''}`}
										onClick={() => handleDotClick(index)}
									></div>
								))}
							</div>

							<button
								className={styles.navArrowRight}
								onClick={handleNextSlide}
							>
								<Image
									src='/icons/VideoSection/rightYelow.svg'
									alt='Next'
									width={53}
									height={57}
									className={styles.arrowIcon}
								/>
							</button>
						</div>
					</div>

					{/* Розовая карточка справа */}
					<div className={styles.rightCard}>
						{/* Кнопки справа */}
						{buttons.map((button, index) => (
							<button key={index} className={styles.actionButton}>
								<div className={styles.iconCircle}>
									<Image
										src='/icons/VideoSection/play.svg'
										alt={button.text}
										width={45}
										height={45}
										className={styles.playIconInCircle}
									/>
								</div>
								<span className={styles.buttonText}>{button.text}</span>
							</button>
						))}
					</div>
				</div>

				{/* Кнопка "Позвонить" */}
				<Link href='tel:+79095431213'>
					<button className={styles.callButton}>Позвонить</button>
				</Link>
			</div>
		</section>
	)
}
