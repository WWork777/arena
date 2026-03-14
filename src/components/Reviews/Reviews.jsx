// import styles from './Reviews.module.scss'

// export default function Reviews() {
//   return (
//     <section className={styles.section}>
//       <div className={styles.header}>
//         <h2 className={styles.title}>Отзывы</h2>
//         <div className={styles.rating}>
//           <div className={styles.ratingValue}>5.0</div>
//           <div className={styles.stars}>
//             {[1, 2, 3, 4, 5].map((star) => (
//               <span key={star} className={styles.star}>★</span>
//             ))}
//           </div>
//           <button className={styles.reviewButton}>Оставить отзыв</button>
//         </div>
//       </div>
//       <div className={styles.cards}>
//         {[
//           { name: 'Иван Иванов', text: 'Отличная организация праздника! Дети были в восторге, все прошло на высшем уровне.' },
//           { name: 'Мария Петрова', text: 'Прекрасные аниматоры, интересные программы. Обязательно вернемся еще раз!' },
//           { name: 'Алексей Сидоров', text: 'Организовали выпускной для детского сада. Все родители остались довольны.' },
//           { name: 'Елена Козлова', text: 'Мастер-классы просто замечательные! Дети научились многому новому.' },
//         ].map((review, index) => (
//           <div key={index} className={styles.card}>
//             <div className={styles.cardHeader}>
//               <div className={styles.avatar}></div>
//               <div className={styles.cardInfo}>
//                 <div className={styles.name}>{review.name}</div>
//                 <div className={styles.cardStars}>
//                   {[1, 2, 3, 4, 5].map((star) => (
//                     <span key={star} className={styles.star}>★</span>
//                   ))}
//                 </div>
//               </div>
//               <div className={styles.cardIcon}>⋮</div>
//             </div>
//             <p className={styles.reviewText}>{review.text}</p>
//           </div>
//         ))}
//       </div>
//     </section>
//   )
// }
'use client'
import { useRef } from 'react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import styles from './Reviews.module.scss'

export default function Reviews() {
	const swiperRef = useRef(null)

	const reviews = [
		{
			name: 'Иван Иванов',
			text: 'Отличная организация праздника! Дети были в восторге, все прошло на высшем уровне.',
		},
		{
			name: 'Мария Петрова',
			text: 'Прекрасные аниматоры, интересные программы. Обязательно вернемся еще раз!',
		},
		{
			name: 'Алексей Сидоров',
			text: 'Организовали выпускной для детского сада. Все родители остались довольны.',
		},
		{
			name: 'Елена Козлова',
			text: 'Мастер-классы просто замечательные! Дети научились многому новому.',
		},
		{
			name: 'Дмитрий Соколов',
			text: 'Отмечали день рождения сына. Аниматоры сумели увлечь всех детей, родители тоже не скучали.',
		},
		{
			name: 'Анна Морозова',
			text: 'Заказывали шоу мыльных пузырей. Дети были в полном восторге! Спасибо большое!',
		},
	]

	return (
		<section id='reviews' className={styles.section}>
			<div className={styles.header}>
				<h2 className={styles.title}>Отзывы</h2>
				<div className={styles.rating}>
					<div className={styles.ratingValue}>5.0</div>
					<div className={styles.stars}>
						{[1, 2, 3, 4, 5].map(star => (
							<span key={star} className={styles.star}>
								★
							</span>
						))}
					</div>
					<button className={styles.reviewButton}>Оставить отзыв</button>
				</div>
			</div>

			<div className={styles.sliderContainer}>
				<Swiper
					modules={[Navigation, Pagination, Autoplay]}
					spaceBetween={24}
					slidesPerView={1}
					onBeforeInit={swiper => {
						swiperRef.current = swiper
					}}
					pagination={{
						clickable: true,
						el: `.${styles.swiperPagination}`,
					}}
					autoplay={{
						delay: 5000,
						disableOnInteraction: false,
					}}
					breakpoints={{
						640: {
							slidesPerView: 2,
						},
						968: {
							slidesPerView: 3,
						},
						1200: {
							slidesPerView: 4,
						},
					}}
					className={styles.mySwiper}
				>
					{reviews.map((review, index) => (
						<SwiperSlide key={index}>
							<div className={styles.card}>
								<div className={styles.cardHeader}>
									<div className={styles.avatar}></div>
									<div className={styles.cardInfo}>
										<div className={styles.name}>{review.name}</div>
										<div className={styles.cardStars}>
											{[1, 2, 3, 4, 5].map(star => (
												<span key={star} className={styles.star}>
													★
												</span>
											))}
										</div>
									</div>
									<div className={styles.cardIcon}>⋮</div>
								</div>
								<p className={styles.reviewText}>{review.text}</p>
							</div>
						</SwiperSlide>
					))}
				</Swiper>

				<div className={styles.sliderControls}>
					<button
						className={`${styles.navButton} ${styles.navButtonPrev}`}
						onClick={() => swiperRef.current?.slidePrev()}
					>
						←
					</button>
					<div className={styles.swiperPagination}></div>
					<button
						className={`${styles.navButton} ${styles.navButtonNext}`}
						onClick={() => swiperRef.current?.slideNext()}
					>
						→
					</button>
				</div>
			</div>
		</section>
	)
}
