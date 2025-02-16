# Avito Clone

Avito-клон на React + TypeScript с сервером на Express.

## Запуск проекта

1. Установите зависимости:
   ```sh
   npm install
   ```
2. Запустите проект:
   ```sh
   npm start
   ```

## Стек технологий

**Клиент**:

- React + TypeScript – удобный и масштабируемый фронтенд.

- Redux Toolkit – для управления состоянием.

- React Router – маршрутизация внутри приложения.

- Material UI – стилизованные UI-компоненты.

**Сервер**:

- Node.js + Express – бэкенд для обработки запросов.

**Тестирование**:

- Jest, Cypress

## Обоснование выбора технологий

1. **Почему React + TypeScript?**

   TypeScript помогает избежать ошибок, делает код понятнее и удобнее для поддержки. Использование React с TypeScript
   также улучшает автодополнение и поддержку типов, что делает разработку более предсказуемой.

2. **Почему Redux Toolkit?**

   Redux Toolkit упрощает управление состоянием, сокращает объем кода и делает его более декларативным. С ним легче
   работать с асинхронными операциями и выполнять другие операции с состоянием, обеспечивая предсказуемость и удобство.

3. **Почему Material UI?**

   Material UI предоставляет готовые компоненты, стилизованные в соответствии с Material Design, что ускоряет
   разработку. Это позволяет сфокусироваться на функционале, а не на написании CSS, а также обеспечивает единообразие
   дизайна интерфейса.

## 📌 Дополнительные команды

- **Запуск сервера отдельно:**

  ```bash
  npm run server

  ```

- **Запуск клиента отдельно:**
  ```bash
  npm run client

  ```

## Структура проекта Avito-clone-client

```
├─ README.md
├─ cypress
│  ├─ downloads
│  ├─ e2e
│  │  └─ ads.cy.tsx
│  ├─ fixtures
│  │  ├─ adDetail.json
│  │  ├─ example.json
│  │  └─ mockAds.json
│  └─ tsconfig.json
├─ public
│  └─ index.html
├─ server
│  ├─ app.js
│  ├─ package-lock.json
│  └─ package.json
└─ src
   ├─ components
   │  ├─ app.tsx
   │  ├─ header.tsx
   │  ├─ ad
   │  │  ├─ ad.tsx
   │  │  └─ adUI.tsx
   │  ├─ filter
   │  │  ├─ filter.tsx
   │  │  └─ filterUI.tsx
   │  ├─ form
   │  │  ├─ form.tsx
   │  │  └─ formUI.tsx
   │  └─ list
   │     ├─ list.tsx
   │     └─ listUI.tsx
   ├─ services
   │  ├─ store.ts
   │  └─ __tests__
   │     └─ reducer.test.ts
   ├─ slices
   │  ├─ adDetailSlice
   │  │  ├─ adDetailSlice.ts
   │  │  └─ __tests__
   │  │     └─ adDetail.test.ts
   │  ├─ form
   │  │  ├─ formSlice.ts
   │  │  └─ __test__
   │  │     └─ form.tests.ts
   │  └─ list
   │     ├─ listSlice.ts
   │     └─ __tests__
   │        └─ list.tests.ts
   ├─ constants.ts
   ├─ global.d.ts
   ├─ index.tsx
   ├─ styles.css
   └─ types.ts


```
