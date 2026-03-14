// 'use client'
// import { useCallback, useEffect, useRef, useState } from 'react'

// const YMap = ({ coordinates = [55.36312, 86.069582] }) => {
// 	const mapRef = useRef(null)
// 	const mapInstance = useRef(null)
// 	const placemarkRef = useRef(null)
// 	const [isApiLoaded, setIsApiLoaded] = useState(false)
// 	const [mapError, setMapError] = useState(null)

// 	// Функция инициализации карты
// 	const initMap = useCallback(() => {
// 		if (!mapRef.current || !window.ymaps) return

// 		try {
// 			// Создаем карту, если ее еще нет
// 			if (!mapInstance.current) {
// 				mapInstance.current = new window.ymaps.Map(mapRef.current, {
// 					center: coordinates,
// 					zoom: 16,
// 					controls: ['zoomControl', 'fullscreenControl'],
// 				})
// 			}

// 			// Удаляем старую метку, если есть
// 			if (placemarkRef.current) {
// 				mapInstance.current.geoObjects.remove(placemarkRef.current)
// 			}

// 			// Создаем кастомную метку
// 			const placemark = new window.ymaps.Placemark(
// 				coordinates,
// 				{
// 					hintContent: 'VOX',
// 					balloonContent: `
//             <div style="padding: 10px;">
//               <strong>Вокальная студия VOX</strong><br/>
//               ул. Николая Островского, 7А<br/>
//               <a href="tel:+79059169286">+7 905 916-92-86</a>
//             </div>
//           `,
// 				},
// 				{
// 					preset: 'islands#redDotIcon',
// 					iconColor: '#FF69B4', // Розовый цвет под ваш дизайн
// 				},
// 			)

// 			placemarkRef.current = placemark
// 			mapInstance.current.geoObjects.add(placemark)

// 			// Центрируем карту на метке
// 			mapInstance.current.setCenter(coordinates)
// 		} catch (error) {
// 			console.error('Ошибка при инициализации карты:', error)
// 			setMapError('Не удалось загрузить карту')
// 		}
// 	}, [coordinates])

// 	// Загрузка API Яндекс.Карт
// 	useEffect(() => {
// 		// Проверяем, загружен ли уже API
// 		if (window.ymaps) {
// 			window.ymaps.ready(() => {
// 				setIsApiLoaded(true)
// 				initMap()
// 			})
// 			return
// 		}

// 		// Загружаем API
// 		const script = document.createElement('script')
// 		script.src =
// 			'https://api-maps.yandex.ru/2.1/?apikey=35e69fa1-b8ab-4812-b2ff-bcb4f27cc874&lang=ru_RU'
// 		script.async = true

// 		script.onload = () => {
// 			window.ymaps.ready(() => {
// 				setIsApiLoaded(true)
// 				initMap()
// 			})
// 		}

// 		script.onerror = () => {
// 			setMapError('Ошибка загрузки карты. Проверьте подключение к интернету.')
// 		}

// 		document.body.appendChild(script)

// 		return () => {
// 			// Удаляем скрипт при размонтировании
// 			if (script.parentNode) {
// 				document.body.removeChild(script)
// 			}
// 			// Уничтожаем карту
// 			if (mapInstance.current) {
// 				mapInstance.current.destroy()
// 			}
// 		}
// 	}, [initMap])

// 	// Обновляем карту при изменении координат
// 	useEffect(() => {
// 		if (isApiLoaded && window.ymaps && mapInstance.current) {
// 			initMap()
// 		}
// 	}, [coordinates, isApiLoaded, initMap])

// 	// Обработка изменения размера окна
// 	useEffect(() => {
// 		const handleResize = () => {
// 			if (mapInstance.current) {
// 				mapInstance.current.container.fitToViewport()
// 			}
// 		}

// 		window.addEventListener('resize', handleResize)
// 		return () => window.removeEventListener('resize', handleResize)
// 	}, [])

// 	if (mapError) {
// 		return (
// 			<div className='ymap map flex items-center justify-center bg-gray-100 text-gray-500'>
// 				{mapError}
// 			</div>
// 		)
// 	}

// 	return (
// 		<div
// 			ref={mapRef}
// 			className='ymap map w-full h-full min-h-[400px] rounded-2xl overflow-hidden shadow-lg'
// 			style={{
// 				width: '100%',
// 				height: '100%',
// 				minHeight: '400px',
// 				backgroundColor: '#f0f0f0',
// 			}}
// 		/>
// 	)
// }

// export default YMap
'use client'
import { useCallback, useEffect, useRef, useState } from 'react'

// Глобальный флаг для отслеживания загрузки API
if (typeof window !== 'undefined') {
	window.YMAPS_LOADED = window.YMAPS_LOADED || false
}

const YMap = ({ coordinates = [56.4779, 84.9888] }) => {
	const mapRef = useRef(null)
	const mapInstance = useRef(null)
	const placemarkRef = useRef(null)
	const [isApiLoaded, setIsApiLoaded] = useState(false)
	const [mapError, setMapError] = useState(null)

	// Функция инициализации карты
	const initMap = useCallback(() => {
		if (!mapRef.current || !window.ymaps) return

		try {
			if (!mapInstance.current) {
				mapInstance.current = new window.ymaps.Map(mapRef.current, {
					center: coordinates,
					zoom: 16,
					controls: ['zoomControl', 'fullscreenControl'],
				})
			}

			if (placemarkRef.current) {
				mapInstance.current.geoObjects.remove(placemarkRef.current)
			}

			const placemark = new window.ymaps.Placemark(
				coordinates,
				{
					hintContent: 'ВОКС',
					balloonContent: `
            <div style="padding: 10px;">
              <strong>АРЕНА РАЗВЛЕЧЕНИЙ в ТОМСКЕ</strong><br/>
              г. Томск, пер. Смоленский 11<br/>
              <a href="tel:89095431213">+7 (909) 543-12-13</a>
            </div>
          `,
				},
				{
					preset: 'islands#redDotIcon',
					iconColor: '#FF69B4',
				},
			)

			placemarkRef.current = placemark
			mapInstance.current.geoObjects.add(placemark)
			mapInstance.current.setCenter(coordinates)
		} catch (error) {
			console.error('Ошибка при инициализации карты:', error)
			setMapError('Не удалось загрузить карту')
		}
	}, [coordinates])

	// Загрузка API Яндекс.Карт
	useEffect(() => {
		// Если API уже загружен
		if (window.ymaps) {
			window.ymaps.ready(() => {
				setIsApiLoaded(true)
				initMap()
			})
			return
		}

		// Если API уже загружается другим компонентом
		if (window.YMAPS_LOADED) {
			const checkYmaps = setInterval(() => {
				if (window.ymaps) {
					clearInterval(checkYmaps)
					window.ymaps.ready(() => {
						setIsApiLoaded(true)
						initMap()
					})
				}
			}, 100)

			return () => clearInterval(checkYmaps)
		}

		// Загружаем API
		window.YMAPS_LOADED = true

		const script = document.createElement('script')
		script.src =
			'https://api-maps.yandex.ru/2.1/?apikey=35e69fa1-b8ab-4812-b2ff-bcb4f27cc874&lang=ru_RU'
		script.async = true

		script.onload = () => {
			window.ymaps.ready(() => {
				setIsApiLoaded(true)
				initMap()
			})
		}

		script.onerror = () => {
			setMapError('Ошибка загрузки карты. Проверьте подключение к интернету.')
			window.YMAPS_LOADED = false
		}

		document.body.appendChild(script)

		return () => {
			// НЕ удаляем скрипт, только очищаем карту
			if (mapInstance.current) {
				mapInstance.current.destroy()
				mapInstance.current = null
			}
		}
	}, [initMap])

	useEffect(() => {
		if (isApiLoaded && window.ymaps && mapInstance.current) {
			initMap()
		}
	}, [coordinates, isApiLoaded, initMap])

	useEffect(() => {
		const handleResize = () => {
			if (mapInstance.current) {
				mapInstance.current.container.fitToViewport()
			}
		}

		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	}, [])

	if (mapError) {
		return (
			<div className='ymap map flex items-center justify-center bg-gray-100 text-gray-500 min-h-[400px] rounded-2xl'>
				{mapError}
			</div>
		)
	}

	return (
		<div
			ref={mapRef}
			className='ymap map w-full h-full min-h-[400px] rounded-2xl overflow-hidden shadow-lg'
			style={{
				width: '100%',
				height: '100%',
				minHeight: '400px',
				backgroundColor: '#f0f0f0',
			}}
		/>
	)
}

export default YMap
