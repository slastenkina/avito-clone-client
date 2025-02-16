// Импортируем необходимые библиотеки и компоненты
import React, { useEffect, useState } from 'react'; // React и хуки для состояния и эффектов
import { useDispatch, useSelector } from '../../services/store'; // useDispatch для отправки действий, useSelector для доступа к состоянию
import { useNavigate } from 'react-router-dom'; // useNavigate для навигации по страницам
import {
  deleteAd,
  fetchAds,
  selectAds,
  selectError,
  selectLoading,
} from '../../slices/list/listSlice'; // Импортируем действия и селекторы для работы с объявлениями
import AdListUI from './listUI'; // Компонент UI для отображения списка объявлений

// Компонент списка объявлений
const AdList: React.FC = () => {
  const dispatch = useDispatch(); // Используем dispatch для отправки действий
  const navigate = useNavigate(); // Для навигации

  // Локальные состояния для поиска, страницы и фильтров
  const [searchQuery, setSearchQuery] = useState(''); // Состояние для поиска
  const [currentPage, setCurrentPage] = useState(1); // Текущая страница для пагинации
  const [filterData, setFilterData] = useState({
    type: '', // Тип объявления
    propertyType: '', // Тип недвижимости
    brand: '', // Марка автомобиля
    serviceType: '', // Тип услуги
  });

  // Доступ к данным из Redux-стора
  const ads = useSelector(selectAds); // Список объявлений
  const loading = useSelector(selectLoading); // Статус загрузки
  const error = useSelector(selectError); // Ошибка при загрузке

  // Эффект для загрузки объявлений при первом рендере или если список пуст
  useEffect(() => {
    if (ads.length === 0) {
      dispatch(fetchAds()); // Запрос на получение объявлений
    }
  }, [dispatch, ads.length]); // Зависимости: выполняем при изменении dispatch или длины ads

  // Обработчик открытия объявления по id
  const handleOpen = (id: number) => {
    navigate(`/item/${id}`); // Навигация на страницу конкретного объявления
  };

  // Обработчик удаления объявления
  const handleDelete = async (id: number) => {
    try {
      await dispatch(deleteAd(id)); // Запрос на удаление объявления
    } catch (err) {
      console.error('Ошибка при удалении объявления:', err); // Логирование ошибки
    }
  };

  // Обработчик изменения поискового запроса
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value); // Обновляем поисковый запрос
  };

  // Обработчик изменения страницы для пагинации
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value); // Обновляем текущую страницу
  };

  // Обработчик перехода на страницу создания объявления
  const handleCreateAd = () => {
    navigate('/form'); // Навигация на форму для создания объявления
  };

  // Фильтрация объявлений по поисковому запросу и фильтрам
  const filteredAds = Array.isArray(ads)
    ? ads
      .filter((ad) => ad.name && ad.name.toLowerCase().includes(searchQuery.toLowerCase())) // Фильтруем по названию
      .filter((ad) => (filterData.type ? ad.type === filterData.type : true)) // Фильтруем по типу объявления
      .filter((ad) =>
        filterData.propertyType ? ad.propertyType === filterData.propertyType : true,
      ) // Фильтруем по типу недвижимости
      .filter((ad) => (filterData.brand ? ad.brand === filterData.brand : true)) // Фильтруем по марке
      .filter((ad) => (filterData.serviceType ? ad.serviceType === filterData.serviceType : true)) // Фильтруем по типу услуги
    : []; // Если ads не является массивом, возвращаем пустой массив

  // Параметры пагинации
  const adsPerPage = 5; // Количество объявлений на одной странице
  const indexOfLastAd = currentPage * adsPerPage; // Индекс последнего объявления на текущей странице
  const indexOfFirstAd = indexOfLastAd - adsPerPage; // Индекс первого объявления
  const currentAds = [...filteredAds].reverse().slice(indexOfFirstAd, indexOfLastAd); // Текущие объявления, перевернутые для последнего сверху

  // Отображаем компонент UI для списка объявлений
  return (
    <AdListUI
      loading={loading} // Статус загрузки
      error={error} // Ошибка при загрузке
      searchQuery={searchQuery} // Поисковый запрос
      handleSearchChange={handleSearchChange} // Обработчик изменения поискового запроса
      handleCreateAd={handleCreateAd} // Обработчик перехода к созданию объявления
      filterData={filterData} // Данные фильтров
      setFilterData={setFilterData} // Функция для обновления фильтров
      currentAds={currentAds} // Текущие объявления для отображения
      handleOpen={handleOpen} // Обработчик открытия объявления
      handleDelete={handleDelete} // Обработчик удаления объявления
      handlePageChange={handlePageChange} // Обработчик смены страницы
      currentPage={currentPage} // Текущая страница
      totalPages={Math.ceil(filteredAds.length / adsPerPage)} // Общее количество страниц для пагинации
    />
  );
};

export default AdList; // Экспортируем компонент
