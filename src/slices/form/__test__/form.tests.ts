import formReducer, { setField } from '../formSlice';
import { FormValues } from '../../../types';
import { AdTypes, CarBrands, PropertyTypes, ServiceTypes } from '../../../constants';

// Начальное состояние формы
const initialState: FormValues = {
  name: '',
  description: '',
  location: '',
  type: AdTypes[0], // Значение по умолчанию
  image: '',

  // Недвижимость
  propertyType: PropertyTypes[0],
  area: 0,
  rooms: 0,
  price: 0,

  // Авто
  brand: CarBrands[0],
  model: '',
  year: 0,
  mileage: 0,

  // Услуги
  serviceType: ServiceTypes[0],
  experience: 0,
  cost: 0,
  workSchedule: '',
};

describe('formSlice', () => {
  it('должен вернуть начальное состояние', () => {
    expect(formReducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('должен обновлять поле name', () => {
    const newState = formReducer(
      initialState,
      setField({ field: 'name', value: 'Новое объявление' })
    );
    expect(newState.name).toBe('Новое объявление');
  });

  it('должен обновлять поле type', () => {
    const newState = formReducer(initialState, setField({ field: 'type', value: 'Авто' }));
    expect(newState.type).toBe('Авто');
  });

  it('должен обновлять поле price', () => {
    const newState = formReducer(initialState, setField({ field: 'price', value: 1000000 }));
    expect(newState.price).toBe(1000000);
  });

  it('должен обновлять поле brand', () => {
    const newState = formReducer(initialState, setField({ field: 'brand', value: 'Toyota' }));
    expect(newState.brand).toBe('Toyota');
  });

  it('должен обновлять поле serviceType', () => {
    const newState = formReducer(initialState, setField({ field: 'serviceType', value: 'Ремонт' }));
    expect(newState.serviceType).toBe('Ремонт');
  });
});
