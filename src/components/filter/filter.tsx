// Импортируем необходимые библиотеки и компоненты
import React from 'react';
import { SelectChangeEvent } from '@mui/material'; // Для обработки изменений в Select
import FilterUI from './filterUI'; // Импорт компонента фильтрации

// Определяем типы пропсов для компонента Filter
interface AdFilterProps {
  // Данные фильтрации, которые включают тип, тип недвижимости, марку и тип услуги
  filterData: {
    type: string;
    propertyType: string;
    brand: string;
    serviceType: string;
  };
  // Функция для обновления данных фильтрации в родительском компоненте
  setFilterData: React.Dispatch<
    React.SetStateAction<{
      type: string;
      propertyType: string;
      brand: string;
      serviceType: string;
    }>
  >;
}

// Основной компонент Filter для обработки фильтров
const Filter: React.FC<AdFilterProps> = ({ filterData, setFilterData }) => {

  // Обработчик изменения фильтра
  const handleFilterChange = (e: SelectChangeEvent<string>) => {
    // Извлекаем имя и значение выбранного фильтра
    const { name, value } = e.target;

    // Обновляем фильтры, используя старые данные и заменяя изменённое значение
    setFilterData((prevData) => ({
      ...prevData,
      [name]: value, // Обновляем нужное поле в объекте
    }));
  };

  // Обработчик сброса фильтров, устанавливает пустые значения для всех фильтров
  const handleResetFilters = () => {
    setFilterData({
      type: '', // Сбрасываем тип объявления
      propertyType: '', // Сбрасываем тип недвижимости
      brand: '', // Сбрасываем марку автомобиля
      serviceType: '', // Сбрасываем тип услуги
    });
  };

  // Отображаем компонент фильтрации с данными и обработчиками
  return (
    <FilterUI
      filterData={filterData} // Передаём данные фильтров
      onFilterChange={handleFilterChange} // Передаём обработчик изменения фильтров
      onResetFilters={handleResetFilters} // Передаём обработчик сброса фильтров
    />
  );
};

export default Filter; // Экспорт компонента для использования в других частях приложения