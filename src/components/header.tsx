import React from 'react';
import { Link, useLocation } from 'react-router-dom'; // Импортируем компоненты для маршрутизации
import { AppBar, Button, Toolbar, Typography } from '@mui/material'; // Импортируем компоненты из Material UI для навигации и стилей
import '../styles.css'; // Импортируем стили

const Header: React.FC = () => {
  // Получаем текущий путь из URL для определения, на какой странице мы находимся
  const location = useLocation();

  // Проверяем, находимся ли мы на главной странице (путь "/")
  const isHomePage = location.pathname === '/';

  return (
    // AppBar из Material UI для создания верхней панели навигации
    <AppBar position="static">
      {/* Toolbar для размещения элементов внутри панели */}
      <Toolbar>
        {/* Заголовок приложения, который занимает всю доступную ширину */}
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Клон Авито
        </Typography>

        {/* Кнопка для перехода на главную страницу */}
        <Button color="inherit" component={Link} to="/">
          Главная
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
