<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import WeatherCard from '../components/WeatherCard.vue'
import { COUNTRIES, localeMap } from '@/utils/weatherConfig'
import { useStore } from 'vuex'
import {
  getWeather,
  getIconClass,
  getThemeByTime,
  getDotColor,
  normalizeLocations,
  loadWeatherData,
  saveWeatherData,
} from '@/utils/weatherHelpers'
import { fetchWeatherByCountry } from '@/api/weatherApi' // ✅ solo una vez

const store = useStore()
const isAuthenticated = computed(() => store.getters['auth/isAuthenticated'])

const isFavorite = (city, country) =>
  store.getters['auth/isFavorite'](city, country)

const toggleFavorite = (city, country) => {
  if (!isAuthenticated.value) return
  store.commit('auth/TOGGLE_FAVORITE', { city, country })
}

const router = useRouter()
const route = useRoute()

const searchTerm = ref('')
const hasResults = computed(() => filteredLugares.value.length > 0)

const filteredLugares = computed(() => {
  const term = searchTerm.value.trim().toLowerCase()
  if (!term) return lugares.value
  return lugares.value.filter((lugar) =>
    lugar.city.toLowerCase().includes(term)
  )
})

const currentCountry = ref('chile')
const lugares = ref([])
const isLoading = ref(true)
const error = ref(null)

const currentConfig = computed(() => COUNTRIES[currentCountry.value])

watch(currentCountry, () => {
  lugares.value = []
  searchTerm.value = ''
  loadData()
})

async function loadData() {
  try {
    isLoading.value = true
    error.value = null

    let data = loadWeatherData(currentCountry.value)
    if (!data) {
      const cfg = currentConfig.value
      if (!cfg) throw new Error('País no soportado')

      // ✅ Axios reemplaza fetch
      const raw = await fetchWeatherByCountry(cfg.apiUrl)
      const locations = Array.isArray(raw) ? raw : [raw]
      const normalizados = normalizeLocations(locations, currentCountry.value)

      const locale = localeMap[currentCountry.value] ?? 'es-CL'
      const todayLabel = new Date()
        .toLocaleDateString(locale, {
          day: '2-digit',
          month: 'short',
        })
        .toUpperCase()

      data = normalizados.map((loc) => {
        const wx = getWeather(loc.code)
        const iconClass = getIconClass(loc.code)
        return {
          city: loc.city,
          code: loc.code,
          description: wx.label.toUpperCase(),
          temp: loc.temp,
          minTemp: loc.minTemp,
          maxTemp: loc.maxTemp,
          iconClass,
          dateLabel: todayLabel,
          theme: getThemeByTime(),
          forecast: loc.forecast,
          dotColor: getDotColor(loc.code),
        }
      })

      saveWeatherData(currentCountry.value, data)
    }

    lugares.value = data
  } catch (e) {
    console.error(e)
    error.value = e.message
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  const queryCountry = route.query.country
  if (queryCountry && COUNTRIES[queryCountry]) {
    currentCountry.value = queryCountry
  }
  loadData()
})

function openDetails(lugar) {
  router.push({
    name: 'lugar-detalle',
    params: {
      country: currentCountry.value,
      city: lugar.city,
    },
  })
}
</script>

<template>
  <section class="container py-4">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h2 class="mb-0 text-theme-primary">Pronósticos destacados</h2>

      <div class="d-flex flex-grow-1 justify-content-md-end gap-2">
        <input
          v-model="searchTerm"
          type="text"
          class="form-control-theme"
          placeholder="Buscar ciudad..."
          
        />
      </div>

      <select
        v-model="currentCountry"
        class="form-select-theme"
       
      >
        <option
          v-for="(cfg, key) in COUNTRIES"
          :key="key"
          :value="key"
        >
          📍 {{ cfg.label }}
        </option>
      </select>
    </div>

    <div v-if="isLoading">Cargando pronósticos...</div>

    <div v-else-if="error" class="text-danger">
      {{ error }}
    </div>

    <div v-else>
      <div v-if="hasResults">
        <div class="row">
          <div
            v-for="lugar in filteredLugares"
            :key="lugar.city"
            class="col-12 col-sm-6 col-lg-4 d-flex justify-content-center mb-4"
          >
            <WeatherCard
              :city="lugar.city"
              :date-label="lugar.dateLabel"
              :description="lugar.description"
              :temperature="lugar.temp"
              :min-temp="lugar.minTemp"
              :max-temp="lugar.maxTemp"
              :icon-class="lugar.iconClass"
              :theme="lugar.theme"
              :dot-color="lugar.dotColor" 
              :show-favorite="isAuthenticated"
              :is-favorite="isFavorite(lugar.city, currentCountry)"
              @show-details="openDetails(lugar)"
              @toggle-favorite="toggleFavorite(lugar.city, currentCountry)"
            />
          </div>
        </div>
      </div>

      <div v-else class="text-muted">
        No se encontraron resultados para "{{ searchTerm }}"
      </div>
    </div>
  </section>
</template>
<style scoped lang="scss">
.text-theme-primary {
  color: var(--card-text-primary);
  transition: color 0.3s ease;
}

.form-control-theme, .form-select-theme {
  background-color: var(--nav-bg); // Usamos el fondo del nav que ya es reactivo
  color: var(--nav-text);
  border: 1px solid var(--card-border);
  border-radius: 0.5rem;
  padding: 0.4rem 0.8rem;
  font-size: 0.875rem;
  transition: all 0.3s ease;
  max-width: 220px;

  &::placeholder {
    color: var(--card-text-secondary);
    opacity: 0.7;
  }

  &:focus {
    outline: none;
    border-color: var(--card-link);
    box-shadow: 0 0 0 3px rgba(74, 158, 221, 0.2);
  }

  // En modo light, forzamos que el texto sea oscuro si el nav-bg es muy claro
  .app-theme-light & {
    background-color: #ffffff; 
    border-color: rgba(0, 0, 0, 0.1);
  }
}

// Estilo para el mensaje de "No resultados"
.text-muted {
  color: var(--card-text-secondary) !important;
}

// Loader reactivo
.loading-text {
  color: var(--card-text-primary);
}
</style>