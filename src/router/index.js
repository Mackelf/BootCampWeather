import { createRouter, createWebHashHistory } from 'vue-router'; // 1. cambiar createWebHistory por createWebHashHistory
import store from '../store';

import HomeView from '../views/HomeView.vue';
import PronosticosView from '../views/PronosticosView.vue';
import LugarDetalleView from '../views/LugarDetalleView.vue';
import NewsView from '../views/NewsView.vue';
import AboutView from '../views/AboutView.vue';

import LoginView from '../views/LoginView.vue';
import FavoritesView from '../views/FavoritesView.vue';
import PreferencesView from '../views/PreferencesView.vue';
import RegisterView from '../views/RegisterView.vue';

const router = createRouter({
  history: createWebHashHistory(), // 2. usar createWebHashHistory() sin parámetros
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/pronosticos',
      name: 'pronosticos',
      component: PronosticosView,
    },
    {
      path: '/pronosticos/:country/:city',
      name: 'lugar-detalle',
      component: LugarDetalleView,
      props: true,
    },
    {
      path: '/news',
      name: 'news',
      component: NewsView,
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/registro',
      name: 'registro',
      component: RegisterView,
    },
        {
      path: '/favoritos',
      name: 'favoritos',
      component: FavoritesView,
      meta: { requiresAuth: true },
    },
    {
      path: '/preferencias',
      name: 'preferencias',
      component: PreferencesView,
      meta: { requiresAuth: true },
    },
  ],
});

// guard global para rutas protegidas
router.beforeEach((to, from) => {
  const requiresAuth = to.matched.some(r => r.meta.requiresAuth);
  const isAuth = store.getters['auth/isAuthenticated'];

  if (requiresAuth && !isAuth) {
    return { name: 'login', query: { redirect: to.fullPath } };
  }

  return true;
});

export default router;