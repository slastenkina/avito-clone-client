// Импортируем необходимые библиотеки и компоненты
import React from 'react';
import { Link } from 'react-router-dom'; // Для создания ссылок на другие страницы
import { Box, Button, Paper, Typography } from '@mui/material'; // Компоненты Material UI
import { Ad } from '../../types';

// Определяем интерфейс пропсов для компонента
interface AdUIProps {
  adDetail: Ad; // Данные объявления с типом Ad, который уже описан в types
  onBack: () => void; // Функция для возврата на предыдущую страницу
}

// Основной компонент для отображения объявления
const AdUI: React.FC<AdUIProps> = ({ adDetail, onBack }) => {
  return (
    // Используем Paper для отображения карточки с деталями объявления
    <Paper elevation={3} sx={{ padding: '20px', marginBottom: '20px' }}>
      {/* Заголовок объявления */}
      <Typography variant="h4">{adDetail.name}</Typography>
      {/* Описание объявления */}
      <Typography variant="body1">{adDetail.description}</Typography>
      {/* Локация объявления */}
      <Typography variant="body2">Локация: {adDetail.location}</Typography>
      {/* Тип объявления */}
      <Typography variant="body2">Тип объявления: {adDetail.type}</Typography>

      {/* Если есть изображение, показываем его */}
      {adDetail.image && (
        <Box mt={2} mb={2}>
          <img
            src={adDetail.image}
            alt={adDetail.name}
            style={{ maxWidth: '100%', borderRadius: '8px' }}
          />
        </Box>
      )}

      {/* Отображение деталей в зависимости от типа */}
      {/* Если тип недвижимости, показываем информацию о недвижимости */}
      {adDetail.type === 'Недвижимость' && (
        <>
          <Typography variant="body2">Тип недвижимости: {adDetail.propertyType}</Typography>
          <Typography variant="body2">Площадь: {adDetail.area} м²</Typography>
          <Typography variant="body2">Количество комнат: {adDetail.rooms}</Typography>
          <Typography variant="body2">Цена: {adDetail.price} руб.</Typography>
        </>
      )}

      {/* Если тип авто, показываем информацию об автомобиле */}
      {adDetail.type === 'Авто' && (
        <>
          <Typography variant="body2">Марка: {adDetail.brand}</Typography>
          <Typography variant="body2">Модель: {adDetail.model}</Typography>
          <Typography variant="body2">Год выпуска: {adDetail.year}</Typography>
          {adDetail.mileage && (
            <Typography variant="body2">Пробег: {adDetail.mileage} км</Typography>
          )}
        </>
      )}

      {/* Если тип услуги, показываем информацию об услуге */}
      {adDetail.type === 'Услуги' && (
        <>
          <Typography variant="body2">Тип услуги: {adDetail.serviceType}</Typography>
          <Typography variant="body2">Опыт работы: {adDetail.experience} лет</Typography>
          <Typography variant="body2">Стоимость: {adDetail.cost} руб.</Typography>
          {adDetail.workSchedule && (
            <Typography variant="body2">График работы: {adDetail.workSchedule}</Typography>
          )}
        </>
      )}

      {/* Кнопки для взаимодействия */}
      <Box display="flex" gap={2} marginTop={2}>
        {/* Кнопка "Назад" для возврата на предыдущую страницу */}
        <Button variant="contained" color="primary" onClick={onBack}>
          Назад
        </Button>
        {/* Ссылка на форму редактирования объявления */}
        <Link to={`/form/${adDetail.id}`} style={{ textDecoration: 'none' }}>
          <Button variant="contained" color="secondary">
            Редактировать объявление
          </Button>
        </Link>
      </Box>
    </Paper>
  );
};

export default AdUI;
