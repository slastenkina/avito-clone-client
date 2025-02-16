import reducer, { removeAd, setSelectedAd } from '../listSlice';
import { Ad } from '../../../types';

// Пример объявлений для тестов
const mockAd1: Ad = {
  id: 1,
  name: 'Квартира у моря',
  description: 'Просторная квартира с видом на море',
  location: 'Сочи',
  type: 'Недвижимость',
  propertyType: 'Квартира',
  area: 80,
  rooms: 2,
  price: 10000000,
};

const mockAd2: Ad = {
  id: 2,
  name: 'Автомобиль BMW',
  description: 'Надёжный автомобиль в отличном состоянии',
  location: 'Москва',
  type: 'Авто',
  brand: 'BMW',
  model: 'X5',
  year: 2020,
  mileage: 50000,
  price: 3500000,
};

// Начальное состояние
const initialState = {
  ads: [],
  selectedAd: null,
  loading: false,
  error: null,
};

describe('listSlice', () => {
  it('должен установить выбранное объявление', () => {
    const nextState = reducer(initialState, setSelectedAd(mockAd1));
    expect(nextState.selectedAd).toEqual(mockAd1);
  });

  it('должен удалить объявление по id', () => {
    const stateWithAds = { ...initialState, ads: [mockAd1, mockAd2] };
    const nextState = reducer(stateWithAds, removeAd(1));
    expect(nextState.ads).toEqual([mockAd2]);
  });
});
