'use client'

import { useEffect, useState } from 'react'
import styles from './MasterClasses.module.scss'

export default function MasterClasses() {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [selectedMaster, setSelectedMaster] = useState(null)

	const masters = [
		{
			title: 'Бомбочка для ванны',
			desc: 'Создаем ароматные шипучие бомбочки для ванны своими руками. Ребенок выбирает цвета, запахи и формочки, смешивает ингредиенты и узнает основы химии. Готовая бомбочка украсит любой праздник и подарит ароматное купание.',
			src: '/images/masters/bomb.webp',
		},
		{
			title: 'Крио Коктейль',
			desc: 'Увлекательное научное шоу с жидким азотом. Дети готовят дымящиеся коктейли, узнают о свойствах низких температур и наблюдают за удивительными превращениями. Каждый участник пробует результат эксперимента.',
			src: '/images/masters/cocktail.webp',
		},
		{
			title: 'ТабаЛапки',
			desc: 'Создаем мягкие игрушечные лапки-антистресс из таба (разновидность фоамирана). Развиваем мелкую моторику, творческое мышление и уносим домой милый сувенир, который приятно мять в руках.',
			src: '/images/masters/taba.webp',
		},
		{
			title: 'Слаймы',
			desc: 'Самый популярный мастер-класс! Создаем яркие слаймы с блестками, ароматами и разными наполнителями. Дети учатся смешивать ингредиенты и забирают готовую игрушку домой в специальном контейнере.',
			src: '/images/masters/slaym.webp',
		},
		{
			title: 'Браслеты из бисера',
			desc: 'Учимся плести модные браслеты из бисера. Развиваем творческое мышление, чувство стиля и мелкую моторику. Каждый ребенок создает уникальное украшение и забирает его с собой.',
			src: '/images/masters/bracelet.webp',
		},
		{
			title: 'Крио Мороженое',
			desc: 'Вкусное научное шоу! Готовим настоящее мороженое с помощью жидкого азота прямо на глазах у детей. Удивительные облака пара, интересные эксперименты и дегустация свежеприготовленного мороженого.',
			src: '/images/masters/icecreem.webp',
		},
	]

	const openModal = master => {
		setSelectedMaster(master)
		setIsModalOpen(true)
		document.body.style.overflow = 'hidden'
	}

	const closeModal = () => {
		setIsModalOpen(false)
		setSelectedMaster(null)
		// document.body.style.overflow = 'unset'
	}

	// Закрытие по клику на оверлей
	const handleOverlayClick = e => {
		if (e.target === e.currentTarget) {
			closeModal()
		}
	}

	// Закрытие по Escape
	useEffect(() => {
		const handleEsc = e => {
			if (e.key === 'Escape') closeModal()
		}

		if (isModalOpen) {
			window.addEventListener('keydown', handleEsc)
		}

		return () => {
			window.removeEventListener('keydown', handleEsc)
		}
	}, [isModalOpen])

	// Очистка при размонтировании
	useEffect(() => {
		return () => {
			document.body.style.overflow = 'unset'
		}
	}, [])

	return (
		<section id='master-classes' className={styles.section}>
			<div className={styles.topSection}>
				<div className={styles.imageColumn}>
					<img src='/images/quest/master.png' alt='Мастер-классы' />
				</div>
				<div className={styles.textColumn}>
					<h2 className={styles.title}>Мастер-классы для детей</h2>
					<div className={styles.description}>
						<p>
							Развивающие мастер-классы для детей всех возрастов. Мы учим
							создавать красивые поделки, проводим научные эксперименты и
							развиваем творческие способности в игровой форме.
						</p>
						<p>
							Каждый мастер-класс разработан с учетом возрастных особенностей
							детей от 4 до 14 лет. Наши преподаватели имеют большой опыт работы
							с детьми и знают, как сделать занятие интересным и полезным.
						</p>
						<p>
							Все материалы предоставляются. Дети уносят домой свои творческие
							работы и массу положительных эмоций. Продолжительность: 30-45
							минут.
						</p>
					</div>
					<button className={styles.button}>Все мастер-классы</button>
				</div>
			</div>

			<div className={styles.cards}>
				{masters.map((item, index) => (
					<div key={index} className={styles.card}>
						<div className={styles.cardImageContainer}>
							<img
								src={item.src}
								alt={item.title}
								className={styles.cardImage}
							/>
							<div className={styles.cardOverlay}>
								<button
									className={styles.viewButton}
									onClick={() => openModal(item)}
								>
									<svg
										width='30'
										height='30'
										viewBox='0 0 24 24'
										fill='none'
										stroke='#333'
										strokeWidth='2'
									>
										<circle cx='11' cy='11' r='8' />
										<line x1='21' y1='21' x2='16.65' y2='16.65' />
									</svg>
								</button>
							</div>
						</div>
						<h3 className={styles.cardTitle}>{item.title}</h3>
						<p className={styles.cardDescription}>{item.desc}</p>
						<button
							className={styles.cardButton}
							onClick={() => openModal(item)}
						>
							Подробнее
						</button>
					</div>
				))}
			</div>

			<a href='#loft' className={styles.link}>
				Наши лофт-пространства для Мастер-классов
			</a>

			{/* Модальное окно */}
			{isModalOpen && selectedMaster && (
				<div className={styles.modalOverlay} onClick={handleOverlayClick}>
					<div className={styles.modal}>
						<button className={styles.modalClose} onClick={closeModal}>
							×
						</button>
						<div className={styles.modalContent}>
							<img
								src={selectedMaster.src}
								alt={selectedMaster.title}
								className={styles.modalImage}
							/>
							<div className={styles.modalInfo}>
								<h3 className={styles.modalTitle}>{selectedMaster.title}</h3>
								<p className={styles.modalDesc}>{selectedMaster.desc}</p>
								<button className={styles.modalButton}>Записаться</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</section>
	)
}
