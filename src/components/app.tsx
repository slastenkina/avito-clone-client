import React from 'react';
import { Route, Routes } from 'react-router-dom'; // Импортируем компоненты для маршрутизации
import { Container } from '@mui/material'; // Импортируем контейнер для обертки элементов с Material UI
// Импортируем компоненты для отображения разных страниц приложения
import List from './list/list'; // Список объявлений
import AdForm from './form/form'; // Форма для добавления или редактирования объявления
import Ad from './ad/ad'; // Страница с подробной информацией о конкретном объявлении
import Header from './header'; // Хедер приложения, обычно включает навигацию

// Основной компонент приложения
export const App: React.FC = () => {
  return (
    // Контейнер из Material UI для обертки содержимого страницы
    <Container>
      {/* Хедер приложения, может содержать меню или логотип */}
      <Header />

      {/* Определяем маршруты для разных страниц */}
      <Routes>
        {/* Главная страница и страница списка объявлений */}
        <Route path="/" element={<List />} />
        <Route path="/list" element={<List />} />

        {/* Страница для создания или редактирования объявления */}
        <Route path="/form" element={<AdForm />} />

        {/* Страница с деталями конкретного объявления, использует динамический параметр ":id" */}
        <Route path="/item/:id" element={<Ad />} />

        {/* Страница редактирования конкретного объявления, использует динамический параметр ":id" */}
        <Route path="/form/:id" element={<AdForm />} />
      </Routes>
    </Container>
  );
};

export default App;
