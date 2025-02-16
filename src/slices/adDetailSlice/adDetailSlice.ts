// Импортируем необходимые функции из Redux Toolkit
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Ad } from '../../types'; // Импорт типа Ad для объявления

// Асинхронное действие для получения деталей объявления
export const fetchAdDetail = createAsyncThunk('adDetail/fetchAdDetail', async (id: string) => {
  // Выполняем запрос к серверу для получения деталей объявления по id
  const response = await fetch(`http://localhost:3000/items/${parseInt(id, 10)}`); // Преобразуем id в число
  if (!response.ok) {
    throw new Error('Ошибка при загрузке объявления'); // Если запрос не удался, выбрасываем ошибку
  }
  return await response.json(); // Возвращаем данные в формате JSON
});

// Определяем интерфейс состояния для детали объявления
interface AdDetailState {
  adDetail: Ad | null; // Детали объявления, могут быть null, если данных нет
  loading: boolean; // Статус загрузки данных
  error: string | null; // Статус ошибки при запросе
}

// Начальное состояние для редьюсера
const initialState: AdDetailState = {
  adDetail: null, // Изначально детали объявления нет
  loading: false, // Загрузка изначально не идет
  error: null, // Нет ошибки по умолчанию
};

// Создаем slice для управления состоянием детали объявления
const adDetailSlice = createSlice({
  name: 'adDetail', // Название слайса
  initialState, // Начальное состояние
  reducers: {
    // Редьюсер для установки данных детали объявления
    setAdDetail: (state, action: PayloadAction<Ad>) => {
      state.adDetail = action.payload; // Обновляем состояние с деталями объявления
    },
    // Редьюсер для очистки данных детали объявления
    clearAdDetail: (state) => {
      state.adDetail = null; // Очищаем данные объявления
    },
  },
  // Дополнительные редьюсеры для обработки асинхронных действий
  extraReducers: (builder) => {
    builder
      // Когда запрос на получение детали объявления отправлен, устанавливаем статус загрузки
      .addCase(fetchAdDetail.pending, (state) => {
        state.loading = true;
      })
      // Когда запрос успешно выполнен, сохраняем полученные данные и меняем статус загрузки
      .addCase(fetchAdDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.adDetail = action.payload;
      })
      // Когда запрос завершился с ошибкой, обновляем статус ошибки и останавливаем загрузку
      .addCase(fetchAdDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка загрузки данных'; // Если ошибка есть, сохраняем её сообщение
      });
  },
});

// Экспортируем действия, чтобы можно было их использовать в других частях приложения
export const { setAdDetail, clearAdDetail } = adDetailSlice.actions;

// Экспортируем редьюсер для использования в хранилище
export default adDetailSlice.reducer;
