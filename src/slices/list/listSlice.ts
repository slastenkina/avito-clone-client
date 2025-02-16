// Импортируем необходимые функции и типы из Redux Toolkit и других модулей
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Ad } from '../../types'; // Тип для объявления
import { RootState } from '../../services/store'; // Тип для состояния корневого хранилища

// Асинхронная операция для получения списка объявлений
export const fetchAds = createAsyncThunk('ads/fetchAds', async () => {
  const response = await fetch('http://localhost:3000/items'); // Получаем список объявлений с сервера
  return await response.json(); // Возвращаем данные объявлений
});

// Асинхронная операция для создания нового объявления
export const createAd = createAsyncThunk('ads/createAd', async (newAd: Ad) => {
  const response = await fetch('http://localhost:3000/items', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', // Устанавливаем тип контента
    },
    body: JSON.stringify(newAd), // Отправляем новые данные объявления
  });
  return await response.json(); // Возвращаем данные созданного объявления
});

// Асинхронная операция для обновления существующего объявления
export const updateAd = createAsyncThunk('ads/updateAd', async (updatedAd: Ad) => {
  const response = await fetch(`http://localhost:3000/items/${updatedAd.id}`, {
    method: 'PUT', // Метод обновления
    headers: {
      'Content-Type': 'application/json', // Устанавливаем тип контента
    },
    body: JSON.stringify(updatedAd), // Отправляем обновленные данные
  });
  return await response.json(); // Возвращаем обновленное объявление
});

// Асинхронная операция для удаления объявления
export const deleteAd = createAsyncThunk('ads/deleteAd', async (id: number) => {
  await fetch(`http://localhost:3000/items/${id}`, {
    method: 'DELETE', // Метод удаления
  });
  return id; // Возвращаем id удаленного объявления для дальнейшей обработки в редьюсере
});

// Интерфейс состояния для списка объявлений
interface AdsState {
  ads: Ad[]; // Список всех объявлений
  selectedAd: Ad | null; // Выбранное объявление для подробного отображения
  loading: boolean; // Статус загрузки
  error: string | null; // Сообщение об ошибке
}

// Начальное состояние для слайса
const initialState: AdsState = {
  ads: [], // Изначально пустой список объявлений
  selectedAd: null, // Изначально нет выбранного объявления
  loading: false, // Изначально загрузка не активна
  error: null, // Изначально ошибок нет
};

// Создаем слайс для работы с состоянием списка объявлений
const listSlice = createSlice({
  name: 'ads', // Название слайса
  initialState, // Начальное состояние
  reducers: {
    // Редьюсер для выбора объявления
    setSelectedAd: (state, action: PayloadAction<Ad | null>) => {
      state.selectedAd = action.payload; // Устанавливаем выбранное объявление
    },
    // Редьюсер для удаления объявления из списка
    removeAd: (state, action: PayloadAction<number>) => {
      state.ads = state.ads.filter((ad) => ad.id !== action.payload); // Фильтруем удаленное объявление
    },
  },
  extraReducers: (builder) => {
    builder
      // Обработчик для асинхронной операции получения объявлений
      .addCase(fetchAds.pending, (state) => {
        state.loading = true; // Включаем статус загрузки
      })
      .addCase(fetchAds.fulfilled, (state, action) => {
        state.loading = false; // Завершаем загрузку
        state.ads = action.payload; // Обновляем список объявлений
      })
      .addCase(fetchAds.rejected, (state, action) => {
        state.loading = false; // Завершаем загрузку
        state.error = action.error.message || 'Ошибка загрузки данных'; // Обрабатываем ошибку
      })
      // Обработчик для создания нового объявления
      .addCase(createAd.fulfilled, (state, action) => {
        state.ads.push(action.payload); // Добавляем созданное объявление в список
      })
      // Обработчик для обновления объявления
      .addCase(updateAd.fulfilled, (state, action) => {
        const index = state.ads.findIndex((ad) => ad.id === action.payload.id); // Находим индекс обновленного объявления
        if (index !== -1) {
          state.ads[index] = action.payload; // Обновляем объявление в списке
        }
      })
      // Обработчик для удаления объявления
      .addCase(deleteAd.fulfilled, (state, action) => {
        state.ads = state.ads.filter((ad) => ad.id !== action.payload); // Удаляем объявление из списка
      });
  },
});

// Экспортируем действия для работы с состоянием
export const { setSelectedAd, removeAd } = listSlice.actions;

// Селекторы для получения данных из состояния
export const selectAds = (state: RootState) => state.ads.ads; // Получаем все объявления
export const selectLoading = (state: RootState) => state.ads.loading; // Получаем статус загрузки
export const selectError = (state: RootState) => state.ads.error; // Получаем ошибку

// Экспортируем редьюсер для использования в хранилище
export default listSlice.reducer;
