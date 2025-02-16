// formSlice.ts
// Импортируем необходимые функции из Redux Toolkit
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormValues } from '../../types'; // Импортируем типы для значений формы
import { AdTypes, CarBrands, PropertyTypes, ServiceTypes } from '../../constants'; // Импортируем константы для различных типов

// Интерфейс состояния формы, который наследует значения из FormValues
interface FormState extends FormValues {}

// Начальное состояние для слайса формы с дефолтными значениями
const initialState: FormState = {
  name: '', // Название объявления
  description: '', // Описание объявления
  location: '', // Местоположение объявления
  type: AdTypes[0], // Тип объявления, по умолчанию первый тип из AdTypes
  image: '', // Изображение объявления

  // Для типа недвижимости
  propertyType: PropertyTypes[0], // Тип недвижимости, по умолчанию первый тип из PropertyTypes
  area: 0, // Площадь недвижимости
  rooms: 0, // Количество комнат
  price: 0, // Цена недвижимости

  // Для типа автомобиля
  brand: CarBrands[0], // Марка автомобиля, по умолчанию первая марка из CarBrands
  model: '', // Модель автомобиля
  year: 0, // Год выпуска автомобиля
  mileage: 0, // Пробег автомобиля

  // Для типа услуги
  serviceType: ServiceTypes[0], // Тип услуги, по умолчанию первый тип из ServiceTypes
  experience: 0, // Опыт работы (для услуги)
  cost: 0, // Стоимость услуги
  workSchedule: '', // График работы (для услуги)
};

// Создаем slice для управления состоянием формы
const formSlice = createSlice({
  name: 'form', // Название слайса
  initialState, // Начальное состояние
  reducers: {
    // Редьюсер для изменения значений отдельных полей формы
    setField: <T extends keyof FormState>(
      state: FormState,
      action: PayloadAction<{
        field: T; // Поле формы, которое нужно изменить
        value: FormState[T]; // Новое значение для этого поля
      }>
    ) => {
      const { field, value } = action.payload;
      state[field] = value; // Обновляем поле состояния с помощью переданных данных
    },
  },
});

// Экспортируем действие setField для использования в других частях приложения
export const { setField } = formSlice.actions;

// Экспортируем редьюсер для использования в хранилище (store)
export default formSlice.reducer;
