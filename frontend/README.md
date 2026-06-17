# Ресурс Атом — лендинг

Одностраничный сайт по сопровождению лицензирования в атомной отрасли (Ростехнадзор).

## Стек

- Next.js 16 (App Router) + React 19
- TypeScript
- SCSS-модули
- keen-slider, framer-motion

## Разработка

```bash
npm install
npm run dev
```

Открыть http://localhost:3000

## Сборка

```bash
npm run build
npm run start
```

## Структура

- `src/app` — роутинг, метаданные, контент (`data.ts`)
- `src/widgets` — секции лендинга (Header, Hero, Stats, Activities, ClientsBenefits, Licensing) и BurgerMenu
- `src/shared` — переиспользуемый UI (Button, иконки) и общие типы
