'use client'

import Image from 'next/image'
import { useState } from 'react'
import { MdPhone } from 'react-icons/md'
import styles from './Header.module.scss'

export default function Header() {
	const [isMenuOpen, setIsMenuOpen] = useState(false)

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen)
	}

	const menuItems = [
		{ name: 'главная', href: '#home' },
		{ name: 'лофт-пространства', href: '#loft' },
		{ name: 'аниматоры', href: '#animators' },
		{ name: 'шоу-программы', href: '#shows' },
		{ name: 'квесты', href: '#quests' },
		{ name: 'мастер-классы', href: '#master-classes' },
		{ name: 'новый год', href: '#new-year' },
		{ name: 'выпускной', href: '#graduation' },
		{ name: 'отзывы', href: '#reviews' },
		{ name: 'контакты', href: '#contacts' },
	]

	return (
		<header className={styles.header}>
			<div className={styles.container}>
				{/* Логотип */}
				<div className={styles.logo}>
					<div className={styles.logoCircle}>
						<Image
							src='/icons/Header/logo.png'
							alt='Логотип'
							width={63}
							height={61}
							className={styles.logoImage}
						/>
					</div>
				</div>

				{/* Навигация */}
				<nav className={styles.nav}>
					<a href='#about' className={styles.navLink}>
						О нас
					</a>
					<a href='#faq' className={styles.navLink}>
						Вопрос-ответ
					</a>
					<a href='#contacts' className={styles.navLink}>
						Контакты
					</a>
				</nav>

				{/* Иконки соцсетей и меню */}
				<div className={styles.rightSection}>
					<a href='tel:+79095431213' className={styles.phone_number}>
						+7(909)-543-12-13
					</a>
					<a href='tel:+79095431213' className={styles.phone_icon}>
						<div className={styles.phone_icon_wrap}>
							<MdPhone size={30} color='white' />
						</div>
					</a>
					{/* VK */}
					<a
						href='https://vk.com/animatori_tomsk'
						target='_blank'
						rel='noopener noreferrer'
						className={styles.socialIcon}
						aria-label='VK'
					>
						<Image
							src='/images/socials/logos-vk.png'
							alt='VK'
							width={46}
							height={46}
						/>
					</a>

					{/* MAX */}
					<a
						href='https://max.ru/u/f9LHodD0cOJaFVvW9nUbeGO6KyU4YV4ECO1_CYWK8Iel22tTaDmxsz4THJA'
						target='_blank'
						rel='noopener noreferrer'
						className={styles.socialIcon}
						aria-label='MAX'
					>
						<div className={styles.maxIcon}>
							<Image
								src='/icons/Header/MAX.svg'
								alt='MAX'
								width={31}
								height={30}
							/>
						</div>
					</a>

					{/* Кнопка меню */}
					<button
						className={styles.menuButton}
						onClick={toggleMenu}
						aria-label='Меню'
						aria-expanded={isMenuOpen}
					>
						<span className={styles.menuLine}></span>
						<span className={styles.menuLine}></span>
						<span className={styles.menuLine}></span>
					</button>
				</div>
			</div>

			{/* Выпадающее меню */}
			{isMenuOpen && (
				<div className={styles.menu}>
					<div className={styles.menuContent}>
						{menuItems.map((item, index) => (
							<a
								key={index}
								href={item.href}
								className={styles.menuItem}
								onClick={() => setIsMenuOpen(false)}
							>
								{item.name}
							</a>
						))}
					</div>
				</div>
			)}
		</header>
	)
}
