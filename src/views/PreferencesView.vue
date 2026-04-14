<script setup>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const prefs = computed(() => store.getters['auth/preferences'] || {});
const user = computed(() => store.getters['auth/currentUser']);

// estado local del formulario
const unit = ref(prefs.value.unit || 'C');      // 'C' o 'F'
const theme = ref(prefs.value.theme || 'dark'); // ponemos 'dark' como default mejor

const isSaving = ref(false);
const savedMessage = ref('');

// guardar cambios en Vuex al hacer click
const savePreferences = () => {
  isSaving.value = true;
  savedMessage.value = '';

  store.commit('auth/UPDATE_PREFERENCES', {
    unit: unit.value,
    theme: theme.value,
  });

  // feedback simple
  savedMessage.value = 'Preferencias guardadas.';
  setTimeout(() => {
    savedMessage.value = '';
  }, 2000);

  isSaving.value = false;
};
</script>

<template>
  <section class="container py-4">
    <h1 class="mb-3">Mis preferencias de clima</h1>

    <p v-if="user" class="text-muted">
      Usuario: <strong>{{ user.name }}</strong>
    </p>

    <div class="col-md-4">
      <div class="mb-3">
        <label class="form-label">Unidad de temperatura</label>
        <select v-model="unit" class="form-select">
          <option value="C">Celsius (°C)</option>
          <option value="F">Fahrenheit (°F)</option>
        </select>
      </div>

      <div class="mb-3">
        <label class="form-label">Tema de la aplicación</label>
        <select v-model="theme" class="form-select">
          <option value="dark">Oscuro</option>
          <option value="light">Claro</option>
        </select>
      </div>

      <button
        class="btn btn-primary"
        type="button"
        @click="savePreferences"
        :disabled="isSaving"
      >
        {{ isSaving ? 'Guardando...' : 'Guardar preferencias' }}
      </button>

      <p v-if="savedMessage" class="text-success small mt-2">
        {{ savedMessage }}
      </p>
    </div>
  </section>
</template>