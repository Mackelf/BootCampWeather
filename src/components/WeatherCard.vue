<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { formatTempValue, getTempSuffix } from '@/utils/temperature';

const props = defineProps({
  city: { type: String, required: true },
  dateLabel: { type: String, required: true },
  description: { type: String, required: true },
  temperature: { type: Number, required: true },
  minTemp: { type: Number, required: true },
  maxTemp: { type: Number, required: true },
  iconClass: { type: String, required: true },
  theme: { type: String, default: 'theme-day' },
  // nuevos
  isFavorite: { type: Boolean, default: false },
  showFavorite: { type: Boolean, default: false },
  dotColor: {
    type: String,
    default: 'rgba(255, 255, 255, 0.7)',
  },
});

const emit = defineEmits(['show-details', 'toggle-favorite']);

function onShowDetails() {
  emit('show-details');
}

function onToggleFavorite() {
  emit('toggle-favorite');
}

// ---- preferencias desde Vuex ----
const store = useStore();
const prefs = computed(() => store.getters['auth/preferences'] || {});
const unit = computed(() => prefs.value.unit || 'C');

const tempSuffix = computed(() => getTempSuffix(unit.value));

const tempNowFormatted = computed(() =>
  formatTempValue(props.temperature, unit.value)
);
const minTempFormatted = computed(() =>
  formatTempValue(props.minTemp, unit.value)
);
const maxTempFormatted = computed(() =>
  formatTempValue(props.maxTemp, unit.value)
);
</script>

<template>
  <article class="card weather-card" :class="theme">
    <div class="card-header d-flex justify-content-between align-items-center">
      <span class="weather-dot" :style="{ backgroundColor: dotColor }" />
      <span class="text-uppercase">{{ city }}</span>
      <span class="small text-uppercase">{{ dateLabel }}</span>
    </div>

    <hr class="my-2" />

    <div class="weather-main text-center">
      <i :class="['weather-main__icon', iconClass]"></i>
      <div class="temp-now">
        {{ tempNowFormatted }}
        <span>{{ tempSuffix }}</span>
      </div>
      <div class="weather-desc text-uppercase">
        {{ description }}
      </div>
    </div>

    <div class="temp-range d-flex justify-content-between mt-2 small">
      <span class="temp-min">↓ {{ minTempFormatted }}{{ tempSuffix }}</span>
      <span class="temp-max">↑ {{ maxTempFormatted }}{{ tempSuffix }}</span>
    </div>

    <!-- Footer: estrella izquierda, detalles derecha -->
    <div class="d-flex justify-content-between align-items-center mt-3">

      <button
        v-if="showFavorite"
        class="favorite-btn"
        :class="{ 'is-favorite': isFavorite }"
        :title="isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'"
        @click.stop="onToggleFavorite"
      >
        <i :class="isFavorite ? 'bi bi-star-fill' : 'bi bi-star'"></i>
      </button>

      <!-- placeholder para mantener el layout cuando no hay estrella -->
      <span v-else></span>

      <button class="btn btn-detalles" @click="onShowDetails">
        Detalles &gt;
      </button>

    </div>
  </article>
</template>

<style scoped lang="scss">
</style>