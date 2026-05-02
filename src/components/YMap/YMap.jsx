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

// Глобальный флаг, чтобы API загружался один раз на страницу
if (typeof window !== 'undefined') {
  window.YMAPS_LOADED = window.YMAPS_LOADED || false
}

/**
 * Компонент Яндекс.Карты с поддержкой нескольких точек и фиксированным центром.
 *
 * @param {Object} props
 * @param {[number, number]} props.center – центр карты (по умолчанию [56.4779, 84.9888])
 * @param {Array<{ id: string|number, coordinates: [number, number], hintContent?: string, balloonContent?: string }>} props.points – массив точек
 * @param {number} [props.zoom] – начальный зум (используется, если точек <= 1, иначе подбирается автоматически)
 */
const YMap = ({ center = [56.4779, 84.9888], points = [
    {
      id: 'glav',                         // ← центральная точка
      coordinates: [56.4779, 84.9888],
      hintContent: 'ВОКС',
      balloonContent: '<strong>пер. Смоленский 11</strong>',
    },
    {
      id: 'altayskaya',
      coordinates: [56.480897, 84.983536],   // Алтайская, 72
      hintContent: 'Алтайская, 72',
      balloonContent: '<strong>Алтайская, 72</strong>',
    },
    {
      id: 'transportnaya',
      coordinates: [56.501024, 84.994855],   // Транспортная, 1а
      hintContent: 'Транспортная, 1а',
      balloonContent: '<strong>Транспортная, 1а</strong>',
    },
    {
      id: 'ilmera',
      coordinates: [56.505912, 84.969217],   // Карла Ильмера, 10/2
      hintContent: 'Карла Ильмера, 10/2',
      balloonContent: '<strong>Карла Ильмера, 10/2</strong>',
    },
    {
      id: 'achinskaya',
      coordinates: [56.492840, 84.966388],   // Ачинская, 9
      hintContent: 'Ачинская, 9',
      balloonContent: '<strong>Ачинская, 9</strong>',
    },
    {
      id: 'vodyanaya',
      coordinates: [56.506051, 84.944568],   // Водяная, 37
      hintContent: 'Водяная, 37',
      balloonContent: '<strong>Водяная, 37</strong>',
    },
  	], zoom = 16 }) => {
  const mapRef = useRef(null)
  const mapInstance = useRef(null)
  const [isApiLoaded, setIsApiLoaded] = useState(false)
  const [mapError, setMapError] = useState(null)

  // Инициализация карты и расстановка меток
  const initMap = useCallback(() => {
    if (!mapRef.current || !window.ymaps) return

    try {
      // Создаём карту единожды
      if (!mapInstance.current) {
        mapInstance.current = new window.ymaps.Map(mapRef.current, {
          center: center,     // фиксированный центр
          zoom: zoom,
          controls: ['zoomControl', 'fullscreenControl'],
        })
      }

      // Удаляем все старые метки
      mapInstance.current.geoObjects.removeAll()

      // Если массив точек пуст – используем центр как единственную точку (стандартное поведение)
      const pointsToShow =
        points.length > 0
          ? points
          : [
              {
                id: 'default',
                coordinates: center,
                hintContent: 'ВОКС',
                balloonContent: 'АРЕНА РАЗВЛЕЧЕНИЙ в ТОМСКЕ',
              },
            ]

      // Создаём Placemark для каждой точки
      pointsToShow.forEach((point) => {
        const placemark = new window.ymaps.Placemark(
          point.coordinates,
          {
            hintContent: point.hintContent || point.hint || '',
            balloonContent: point.balloonContent || '',
          },
          {
            preset: 'islands#redDotIcon',
            iconColor: '#FF69B4',
          }
        )
        mapInstance.current.geoObjects.add(placemark)
      })

      // Если точек несколько – автоматически масштабируем карту, чтобы все были видны
      if (pointsToShow.length > 1) {
        const bounds = mapInstance.current.geoObjects.getBounds()
        if (bounds) {
          mapInstance.current.setBounds(bounds, {
            checkZoomRange: true,
            zoomMargin: 20,   // небольшой отступ от краёв
          })
        }
      } else {
        // Одна точка – просто центрируем её
        mapInstance.current.setCenter(pointsToShow[0].coordinates)
      }
    } catch (error) {
      console.error('Ошибка при инициализации карты:', error)
      setMapError('Не удалось загрузить карту')
    }
  }, [center, points, zoom])

  // Загрузка API Яндекс.Карт
  useEffect(() => {
    if (window.ymaps) {
      window.ymaps.ready(() => {
        setIsApiLoaded(true)
        initMap()
      })
      return
    }

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
      if (mapInstance.current) {
        mapInstance.current.destroy()
        mapInstance.current = null
      }
    }
  }, [initMap])

  // Перерисовываем карту при изменении пропсов
  useEffect(() => {
    if (isApiLoaded && window.ymaps && mapInstance.current) {
      initMap()
    }
  }, [center, points, isApiLoaded, initMap])

  // Ресайз карты
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