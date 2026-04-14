// src/mock/users.js
export const mockUsers = [
  {
    id: 1,
    name: 'Mario',
    email: 'mario@bootcampweather.cl',
    password: '1234',
    preferences: {
      unit: 'C',
      theme: 'dark',
    },
    favorites: [], // array de { city, country }
  },
  {
    id: 2,
    name: 'Admin',
    email: 'admin@bootcampweather.cl',
    password: 'admin',
    preferences: {
      unit: 'C',
      theme: 'light',
    },
    favorites: [],
  },
];