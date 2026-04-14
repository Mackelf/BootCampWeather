<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router';

const email = ref('');
const password = ref('');
const error = ref(null);
const isSubmitting = ref(false);

const store = useStore();
const router = useRouter();
const route = useRoute();

const isValid = computed(() => email.value && password.value);

const onSubmit = async () => {
  error.value = null;

  if (!isValid.value) {
    error.value = 'Completa todos los campos';
    return;
  }

  isSubmitting.value = true;
  try {
    await store.dispatch('auth/login', {
      email: email.value,
      password: password.value,
    });

    const redirect = route.query.redirect || '/';
    router.push(redirect);
  } catch (e) {
    error.value = e.message || 'Usuario o contraseña incorrectos';
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <section class="container py-4">
    <h1 class="mb-3">Iniciar sesión</h1>

    <form class="col-md-4" @submit.prevent="onSubmit">
      <div class="mb-3">
        <label class="form-label">Email</label>
        <input
          v-model="email"
          type="email"
          class="form-control"
          placeholder="mario@bootcampweather.cl"
        />
      </div>

      <div class="mb-3">
        <label class="form-label">Contraseña</label>
        <input
          v-model="password"
          type="password"
          class="form-control"
          placeholder="Ingresa tu contraseña"
        />
      </div>

      <p v-if="error" class="text-danger small">{{ error }}</p>

      <button
        type="submit"
        class="btn btn-primary w-100"
        :disabled="!isValid || isSubmitting"
      >
        {{ isSubmitting ? 'Ingresando...' : 'Entrar' }}
      </button>

      <p class="text-center mt-3 small">
        ¿No tienes cuenta?
        <router-link to="/registro">Regístrate aquí</router-link>
      </p>
    </form>
  </section>
</template>