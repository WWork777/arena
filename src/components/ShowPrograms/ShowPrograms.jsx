// import styles from './ShowPrograms.module.scss'

// export default function ShowPrograms() {
// 	const shows = [
// 		{
// 			title: 'Блогер Пати',
// 			desc: 'Зажигательная вечеринка в стиле популярных блогеров. Танцы, конкурсы, челленджи и фотосессия. Ваш ребенок почувствует себя настоящей звездой Instagram!',
// 			video: '/videos/shows/bloger.mp4',
// 		},
// 		{
// 			title: 'Венздей Квест',
// 			desc: 'Таинственный квест по мотивам популярного сериала. Раскрывайте загадки, ищите улики и погружайтесь в мрачную атмосферу академии Nevermore.',
// 			video: '/videos/shows/wednesday.mp4',
// 		},
// 		{
// 			title: 'Зверо-Квест',
// 			desc: 'Увлекательное приключение с животными. Детей ждут интересные задания, загадки и знакомство с удивительным миром фауны в игровой форме.',
// 			video: '/videos/shows/zvero.mp4',
// 		},
// 		{
// 			title: 'Игра в Кальмара',
// 			desc: 'Адреналиновый квест по мотивам нашумевшего сериала. Безопасные версии популярных игр, командные соревнования и море эмоций для смелых участников.',
// 			video: '/videos/shows/squidgame.mp4',
// 		},
// 		{
// 			title: 'Научное Шоу',
// 			desc: 'Зрелищные эксперименты и удивительные опыты. Дети увидят химические реакции, физические фокусы и смогут сами поучаствовать в настоящих научных открытиях.',
// 			video: '/videos/shows/science.mp4',
// 		},
// 		{
// 			title: 'Пенная Вечеринка',
// 			desc: 'Море пены, музыки и веселья! Дети обожают резвиться в облаках безопасной пены. Яркое и запоминающееся событие для любого праздника.',
// 			video: '/videos/shows/foam.mov',
// 		},
// 		{
// 			title: 'Тесла Шоу',
// 			desc: 'Завораживающее электрическое шоу с катушками Тесла. Молнии, разряды, светящиеся лампы и безопасные эксперименты с высоким напряжением.',
// 			video: '/videos/shows/tesla.mp4',
// 		},
// 		{
// 			title: 'Трансформер Шоу',
// 			desc: 'Встреча с настоящими трансформерами! Роботы-гиганты, сражения, фотосессия и интерактивная программа. Мечта любого ребенка становится реальностью.',
// 			video: '/videos/shows/transformers.mp4',
// 		},
// 		{
// 			title: 'Форт-Квест',
// 			desc: 'Командный квест в стиле популярного телешоу "Форт Боярд". Преодоление препятствий, поиск ключей, битва с ветром и неожиданные испытания на ловкость.',
// 			video: '/videos/shows/fort.mp4',
// 		},
// 		{
// 			title: 'Хогвартс-Туса',
// 			desc: 'Волшебная вечеринка в стиле Гарри Поттера. Распределение по факультетам, уроки зельеварения, квиддич и настоящая магия для юных волшебников.',
// 			video: '/videos/shows/hogwarts.mp4',
// 		},
// 		{
// 			title: 'Цифровой Цирк',
// 			desc: 'Современное шоу с цифровыми технологиями. Световое шоу, лазеры, проекции и невероятные спецэффекты создают атмосферу будущего на вашем празднике.',
// 			video: '/videos/shows/digital.mp4',
// 		},
// 	]
// 	return (
// 		<section id='shows' className={styles.section}>
// 			<h2 className={styles.title}>Шоу-программы</h2>
// 			<div className={styles.cards}>
// 				{[1, 2, 3].map(item => (
// 					<div key={item} className={styles.card}>
// 						{/* <div className={styles.cardImage}>
//               <div className={styles.overlayText}>БУМАЖНОЕ ВЕЧЕРИНКА</div>
//             </div> */}
// 						<img
// 							src='/images/show/show.png'
// 							alt='img'
// 							className={styles.cardImage}
// 						/>
// 						<h3 className={styles.cardTitle}>Бумажное вечеринка</h3>
// 						<button className={styles.cardButton}>Подробнее</button>
// 					</div>
// 				))}
// 			</div>
// 			<button className={styles.ctaButton}>Показать все</button>
// 		</section>
// 	)
// }
'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import styles from './ShowPrograms.module.scss'

export default function ShowPrograms() {
	const [visibleCount, setVisibleCount] = useState(6) // Показываем 6 карточек сначала
	const [activeVideo, setActiveVideo] = useState(null)
	const [isPlaying, setIsPlaying] = useState(false)
	const [isFullscreen, setIsFullscreen] = useState(false)
	const videoRefs = useRef([])
	const videoContainerRefs = useRef([])

	const shows = [
		{
			title: 'Блогер Пати',
			desc: 'Зажигательная вечеринка в стиле популярных блогеров. Танцы, конкурсы, челленджи и фотосессия. Ваш ребенок почувствует себя настоящей звездой Instagram!',
			video: '/videos/shows/bloger.mp4',
		},
		{
			title: 'Венздей Квест',
			desc: 'Таинственный квест по мотивам популярного сериала. Раскрывайте загадки, ищите улики и погружайтесь в мрачную атмосферу академии Nevermore.',
			video: '/videos/shows/wednesday.mp4',
		},
		{
			title: 'Зверо-Квест',
			desc: 'Увлекательное приключение с животными. Детей ждут интересные задания, загадки и знакомство с удивительным миром фауны в игровой форме.',
			video: '/videos/shows/zvero.mp4',
		},
		{
			title: 'Игра в Кальмара',
			desc: 'Адреналиновый квест по мотивам нашумевшего сериала. Безопасные версии популярных игр, командные соревнования и море эмоций для смелых участников.',
			video: '/videos/shows/squidgame.mp4',
		},
		{
			title: 'Научное Шоу',
			desc: 'Зрелищные эксперименты и удивительные опыты. Дети увидят химические реакции, физические фокусы и смогут сами поучаствовать в настоящих научных открытиях.',
			video: '/videos/shows/science.mp4',
		},
		{
			title: 'Пенная Вечеринка',
			desc: 'Море пены, музыки и веселья! Дети обожают резвиться в облаках безопасной пены. Яркое и запоминающееся событие для любого праздника.',
			video: '/videos/shows/foam.mov',
		},
		{
			title: 'Тесла Шоу',
			desc: 'Завораживающее электрическое шоу с катушками Тесла. Молнии, разряды, светящиеся лампы и безопасные эксперименты с высоким напряжением.',
			video: '/videos/shows/tesla.mp4',
		},
		{
			title: 'Трансформер Шоу',
			desc: 'Встреча с настоящими трансформерами! Роботы-гиганты, сражения, фотосессия и интерактивная программа. Мечта любого ребенка становится реальностью.',
			video: '/videos/shows/transformers.mp4',
		},
		{
			title: 'Форт-Квест',
			desc: 'Командный квест в стиле популярного телешоу "Форт Боярд". Преодоление препятствий, поиск ключей, битва с ветром и неожиданные испытания на ловкость.',
			video: '/videos/shows/fort.mp4',
		},
		{
			title: 'Хогвартс-Туса',
			desc: 'Волшебная вечеринка в стиле Гарри Поттера. Распределение по факультетам, уроки зельеварения, квиддич и настоящая магия для юных волшебников.',
			video: '/videos/shows/hogwarts.mp4',
		},
		{
			title: 'Цифровой Цирк',
			desc: 'Современное шоу с цифровыми технологиями. Световое шоу, лазеры, проекции и невероятные спецэффекты создают атмосферу будущего на вашем празднике.',
			video: '/videos/shows/digital.mp4',
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
		setVisibleCount(prev => Math.min(prev + 3, shows.length))
	}

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
		<section id='shows' className={styles.section}>
			<h2 className={styles.title}>Шоу-программы</h2>
			<div className={styles.grid}>
				{shows.slice(0, visibleCount).map((show, index) => (
					<div key={index} className={styles.card}>
						<div
							className={styles.cardMedia}
							ref={el => (videoContainerRefs.current[index] = el)}
						>
							{activeVideo === index ? (
								// Показываем видео
								<video
									ref={el => (videoRefs.current[index] = el)}
									src={show.video}
									className={styles.video}
									playsInline
									onClick={e => handleVideoPlay(index, e)}
								/>
							) : (
								// Показываем картинку
								<>
									<img
										src='/images/show/show.png'
										alt={show.title}
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
						<h3 className={styles.cardTitle}>{show.title}</h3>
						<p className={styles.cardDescription}>{show.desc}</p>
						<button
							className={styles.cardButton}
							onClick={() => handleMoreClick(index)}
						>
							{activeVideo === index ? 'Скрыть видео' : 'Подробнее'}
						</button>
					</div>
				))}
			</div>

			{visibleCount < shows.length && (
				<button className={styles.ctaButton} onClick={handleShowMore}>
					Показать все
				</button>
			)}
		</section>
	)
}
