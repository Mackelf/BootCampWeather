<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();

const name = ref('');
const email = ref('');
const password = ref('');
const error = ref('');
const isLoading = ref(false);

async function handleRegister() {
  error.value = '';

  // validaciones básicas
  if (!name.value.trim() || !email.value.trim() || !password.value.trim()) {
    error.value = 'Todos los campos son obligatorios.';
    return;
  }
  if (password.value.length < 4) {
    error.value = 'La contraseña debe tener al menos 4 caracteres.';
    return;
  }

  try {
    isLoading.value = true;
    await store.dispatch('auth/register', {
      name: name.value.trim(),
      email: email.value.trim(),
      password: password.value,
    });
    // registro exitoso → login automático → Home
    router.push('/');
  } catch (e) {
    error.value = e.message || 'Error al crear la cuenta.';
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <section class="container py-5">
    <div class="row justify-content-center">
      <div class="col-12 col-sm-8 col-md-5">

        <div class="login-card">
          <h1 class="login-card__title">Crear cuenta</h1>
          <p class="login-card__subtitle">
            Únete para guardar tus ciudades favoritas y personalizar tu experiencia.
          </p>

          <form @submit.prevent="handleRegister" novalidate>

            <div class="mb-3">
              <label class="form-label">Nombre</label>
              <input
                v-model="name"
                type="text"
                class="form-control"
                placeholder="Tu nombre"
                autocomplete="name"
              />
            </div>

            <div class="mb-3">
              <label class="form-label">Correo electrónico</label>
              <input
                v-model="email"
                type="email"
                class="form-control"
                placeholder="correo@ejemplo.com"
                autocomplete="email"
              />
            </div>

            <div class="mb-3">
             <label class="form-label">Contraseña</label>
              <input
                v-model="password"
                type="password"
                class="form-control"
                placeholder="Mínimo 4 caracteres"
                autocomplete="new-password"
              />
            </div>

            <div v-if="error" class="alert alert-danger py-2 small">
              {{ error }}
            </div>

            <button
              type="submit"
              class="btn btn-primary w-100 mt-2"
              :disabled="isLoading"
            >
              {{ isLoading ? 'Creando cuenta...' : 'Crear cuenta' }}
            </button>

          </form>

          <p class="text-center mt-3 small login-card__subtitle">
            ¿Ya tienes cuenta?
            <router-link to="/login">Inicia sesión</router-link>
          </p>
        </div>

      </div>
    </div>
  </section>
</template>