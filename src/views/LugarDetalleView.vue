<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { COUNTRIES, localeMap } from '@/utils/weatherConfig';
import {
  getWeather,
  getIconClass,
  normalizeLocations,
  loadWeatherData,
  saveWeatherData,
  getForecastStats,
} from '@/utils/weatherHelpers';
import { formatTempValue, getTempSuffix } from '@/utils/temperature';
import { fetchWeatherByCountry } from '@/api/weatherApi';

const route = useRoute();
const router = useRouter();
const store = useStore();

// prefs / unit desde Vuex
const prefs = computed(() => store.getters['auth/preferences'] || {});
const unit = computed(() => prefs.value.unit || 'C');
const tempSuffix = computed(() => getTempSuffix(unit.value));

const countryKey = computed(() => route.params.country);
const cityName = computed(() => route.params.city);

const isLoading = ref(true);
const error = ref(null);
const selectedLugar = ref(null);

const currentStats = computed(() => {
  if (!selectedLugar.value?.forecast) {
    return {
      avgTemp: '-',
      alerts: [],
      weekType: {
        icon: 'bi bi-question-circle',
        label: 'Semana variada',
        css: 'week--varied',
      },
    };
  }
  return getForecastStats(selectedLugar.value.forecast);
});

const formatTemp = (valueInCelsius) =>
  formatTempValue(valueInCelsius, unit.value);

const formatAvgTemp = computed(() => {
  if (!currentStats.value || currentStats.value.avgTemp === '-') return '-';
  return formatTempValue(currentStats.value.avgTemp, unit.value);
});

async function loadDetail() {
  try {
    isLoading.value = true;
    error.value = null;

    const key = countryKey.value;
    const cfg = COUNTRIES[key];
    if (!cfg) throw new Error('País no soportado');

    let data = loadWeatherData(key);
    if (!data) {
      // ✅ Axios en lugar de fetch
      const raw = await fetchWeatherByCountry(cfg.apiUrl);
      const locations = Array.isArray(raw) ? raw : [raw];
      const normalizados = normalizeLocations(locations, key);

      const locale = localeMap[key] ?? 'es-CL';
      const todayLabel = new Date()
        .toLocaleDateString(locale, {
          day: '2-digit',
          month: 'short',
        })
        .toUpperCase();

      // ✅ mismo mapeo que PronosticosView para que .code exista
      data = normalizados.map((loc) => {
        const wx = getWeather(loc.code);
        const iconClass = getIconClass(loc.code);
        return {
          city: loc.city,
          code: loc.code,
          description: wx.label.toUpperCase(),
          temp: loc.temp,
          minTemp: loc.minTemp,
          maxTemp: loc.maxTemp,
          iconClass,
          dateLabel: todayLabel,
          forecast: loc.forecast,
        };
      });

      // ✅ guardar para que el caché también tenga .code
      saveWeatherData(key, data);
    }
console.log('[DETALLE] data México:', key, data);
    const ciudad = decodeURIComponent(cityName.value);
    const lugar = data.find((l) => l.city === ciudad);
    console.log('[DETALLE] lugar seleccionado:', lugar);
console.log('[DETALLE] code principal:', lugar?.code, typeof lugar?.code);
    if (!lugar) throw new Error('No se encontró el lugar en los datos');

    console.log('[DETALLE] lugar:', lugar.city, 'code:', lugar.code);

    selectedLugar.value = lugar;
  } catch (e) {
    console.error(e);
    error.value = e.message;
  } finally {
    isLoading.value = false;
  }
}

function goBack() {
  router.back();
}

onMounted(loadDetail);
</script>

<template>
  <section class="container py-4">
    <button class="btn-back mb-4" @click="goBack">
      ← Volver
    </button>

    <div v-if="isLoading" class="detail-muted">Cargando detalles del clima...</div>
    <div v-else-if="error" class="text-danger">{{ error }}</div>

    <div v-else-if="selectedLugar">
      <div class="row g-4">
        
        <div class="col-12 col-lg-8">
          <div class="detail-card h-100">
            <div class="detail-muted small mb-1 text-uppercase">{{ countryKey }}</div>
            <div class="d-flex justify-content-between align-items-start">
              <div>
                <h2 class="mb-1 display-6 fw-bold">{{ cityName }}</h2>
                <div class="detail-muted fs-5">
                  {{ getWeather(selectedLugar.code).label }}
                </div>
              </div>
              <i :class="[getIconClass(selectedLugar.code), 'detail-main-icon']"></i>
            </div>

            <div class="d-flex align-items-baseline gap-2 mt-4">
              <span class="temp-display">
                {{ formatTemp(selectedLugar.temp) }}{{ tempSuffix }}
              </span>
            </div>

            <div class="d-flex gap-3 mt-2 detail-muted">
              <span>↓ {{ formatTemp(selectedLugar.minTemp) }}{{ tempSuffix }}</span>
              <span>↑ {{ formatTemp(selectedLugar.maxTemp) }}{{ tempSuffix }}</span>
            </div>
          </div>
        </div>

        <div class="col-12 col-lg-4">
          <div class="detail-card h-100">
            <h3 class="detail-section-title mb-4">Resumen semanal</h3>

            <div class="d-flex align-items-center gap-3 mb-3">
              <div class="icon-circle">
                <i class="bi bi-thermometer-half"></i>
              </div>
              <div>
                <div class="detail-muted small">Promedio semanal</div>
                <strong class="text-theme-highlight fs-5">
                  {{ formatAvgTemp }}{{ tempSuffix }}
                </strong>
              </div>
            </div>

            <div class="d-flex align-items-center gap-3 mb-4">
              <div class="icon-circle">
                <i :class="currentStats.weekType.icon"></i>
              </div>
              <div>
                <div class="detail-muted small">Tendencia</div>
                <span class="text-theme-highlight">{{ currentStats.weekType.label }}</span>
              </div>
            </div>

            <div v-if="currentStats.alerts.length">
              <div
                v-for="alert in currentStats.alerts"
                :key="alert.text"
                class="detail-alert mb-2"
              >
                <i :class="alert.icon"></i>
                <span>{{ alert.text }}</span>
              </div>
            </div>
          </div>
        </div>

        <div v-if="selectedLugar.forecast?.length" class="col-12">
          <div class="detail-card">
            <h3 class="detail-section-title mb-4">Próximos días</h3>
            <div class="row row-cols-2 row-cols-md-4 row-cols-xl-7 g-2">
              <div
                v-for="day in selectedLugar.forecast.slice(1, 8)"
                :key="day.date"
                class="col"
              >
                <div class="forecast-day">
                  <div class="forecast-day__date">
                    {{
                      new Date(day.date + 'T12:00:00').toLocaleDateString(
                        localeMap[countryKey] ?? 'es-CL',
                        { weekday: 'short', day: '2-digit' }
                      )
                    }}
                  </div>
                  <i :class="getIconClass(day.code)" class="forecast-day__icon"></i>
                  <div class="forecast-day__desc text-truncate">
                    {{ getWeather(day.code).label }}
                  </div>
                  <div class="forecast-day__temp">
                    ↑ {{ formatTemp(day.maxTemp) }}{{ tempSuffix }}
                  </div>
                  <div class="forecast-day__temp forecast-day__temp--min">
                    ↓ {{ formatTemp(day.minTemp) }}{{ tempSuffix }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div> </div>
  </section>
</template>
<style scoped lang="scss">
.btn-back {
  background: transparent;
  border: none;
  color: var(--card-link);
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  padding: 0;
  transition: opacity 0.2s;

  &:hover { opacity: 0.8; }
}

.detail-card {
  // Aquí sucede la magia: usamos las variables del tema global
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 1rem;
  padding: 1.5rem;
  color: var(--card-text-primary);
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}

.detail-section-title {
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--card-text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.detail-muted {
  color: var(--card-text-secondary);
}

.text-theme-highlight {
  color: var(--card-text-primary);
}

.detail-main-icon {
  color: var(--card-link);
}

.detail-alert {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(74, 158, 221, 0.1);
  border: 1px solid var(--card-border);
  border-radius: 0.75rem;
  padding: 0.6rem 1rem;
  font-size: 0.9rem;
  color: var(--card-text-primary);

  i { color: var(--card-link); }
}

.forecast-day {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--card-border);
  border-radius: 0.75rem;
  padding: 1rem 0.5rem;
  text-align: center;
  height: 100%;
  transition: transform 0.2s;

  .app-theme-light & {
    background: rgba(0, 0, 0, 0.02);
  }

  &:hover { transform: translateY(-3px); }

  &__date {
    font-size: 0.85rem;
    font-weight: 700;
    color: var(--card-text-primary);
    text-transform: capitalize;
    margin-bottom: 0.5rem;
  }

  &__icon {
    font-size: 1.8rem;
    color: var(--card-link);
    display: block;
    margin-bottom: 0.5rem;
  }

  &__desc {
    font-size: 0.75rem;
    color: var(--card-text-secondary);
    margin-bottom: 0.5rem;
    line-height: 1.2;
  }

  &__temp {
    font-size: 0.9rem;
    font-weight: 700;
    color: var(--card-text-primary);

    &--min {
      color: var(--card-text-secondary);
      font-weight: 400;
      font-size: 0.8rem;
    }
  }
}


.temp-display {
  font-size: 3.5rem;
  font-weight: 800;
  line-height: 1;
  color: var(--card-text-primary);
}

.icon-circle {
  width: 40px;
  height: 40px;
  background: rgba(74, 158, 221, 0.1);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--card-link);
  font-size: 1.2rem;
}

.detail-main-icon {
  font-size: 4rem;
  color: var(--card-link);
}

// Para que las 7 columnas se vean perfectas en pantallas muy grandes
@media (min-width: 1200px) {
  .row-cols-xl-7 > * {
    flex: 0 0 auto;
    width: 14.285714%;
  }
}


</style>
