// src/store/auth.js
import { getUsers, saveUser } from '@/mock/users';

export default {
  namespaced: true,
  state: () => ({
    user: null,
    isAuthenticated: false,
  }),
  mutations: {
    SET_USER(state, user) {
      state.user = user;
      state.isAuthenticated = !!user;
    },
    LOGOUT(state) {
      state.user = null;
      state.isAuthenticated = false;
    },
    UPDATE_PREFERENCES(state, prefs) {
      if (!state.user) return;
      state.user = {
        ...state.user,
        preferences: {
          ...state.user.preferences,
          ...prefs,
        },
      };
    },
    TOGGLE_FAVORITE(state, { city, country }) {
      if (!state.user) return;
      const favorites = state.user.favorites || [];
      const index = favorites.findIndex(
        (f) => f.city === city && f.country === country,
      );
      if (index === -1) {
        state.user = {
          ...state.user,
          favorites: [...favorites, { city, country }],
        };
      } else {
        state.user = {
          ...state.user,
          favorites: favorites.filter((_, i) => i !== index),
        };
      }
    },
  },
  actions: {
    login({ commit }, { email, password }) {
      const users = getUsers(); // ← incluye mock + localStorage
      const user = users.find(
        (u) => u.email === email && u.password === password,
      );
      if (!user) {
        throw new Error('Usuario o contraseña incorrectos');
      }
      commit('SET_USER', user);
    },
    register({ dispatch }, { name, email, password }) {
      const users = getUsers();

      // verificar email duplicado
      const exists = users.find((u) => u.email === email);
      if (exists) {
        throw new Error('Ya existe una cuenta con ese correo');
      }

      // crear nuevo usuario
      const newUser = {
        id: Date.now(),
        name,
        email,
        password,
        preferences: { unit: 'C', theme: 'dark' },
        favorites: [],
      };

      // guardar en localStorage
      saveUser(newUser);

      // loguear automáticamente
      return dispatch('login', { email, password });
    },
    logout({ commit }) {
      commit('LOGOUT');
    },
  },
  getters: {
    isAuthenticated: (state) => state.isAuthenticated,
    currentUser: (state) => state.user,
    favorites: (state) => (state.user ? state.user.favorites : []),
    preferences: (state) => (state.user ? state.user.preferences : {}),
    isFavorite: (state) => (city, country) => {
      if (!state.user) return false;
      return (state.user.favorites || []).some(
        (f) => f.city === city && f.country === country,
      );
    },
  },
};