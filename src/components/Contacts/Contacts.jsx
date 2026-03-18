// import YMap from '../YMap/YMap'
// import styles from './Contacts.module.scss'

// export default function Contacts() {
// 	return (
// 		<section className={styles.section} id='contacts'>
// 			<div className={styles.topSection}>
// 				<div className={styles.cardColumn}>
// 					{/* <div className={styles.card}>

// 						<div className={styles.cardText}>АРЕНА РАЗВЛЕЧЕНИЙ в ТОМСКЕ</div>
// 					</div> */}
// 					<img
// 						src='/images/quest/contacts.png'
// 						alt='img'
// 						className={styles.cardImage}
// 					/>
// 				</div>
// 				<div className={styles.textColumn}>
// 					<h2 className={styles.title}>Контакты</h2>
// 					<div className={styles.info}>
// 						<div className={styles.infoItem}>
// 							<strong>Адрес:</strong> г. Томск, пер. Смоленский 11
// 						</div>
// 						<div className={styles.infoItem}>
// 							<strong>Телефон:</strong>{' '}
// 							<a href='tel:89095431213'>+7 (909) 543-12-13</a>
// 						</div>
// 						<div className={styles.infoItem}>
// 							<strong>Email:</strong>{' '}
// 							<a href='mailto:lala@mail.ru'>lala@mail.ru</a>
// 						</div>
// 						<div className={styles.social}>
// 							<div className={styles.socialTitle}>Социальные сети</div>
// 							<div className={styles.socialIcons}>
// 								{/* <div className={styles.socialIcon}>f</div>
// 								<div className={styles.socialIcon}>📷</div>
// 								<div className={styles.socialIcon}>VK</div> */}
// 								<a
// 									className={styles.socialIcon}
// 									href='https://t.me'
// 									target='_blank'
// 									rel='noopener noreferrer'
// 								>
// 									<div>
// 										<img
// 											src='/images/socials/logos_telegram.png'
// 											alt='telegram'
// 										/>
// 									</div>
// 								</a>
// 								<a
// 									className={styles.socialIcon}
// 									href='https://max.ru'
// 									target='_blank'
// 									rel='noopener noreferrer'
// 								>
// 									<div className='w-10 h-10 bg-[#004530] rounded-full flex items-center justify-center'>
// 										<img src='/images/socials/logos-max.png' alt='max' />
// 									</div>
// 								</a>
// 								<a
// 									className={styles.socialIcon}
// 									href='https://m.vk.com'
// 									target='_blank'
// 									rel='noopener noreferrer'
// 								>
// 									<div>
// 										<img src='/images/socials/logos-vk.png' alt='vk' />
// 									</div>
// 								</a>
// 							</div>
// 						</div>
// 					</div>
// 				</div>
// 			</div>
// 			<div className={styles.map}>
// 				{/* <div className={styles.mapPlaceholder}>
// 					<div className={styles.mapPin}>📍</div>
// 					<div className={styles.mapText}>Карта Томска</div>
// 				</div> */}
// 				<YMap />
// 			</div>
// 			<footer className={styles.footer}>
// 				<div className={styles.footerText}>Арена развлечений</div>
// 				<div className={styles.footerSocial}>
// 					{/* <div className={styles.footerIcon}>f</div>
// 					<div className={styles.footerIcon}>📷</div>
// 					<div className={styles.footerIcon}>VK</div> */}
// 					<a
// 						className={styles.socialIcon}
// 						href='https://t.me'
// 						target='_blank'
// 						rel='noopener noreferrer'
// 					>
// 						<div>
// 							<img src='/images/socials/logos_telegram.png' alt='telegram' />
// 						</div>
// 					</a>
// 					<a
// 						className={styles.socialIcon}
// 						href='https://max.ru'
// 						target='_blank'
// 						rel='noopener noreferrer'
// 					>
// 						<div className='w-10 h-10 bg-[#004530] rounded-full flex items-center justify-center'>
// 							<img src='/images/socials/logos-max.png' alt='max' />
// 						</div>
// 					</a>
// 					<a
// 						className={styles.socialIcon}
// 						href='https://m.vk.com'
// 						target='_blank'
// 						rel='noopener noreferrer'
// 					>
// 						<div>
// 							<img src='/images/socials/logos-vk.png' alt='vk' />
// 						</div>
// 					</a>
// 				</div>
// 			</footer>
// 		</section>
// 	)
// }
import YMap from '../YMap/YMap'
import styles from './Contacts.module.scss'

export default function Contacts() {
	return (
		<section className={styles.section} id='contacts'>
			<div className={styles.topSection}>
				<div className={styles.imageColumn}>
					<img
						src='/images/quest/contacts.png'
						alt='Арена развлечений'
						className={styles.image}
					/>
				</div>
				<div className={styles.textColumn}>
					<h2 className={styles.title}>Контакты</h2>
					<div className={styles.info}>
						<div className={styles.infoItem}>
							<strong>Адрес:</strong> г. Томск, пер. Смоленский 11
						</div>
						<div className={styles.infoItem}>
							<strong>Телефон:</strong>{' '}
							<a href='tel:89095431213'>+7 (909) 543-12-13</a>
						</div>
						<div className={styles.infoItem}>
							<strong>Email:</strong>{' '}
							<a href='mailto:lala@mail.ru'>lala@mail.ru</a>
						</div>
						<div className={styles.social}>
							<div className={styles.socialTitle}>Социальные сети</div>
							<div className={styles.socialIcons}>
								{/* <a
									className={styles.socialIcon}
									href='https://t.me'
									target='_blank'
									rel='noopener noreferrer'
								>
									<img
										src='/images/socials/logos_telegram.png'
										alt='telegram'
									/>
								</a> */}
								<a
									className={styles.socialIcon}
									href='https://max.ru/u/f9LHodD0cOJaFVvW9nUbeGO6KyU4YV4ECO1_CYWK8Iel22tTaDmxsz4THJA'
									target='_blank'
									rel='noopener noreferrer'
								>
									<div className='w-10 h-10 bg-[#004530] rounded-full flex items-center justify-center'>
										<img src='/images/socials/logos-max.png' alt='max' />
									</div>
								</a>
								<a
									className={styles.socialIcon}
									href='https://vk.com/animatori_tomsk'
									target='_blank'
									rel='noopener noreferrer'
								>
									<img src='/images/socials/logos-vk.png' alt='vk' />
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className={styles.map}>
				<YMap />
			</div>
			<footer className={styles.footer}>
				<div className={styles.footerText}>Арена развлечений</div>
				<div className={styles.footerSocial}>
					{/* <a
						className={styles.socialIcon}
						href='https://t.me'
						target='_blank'
						rel='noopener noreferrer'
					>
						<img src='/images/socials/logos_telegram.png' alt='telegram' />
					</a> */}
					<a
						className={styles.socialIcon}
						href='https://max.ru/u/f9LHodD0cOJaFVvW9nUbeGO6KyU4YV4ECO1_CYWK8Iel22tTaDmxsz4THJA'
						target='_blank'
						rel='noopener noreferrer'
					>
						<div className='w-10 h-10 bg-[#004530] rounded-full flex items-center justify-center'>
							<img src='/images/socials/logos-max.png' alt='max' />
						</div>
					</a>
					<a
						className={styles.socialIcon}
						href='https://vk.com/animatori_tomsk'
						target='_blank'
						rel='noopener noreferrer'
					>
						<img src='/images/socials/logos-vk.png' alt='vk' />
					</a>
				</div>
			</footer>
		</section>
	)
}
