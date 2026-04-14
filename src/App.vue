<script setup>
import { RouterView } from 'vue-router';
import Navbar from './components/Navbar.vue';

import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

// leemos las preferencias del usuario desde Vuex
const prefs = computed(() => store.getters['auth/preferences'] || {});

// clase global según tema de usuario
const appThemeClass = computed(() =>
  prefs.value.theme === 'dark' ? 'app-theme-dark' : 'app-theme-light'
);
</script>

<template>
  <div :class="['app-wrapper', appThemeClass]">
    <header>
      <Navbar />
    </header>

    <main>
      <RouterView />
    </main>

    <footer class="py-3 bg-light">
      <div class="container text-center">
        <span class="text-muted">
          &copy; 2026 Bootcamp Weather. Web con resumen semanal del clima en
          Chile. All rights reserved. Mario Canto.
        </span>
      </div>
    </footer>
  </div>
</template>

<style scoped>
/* estilos globales del layout si los necesitas */
</style>