// Импортируем необходимые функции и типы из Redux Toolkit и React-Redux
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import formSlice from '../slices/form/formSlice'; // Импортируем слайс для формы
import listSlice from '../slices/list/listSlice'; // Импортируем слайс для списка объявлений
import adDetailSlice from '../slices/adDetailSlice/adDetailSlice'; // Импортируем слайс для деталей объявления
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook,
} from 'react-redux';

// Объединяем редьюсеры в один, чтобы использовать их в хранилище
export const rootReducer = combineReducers({
  ads: listSlice, // Добавляем слайс для списка объявлений
  form: formSlice, // Добавляем слайс для формы
  item: adDetailSlice, // Добавляем слайс для деталей объявления
});

// Настроиваем Redux store, используя объединённый редьюсер
export const store = configureStore({
  reducer: rootReducer, // Указываем объединённый редьюсер
});

// Тип для состояния всего приложения (RootState) на основе редьюсера
export type RootState = ReturnType<typeof rootReducer>;

// Тип для dispatch действия из store
export type AppDispatch = typeof store.dispatch;

// Создаём хуки для использования dispatch и selector с типами
export const useDispatch: () => AppDispatch = () => dispatchHook<AppDispatch>(); // Переопределяем хук useDispatch с типом
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook; // Переопределяем хук useSelector с типом

// Экспортируем store как дефолтный экспорт для использования в приложении
export default store;
