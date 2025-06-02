import { TConstructorIngredient, TIngredient } from '@utils-types';

export const ingredient1: TConstructorIngredient = {
  id: '1',
  _id: '1',
  name: 'Соус Spicy-X',
  type: 'sauce',
  proteins: 30,
  fat: 20,
  carbohydrates: 40,
  calories: 30,
  price: 90,
  image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png'
};

export const ingredient2: TConstructorIngredient = {
  id: '2',
  _id: '2',
  name: 'Биокотлета из марсианской Магнолии',
  type: 'main',
  proteins: 420,
  fat: 142,
  carbohydrates: 242,
  calories: 4242,
  price: 424,
  image: 'https://code.s3.yandex.net/react/code/meat-01.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
};

export const bun: TConstructorIngredient = {
  id: '3',
  _id: '3',
  name: 'Краторная булка N-200i',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
};

export const mockOrders = [
  {
    _id: '1',
    ingredients: ['1', '2'],
    status: 'done',
    name: 'Order 1',
    createdAt: '2025-06-01T10:00:00.000Z',
    updatedAt: '2025-06-01T10:05:00.000Z',
    number: 1001
  },
  {
    _id: '2',
    ingredients: ['3', '4'],
    status: 'pending',
    name: 'Order 2',
    createdAt: '2025-06-01T11:00:00.000Z',
    updatedAt: '2025-06-01T11:05:00.000Z',
    number: 1002
  }
];

export const mockOrder = {
  _id: '1',
  ingredients: ['1', '2'],
  status: 'done',
  name: 'Order 1',
  createdAt: '2025-06-01T10:00:00.000Z',
  updatedAt: '2025-06-01T10:05:00.000Z',
  number: 1001
};

export const mockUser = {
  email: 'test@example.com',
  name: 'Test User'
};

export const mockIngredients: TIngredient[] = [
  {
    _id: '1',
    name: 'Булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
  },
  {
    _id: '2',
    name: 'Соус Spicy-X',
    type: 'sauce',
    proteins: 30,
    fat: 20,
    carbohydrates: 40,
    calories: 30,
    price: 90,
    image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png'
  }
];

export const ERROR_MESSAGES = {
  FEEDS_LOAD_ERROR: 'Error loading feeds',
  NETWORK_ERROR: 'Network error',
  INGREDIENTS_LOAD_ERROR: 'Error loading ingredients',
  ORDERS_LOAD_ERROR: 'Error loading orders',
  ORDER_LOAD_ERROR: 'Error loading order',
  SEND_ORDER_FAILED: 'Failed to send order',
  USER_LOAD_FAILED: 'Failed to load user',
  USER_UPDATE_FAILED: 'Failed to update user',
  LOGIN_FAILED: 'Login failed',
  REGISTRATION_FAILED: 'Registration failed',
  LOGOUT_FAILED: 'Logout failed'
};
