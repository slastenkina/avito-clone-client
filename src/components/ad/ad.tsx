// Импортируем необходимые библиотеки и хуки
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Хуки для навигации и получения параметров URL
import { RootState, useDispatch, useSelector } from '../../services/store'; // Хуки для работы с Redux store
import { fetchAdDetail } from '../../slices/adDetailSlice/adDetailSlice'; // Асинхронное действие для получения данных объявления
import AdUI from './AdUI'; // Компонент для отображения UI объявления

const Ad: React.FC = () => {
  // Извлекаем параметр id из URL
  const { id } = useParams<{ id: string }>();

  // Получаем доступ к dispatch и навигации
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Извлекаем состояние из Redux store (детали объявления, состояние загрузки и ошибки)
  const { adDetail, loading, error } = useSelector((state: RootState) => state.item);

  // Эффект, который срабатывает при изменении id в URL
  useEffect(() => {
    if (id) {
      // Диспатчим действие для получения данных объявления по id
      dispatch(fetchAdDetail(id));
    }
  }, [dispatch, id]);

  // Обработка загрузки, ошибки и отсутствующих данных
  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error}</div>;
  if (!adDetail) return <div>Объявление не найдено.</div>;

  // После проверки возвращаем компонент с данными
  return <AdUI adDetail={adDetail} onBack={() => navigate(-1)} />;
};

export default Ad;
