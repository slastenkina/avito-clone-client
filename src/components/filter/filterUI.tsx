// Импортируем необходимые компоненты из библиотеки Material UI и константы
import React from 'react'; // Для работы с React
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material'; // Компоненты для построения формы фильтра
import { AdTypes, CarBrands, PropertyTypes, ServiceTypes } from '../../constants'; // Константы с данными для фильтров

// Интерфейс пропсов для компонента FilterUI
interface AdFilterUIProps {
  filterData: { // Объект с текущими значениями фильтров
    type: string; // Тип объявления
    propertyType: string; // Тип недвижимости
    brand: string; // Марка автомобиля
    serviceType: string; // Тип услуги
  };
  onFilterChange: (e: SelectChangeEvent<string>) => void; // Функция для обработки изменений в фильтре
  onResetFilters: () => void; // Функция для сброса всех фильтров
}

// Компонент UI для фильтрации объявлений
const FilterUI: React.FC<AdFilterUIProps> = ({ filterData, onFilterChange, onResetFilters }) => {

  // Проверяем, активен ли хотя бы один фильтр
  const isFilterActive = Object.values(filterData).some((value) => value !== '');

  return (
    <Box> {/* Контейнер для всех элементов фильтрации */}

      {/* Фильтр по типу объявления */}
      <Box mb={2}>
        <FormControl fullWidth> {/* Контейнер для фильтра */}
          <InputLabel>Тип объявления</InputLabel> {/* Лейбл для выпадающего списка */}
          <Select
            name="type" // Имя для поля типа объявления
            value={filterData.type} // Значение текущего фильтра
            onChange={onFilterChange} // Обработчик изменений
            label="Тип объявления" // Заголовок в UI
            data-testid="filter-type" // Для тестирования
          >
            <MenuItem value="">Все</MenuItem> {/* Опция для сброса фильтра */}
            {AdTypes.map((type) => ( // Перебор всех типов объявлений для отображения в списке
              <MenuItem key={type} value={type}>
                {type} {/* Название типа объявления */}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Фильтр по типу недвижимости */}
      {filterData.type === 'Недвижимость' && (
        <Box mb={2}>
          <FormControl fullWidth>
            <InputLabel>Тип недвижимости</InputLabel>
            <Select
              name="propertyType"
              value={filterData.propertyType}
              onChange={onFilterChange}
              label="Тип недвижимости"
            >
              <MenuItem value="">Все</MenuItem>
              {PropertyTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type} {/* Название типа недвижимости */}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      )}

      {/* Фильтр по марке автомобиля */}
      {filterData.type === 'Авто' && (
        <Box mb={2}>
          <FormControl fullWidth>
            <InputLabel>Марка автомобиля</InputLabel>
            <Select
              name="brand"
              value={filterData.brand}
              onChange={onFilterChange}
              label="Марка автомобиля"
            >
              <MenuItem value="">Все</MenuItem>
              {CarBrands.map((brand) => (
                <MenuItem key={brand} value={brand}>
                  {brand} {/* Название марки автомобиля */}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      )}

      {/* Фильтр по типу услуги */}
      {filterData.type === 'Услуги' && (
        <Box mb={2}>
          <FormControl fullWidth>
            <InputLabel>Тип услуги</InputLabel>
            <Select
              name="serviceType"
              value={filterData.serviceType}
              onChange={onFilterChange}
              label="Тип услуги"
            >
              <MenuItem value="">Все</MenuItem>
              {ServiceTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type} {/* Название типа услуги */}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      )}

      {/* Кнопка для сброса фильтров */}
      {isFilterActive && (
        <Button variant="outlined" color="secondary" onClick={onResetFilters} sx={{ mb: 2 }}>
          Сбросить фильтр {/* Текст кнопки для сброса фильтров */}
        </Button>
      )}
    </Box>
  );
};

export default FilterUI; // Экспорт компонента для использования в других частях приложения
