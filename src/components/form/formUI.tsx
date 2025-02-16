// Импортируем необходимые компоненты и библиотеки из React и MUI
import React from 'react';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material'; // Компоненты MUI для создания UI
import { Ad } from '../../types'; // Тип данных для объявления
import { AdTypes, CarBrands, PropertyTypes, ServiceTypes } from '../../constants'; // Константы с данными для фильтров

// Описание интерфейса для пропсов компонента формы
interface AdFormUIProps {
  formData: Ad; // Данные формы объявления
  handleTextFieldChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void; // Обработчик для текстовых полей
  handleSelectChange: (e: SelectChangeEvent<string>) => void; // Обработчик для изменения значения в Select
  handleCategoryFieldsChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Обработчик для полей категорий (например, площадь, цена)
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Обработчик для изменения изображения
  handleSubmit: (e: React.FormEvent) => void; // Обработчик для отправки формы
  id: string | undefined; // id объявления (если оно есть, то редактируем)
}

// Компонент формы объявления
const AdFormUI: React.FC<AdFormUIProps> = ({
                                             formData,
                                             handleTextFieldChange,
                                             handleSelectChange,
                                             handleCategoryFieldsChange,
                                             handleImageChange,
                                             handleSubmit,
                                             id,
                                           }) => {
  return (
    <form onSubmit={handleSubmit}>
      {/* Заголовок формы */}
      <Box mb={2}>
        <Typography variant="h4" component="h1">
          {id ? 'Редактирование объявления' : 'Новое объявление'} {/* В зависимости от наличия id показываем разный текст */}
        </Typography>
      </Box>

      {/* Поле для ввода названия объявления */}
      <Box mb={2}>
        <TextField
          label="Название"
          name="name"
          value={formData.name}
          onChange={handleTextFieldChange} // Обработчик изменения текста
          fullWidth
          required // Поле обязательно для заполнения
          data-testid="ad-name" // Для тестов
        />
      </Box>

      {/* Поле для ввода описания объявления */}
      <Box mb={2}>
        <TextField
          label="Описание"
          name="description"
          value={formData.description}
          onChange={handleTextFieldChange}
          fullWidth
          required
          multiline // Множественные строки
          data-testid="ad-description"
        />
      </Box>

      {/* Поле для ввода локации объявления */}
      <Box mb={2}>
        <TextField
          label="Локация"
          name="location"
          value={formData.location}
          onChange={handleTextFieldChange}
          fullWidth
          required
          data-testid="location"
        />
      </Box>

      {/* Поле для ссылки на изображение (с предпросмотром) */}
      <Box mb={2}>
        <TextField
          label="Ссылка на изображение (.jpg)"
          name="image"
          value={formData.image}
          onChange={handleImageChange}
          fullWidth
        />
        {formData.image &&
          <img src={formData.image} alt="Preview" width="100" height="100" />} {/* Предпросмотр изображения */}
      </Box>

      {/* Выпадающий список для выбора типа объявления */}
      <Box mb={2}>
        <FormControl fullWidth required>
          <InputLabel>Тип объявления</InputLabel>
          <Select
            name="type"
            value={formData.type}
            onChange={handleSelectChange}
            label="Тип объявления"
            data-testid="ad-type-select"
          >
            {AdTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Дополнительные поля в зависимости от типа объявления */}
      {/* Категории для типа "Недвижимость" */}
      {formData.type === 'Недвижимость' && (
        <>
          <Box mb={2}>
            <FormControl fullWidth required>
              <InputLabel>Тип недвижимости</InputLabel>
              <Select
                name="propertyType"
                value={formData.propertyType || ''}
                onChange={handleSelectChange}
                data-testid="ad-type-property"
              >
                {PropertyTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          {/* Поля для площади, количества комнат и цены */}
          <Box mb={2}>
            <TextField
              label="Площадь (кв.м)"
              name="area"
              type="number"
              value={formData.area || ''}
              onChange={handleCategoryFieldsChange}
              fullWidth
              required
              data-testid="area"
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="Количество комнат"
              name="rooms"
              type="number"
              value={formData.rooms || ''}
              onChange={handleCategoryFieldsChange}
              fullWidth
              required
              data-testid="rooms"
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="Цена"
              name="price"
              type="number"
              value={formData.price || ''}
              onChange={handleCategoryFieldsChange}
              fullWidth
              required
              data-testid="price"
            />
          </Box>
        </>
      )}

      {/* Категории для типа "Авто" */}
      {formData.type === 'Авто' && (
        <>
          <Box mb={2}>
            <FormControl fullWidth required>
              <InputLabel>Марка</InputLabel>
              <Select name="brand" value={formData.brand || ''} onChange={handleSelectChange}>
                {CarBrands.map((brand) => (
                  <MenuItem key={brand} value={brand}>
                    {brand}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          {/* Поля для модели, года выпуска и пробега */}
          <Box mb={2}>
            <TextField
              label="Модель"
              name="model"
              value={formData.model || ''}
              onChange={handleTextFieldChange}
              fullWidth
              required
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="Год выпуска"
              name="year"
              type="number"
              value={formData.year || ''}
              onChange={handleCategoryFieldsChange}
              fullWidth
              required
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="Пробег (км)"
              name="mileage"
              type="number"
              value={formData.mileage || ''}
              onChange={handleCategoryFieldsChange}
              fullWidth
            />
          </Box>
        </>
      )}

      {/* Категории для типа "Услуги" */}
      {formData.type === 'Услуги' && (
        <>
          <Box mb={2}>
            <FormControl fullWidth required>
              <InputLabel>Тип услуги</InputLabel>
              <Select
                name="serviceType"
                value={formData.serviceType || ''}
                onChange={handleSelectChange}
              >
                {ServiceTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          {/* Поля для опыта работы, стоимости и графика работы */}
          <Box mb={2}>
            <TextField
              label="Опыт работы (лет)"
              name="experience"
              type="number"
              value={formData.experience || ''}
              onChange={handleCategoryFieldsChange}
              fullWidth
              required
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="Стоимость"
              name="cost"
              type="number"
              value={formData.cost || ''}
              onChange={handleCategoryFieldsChange}
              fullWidth
              required
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="График работы"
              name="workSchedule"
              value={formData.workSchedule || ''}
              onChange={handleTextFieldChange}
              fullWidth
            />
          </Box>
        </>
      )}

      {/* Кнопка для отправки формы */}
      <Button type="submit" variant="contained" color="primary">
        {id ? 'Сохранить изменения' : 'Создать объявление'} {/* Меняется текст кнопки в зависимости от редактирования */}
      </Button>
    </form>
  );
};

export default AdFormUI; // Экспортируем компонент формы
