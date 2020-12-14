import { createStore } from 'redux';

export const emptyCar = {
  id: '',
  image: '',
  make: '',
  model: '',
  price: '',
  year: '',
  carImages: [],
  description: '',
  engine: '',
  drive: '',
  feature1: '',
};

const initialState = {
  cars: [],
  id: '',
  car: {},
  tempCar: {},
};

const store = createStore((state = initialState, action) => {
  if (action.type === 'LOAD') {
    state = {
      ...state,
      cars: [...action.cars],
      car: { ...action.car },
      id: action.id,
      tempCar: { ...action.car },
    };
  } else if (action.type === 'UPDATE_TEMPCAR') {
    state = { ...state, tempCar: { ...action.tempCar } };
  } else if (action.type === 'POST_TEMPCAR') {
    state = {
      ...state,
      car: { ...action.car },
      tempCar: { ...action.car },
    };
  } else if (action.type === 'JUST_CARS') {
    state = { ...state, cars: [...action.cars] };
  }
  return state;
});

export default store;
