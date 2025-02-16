// Импортируем необходимые библиотеки и компоненты
import React, { useEffect, useState } from 'react'; // Для работы с React и состоянием компонента
import { useDispatch, useSelector } from '../../services/store'; // Для доступа к состоянию и dispatch
import { useNavigate, useParams } from 'react-router-dom'; // Для навигации и работы с параметрами маршрута
import { createAd, updateAd } from '../../slices/list/listSlice'; // Действия для создания и обновления объявления
import { Ad } from '../../types'; // Тип данных для объявления
import AdFormUI from './formUI'; // Компонент формы объявления
import { SelectChangeEvent } from '@mui/material'; // Тип для событий изменения в Select

const AdForm: React.FC = () => {
  // Инициализация dispatch для отправки действий
  const dispatch = useDispatch();
  // Инициализация navigate для навигации после отправки формы
  const navigate = useNavigate();
  // Извлекаем параметр id из URL, если он присутствует
  const { id } = useParams<{ id: string }>();
  // Получаем все объявления из состояния
  const ads = useSelector((state) => state.ads.ads);
  // Находим существующее объявление, если id присутствует
  const existingAd = id ? ads.find((ad) => ad.id === parseInt(id)) : null;

  // Инициализация состояния для данных формы
  const [formData, setFormData] = useState<Ad>(
    existingAd || {
      id: 0,
      name: '',
      description: '',
      location: '',
      type: 'Недвижимость',
      image: '',
    }
  );

  // Эффект для обновления состояния формы при изменении существующего объявления
  useEffect(() => {
    if (existingAd) {
      setFormData(existingAd); // Обновляем форму с существующими данными
    }
  }, [existingAd]);

  // Обработчик для изменения текстовых полей формы
  const handleTextFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value, // Обновляем значение соответствующего поля
    }));
  };

  // Обработчик для изменения выпадающих списков (Select)
  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    if (name) {
      setFormData((prevData) => ({ ...prevData, [name]: value })); // Обновляем выбранное значение
    }
  };

  // Обработчик для изменения полей, зависящих от категории объявления
  const handleCategoryFieldsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value ? (isNaN(Number(value)) ? value : Number(value)) : '', // Преобразуем числовое значение
    }));
  };

  // Обработчик для изменения изображения (ссылка на изображение)
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      image: value, // Сохраняем URL изображения
    }));
  };

  // Обработчик для отправки формы
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Создаем объект объявления с данными формы и уникальным id
    const adData: Ad = { ...formData, id: id ? parseInt(id) : Date.now() };
    // Если id есть, обновляем объявление, иначе создаем новое
    id ? dispatch(updateAd(adData)) : dispatch(createAd(adData));
    // Навигируем на главную страницу после отправки
    navigate('/');
  };

  return (
    // Рендерим компонент формы с необходимыми пропсами
    <AdFormUI
      formData={formData}
      handleTextFieldChange={handleTextFieldChange}
      handleSelectChange={handleSelectChange}
      handleCategoryFieldsChange={handleCategoryFieldsChange}
      handleImageChange={handleImageChange}
      handleSubmit={handleSubmit}
      id={id}
    />
  );
};

export default AdForm; // Экспортируем компонент для использования в других частях приложения
