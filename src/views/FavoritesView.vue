<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();

const user = computed(() => store.getters['auth/currentUser']);
const favorites = computed(() => store.getters['auth/favorites'] || []);

const goToDetail = (city, country) => {
  router.push(`/pronosticos/${country}/${city}`);
};

const removeFavorite = (city, country) => {
  store.commit('auth/TOGGLE_FAVORITE', { city, country });
};
</script>

<template>
  <section class="container py-4">
    <h1 class="mb-1">Mis lugares favoritos</h1>
    <p class="text-muted mb-4">
      Bienvenido, <strong>{{ user?.name }}</strong>.
      Tus ciudades guardadas aparecen aquí.
    </p>

    <div v-if="favorites.length === 0" class="text-muted">
      No tienes ciudades favoritas aún. Ve a
      <router-link to="/pronosticos">Pronósticos</router-link>
      y marca las que más te interesan con ⭐.
    </div>

    <div v-else class="row g-3">
      <div
        v-for="fav in favorites"
        :key="`${fav.country}-${fav.city}`"
        class="col-sm-6 col-md-4 col-lg-3"
      >
        <div class="favorite-card">
          <div class="favorite-card__body">
            <p class="favorite-card__country small text-muted mb-1">
              {{ fav.country === 'chile' ? '🇨🇱 Chile' : '🇦🇷 Argentina' }}
            </p>
            <h2 class="favorite-card__city h5 mb-3">{{ fav.city }}</h2>

            <div class="d-flex gap-2">
              <button
                class="btn btn-sm btn-primary"
                @click="goToDetail(fav.city, fav.country)"
              >
                Ver detalle
              </button>
              <button
                class="btn btn-sm btn-outline-danger"
                @click="removeFavorite(fav.city, fav.country)"
              >
                <i class="bi bi-star-fill"></i> Quitar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>