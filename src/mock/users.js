// src/mock/users.js

const DEFAULT_USERS = [
  {
    id: 1,
    name: 'Mario',
    email: 'mario@bootcampweather.cl',
    password: '1234',
    preferences: { unit: 'C', theme: 'dark' },
    favorites: [],
  },
  {
    id: 2,
    name: 'Admin',
    email: 'admin@bootcampweather.cl',
    password: 'admin',
    preferences: { unit: 'C', theme: 'dark' },
    favorites: [],
  },
];

// Carga usuarios: mock + los registrados en localStorage
export function getUsers() {
  const stored = localStorage.getItem('registeredUsers');
  const registeredUsers = stored ? JSON.parse(stored) : [];
  return [...DEFAULT_USERS, ...registeredUsers];
}

// Guarda un nuevo usuario en localStorage
export function saveUser(newUser) {
  const stored = localStorage.getItem('registeredUsers');
  const registeredUsers = stored ? JSON.parse(stored) : [];
  registeredUsers.push(newUser);
  localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
}

// Para compatibilidad con el import actual en auth.js
export const mockUsers = DEFAULT_USERS;