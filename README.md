# Арена Развлечений

Сайт для детских праздников в Томске. Создан на Next.js 16 с App Router, JavaScript и SCSS модулями.

## Структура проекта

- `src/` - исходный код приложения
  - `app/` - директория App Router Next.js
    - `layout.jsx` - корневой layout
    - `page.jsx` - главная страница
    - `globals.css` - глобальные стили
  - `components/` - React компоненты
    - Каждый компонент имеет свою папку с `.jsx` и `.module.scss` файлами
    - `Header/` - навигация
    - `Hero/` - главная секция с розовым фоном
    - `LoftSpaces/` - секция лофт-пространств
    - `Animators/` - секция аниматоров
    - `ShowPrograms/` - шоу-программы
    - `Quests/` - квесты для детей
    - `MasterClasses/` - мастер-классы
    - `NewYear/` - новогодние программы
    - `Graduation/` - выпускные
    - `Reviews/` - отзывы
    - `Contacts/` - контакты и карта
- `public/` - статические ресурсы
  - `images/` - изображения
  - `icons/` - иконки и favicon
  - `fonts/` - кастомные шрифты
  - `videos/` - видео файлы

## Установка

```bash
npm install
```

## Запуск

```bash
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000) в браузере.

## Сборка для продакшена

```bash
npm run build
npm start
```

## Особенности

- ✅ Next.js 16 с App Router
- ✅ JavaScript (JSX)
- ✅ SCSS модули для всех компонентов
- ✅ Адаптивный дизайн
- ✅ Все секции из дизайна Figma
- ✅ Современный UI с градиентами и анимациями
