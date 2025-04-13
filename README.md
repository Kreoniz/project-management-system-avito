# Проект: Э!-Тикет
«Возьми тикет - и не надо будет говорить "Э!"»

![Скрин главного экрана](https://github.com/kreoniz/project-management-system-avito/raw/main/images/homepage-screenshot.png)

Система управления проектами, [тестовое задание на стажировку в авито](https://github.com/avito-tech/tech-internship/tree/main/Tech%20Internships/Frontend/Frontend-trainee-assignment-spring-2025).

## Оглавление

1. [Структура проекта](#структура-проекта)
2. [Зависимости](#зависимости)
3. [Установка и запуск frontend части](#установка-и-запуск-frontend-части)
4. [Запуск проекта](#запуск-проекта)
5. [Дизайн и скриншоты](#дизайн-и-скриншоты)


## Структура проекта

```
frontend/src/
│
├── api/
│   ├── client.ts          # HTTP клиент (AxiosInstance)
│   └── index.ts           # Экспорт всех API запросов
│
├── components/            # UI компоненты
│   ├── ...
│   ├── tasks/             # Компоненты задач
│   │   ├── __tests__/     # Папки с юнит тестами
│   ├── theme/             # Темы и стилизация
│   └── ui/                # UI элементы от shadcn/ui
│
├── hooks/                 # Кастомные хуки
│   └── index.ts
│
├── layouts/               # Лэйауты
│   └── main-layout.tsx
│
├── lib/                   # Вспомогательные утилиты
│   └── utils.ts           # Общие функции-хелперы
│
├── pages/                 # Страницы приложения
│   ├── ...
│   └── tasks-page.tsx     # Страница задач
│
├── routes/                # Маршрутизация
│   └── app-router.tsx     # Конфигурация роутера
│
├── stores/                # Сторы (Zustand)
│   ├── useAppStore.ts     # Глобальное состояние
│   ├── ...
│   └── index.ts           # Экспорт сторов
│
├── tests/                 # Тесты
│   └── setup.ts           # Конфиг тестов
│
├── types/                 # Типы TypeScript
│   ├── ...
│   └── index.ts           # Экспорт типов
│
├── index.css              # Глобальные стили (+ Tailwind/shadcn)
├── main.tsx               # Точка входа
└── vite-env.d.ts          # Типы Vite

server/                 # Серверная часть приложения
docker-compose.yml      # Конфигурация Docker
```

## Зависимости

Зависимости, относящиеся к обязательным тех. требованиям:
- [React 19](https://react.dev)
- [React Router Dom](https://reactrouter.com/start/declarative/installation)

Необязательные технологии с пояснением выбора:
- [TypeScript](https://www.typescriptlang.org) - суперсет JavaScript (компилятор), предоставляющий статическую типизацию. С ним работать и быстрее, и приятнее.
- [Vite](https://vitejs.dev) - Наилучший инструмент для настройки среды разработки, удобно начинать проект, намного быстрее чем webpack.
- [Zustand](https://zustand-demo.pmnd.rs) - Простая библиотека для управления состоянием с persistence (возможность сериализовать данные в localStorage)
- [Tailwind CSS](https://tailwindcss.com) - Удобное решение для стилизации сайтов. Атомарные классы очень просты в применении, не нужно прыгать между HTML и CSS как это делали еще относительно недавно :). Также от части является дизайн системой с хорошими цветами, паддингами и т. д.
- [shadcn/ui](https://ui.shadcn.com) - Библиотека компонент с классным, минималистичным оформлением по умолчанию. Под капотом Radix UI (который является headless системой), но сами компоненты все скачиваются прямиком в проект - в папку `/src/components/ui/`, что позволяет их кастомизировать как угодно.
- [React Hook Form](https://react-hook-form.com) - Рекомендуется к использованию shadcn/ui, упрощает работу над динамическими формами.
- [Vitest](https://vitest.dev) + [React Testing Library
](https://testing-library.com/) -  Библиотеки для Unit-тестирования 
- [ESLint](https://eslint.org/) - Помогает ловить ошибки в коде на этапах компиляции/написания кода
- [Prettier](https://prettier.io/) - Помогает соблюдать consistency в написании кода

## Установка и запуск frontend части

1. **Клонировать репозиторий**
   ```bash
   git clone git@github.com:Kreoniz/project-management-system-avito.git
   cd project-management-system-avito/frontend
   ```

2. **Установить зависимости**
   ```bash
   pnpm install
   ```

3. **Запустить в режиме разработки**
   ```bash
   pnpm dev
   ```

4. **Доступные npm-скрипты**
   - Запуск в режиме разработки: `pnpm dev`
   - Сборка для production: `pnpm build`
   - Линтинг кода: `pnpm lint`
   - Форматирование кода: `pnpm format`
   - Запуск тестов: `pnpm test`

## Запуск проекта

Проект можно развернуть с помощью Docker:
```bash
docker-compose up --build
```
