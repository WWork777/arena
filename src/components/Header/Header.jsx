'use client'

import Image from 'next/image'
import { useState } from 'react'
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
					{/* Telegram */}
					<a
						href='https://t.me'
						target='_blank'
						rel='noopener noreferrer'
						className={styles.socialIcon}
						aria-label='Telegram'
					>
						<Image
							src='/icons/Header/telegram.svg'
							alt='Telegram'
							width={46}
							height={46}
						/>
					</a>

					{/* MAX */}
					<a
						href='https://max.ru'
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
