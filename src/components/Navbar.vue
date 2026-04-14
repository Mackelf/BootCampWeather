<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter, RouterLink } from 'vue-router';

const store = useStore();
const router = useRouter();

const isAuth = computed(() => store.getters['auth/isAuthenticated']);
const user = computed(() => store.getters['auth/currentUser']);

const logout = () => {
  store.dispatch('auth/logout');
  router.push({ name: 'login' });
};
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <RouterLink class="navbar-brand" to="/">BootCamp Weather</RouterLink>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#mainNavbar"
        aria-controls="mainNavbar"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="mainNavbar">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <RouterLink class="nav-link" to="/">Home</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/pronosticos">Pronósticos</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/news">Noticias</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/about">Acerca de</RouterLink>
          </li>

          <!-- Rutas privadas visibles solo logueado -->
          <li v-if="isAuth" class="nav-item">
            <RouterLink class="nav-link" to="/favoritos">Favoritos</RouterLink>
          </li>
          <li v-if="isAuth" class="nav-item">
            <RouterLink class="nav-link" to="/preferencias">Preferencias</RouterLink>
          </li>
        </ul>

        <div class="d-flex align-items-center">
          <!-- No logueado: mostrar botón Login -->
          <RouterLink
            v-if="!isAuth"
            class="btn btn-outline-light btn-sm"
            to="/login"
          >
            Login
          </RouterLink>

          <!-- Logueado: saludo + logout -->
          <div v-else class="d-flex align-items-center gap-2">
            <span class="text-light small">
              Hola, {{ user?.name || 'Usuario' }}
            </span>
            <button
              class="btn btn-danger btn-sm"
              @click="logout"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>