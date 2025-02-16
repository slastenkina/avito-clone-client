import reducer, { clearAdDetail, setAdDetail } from '../adDetailSlice';
import { Ad } from '../../../types';

// Пример объявления для тестов
const mockAd: Ad = {
  id: 1,
  name: 'Квартира в центре',
  description: 'Просторная квартира в центре города',
  location: 'Москва',
  type: 'Недвижимость',
  propertyType: 'Квартира',
  area: 100,
  rooms: 3,
  price: 15000000,
};

// Начальное состояние
const initialState = {
  adDetail: null,
  loading: false,
  error: null,
};

describe('adDetailSlice', () => {
  // Тестирование редьюсеров
  it('должен корректно установить детали объявления', () => {
    const nextState = reducer(initialState, setAdDetail(mockAd));
    expect(nextState.adDetail).toEqual(mockAd);
  });

  it('должен очистить детали объявления', () => {
    const stateWithAd = { ...initialState, adDetail: mockAd };
    const nextState = reducer(stateWithAd, clearAdDetail());
    expect(nextState.adDetail).toBeNull();
  });
});
