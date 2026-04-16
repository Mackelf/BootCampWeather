<script setup>
import { ref, onMounted } from 'vue'
import { getLatamWeatherNewsEverything } from '@/api/newsApi'

const isLoading = ref(true)
const error = ref(null)
const articles = ref([])

async function loadNews() {
  try {
    isLoading.value = true
    error.value = null
    const data = await getLatamWeatherNewsEverything()
    // limitar para la UI (ej. primeras 12)
    articles.value = data.slice(0, 12)
  } catch (e) {
    error.value = e.message || 'Error cargando noticias'
  } finally {
    isLoading.value = false
  }
}

onMounted(loadNews)
</script>
<template>
  <section class="container py-4">
    <h1 class="mb-4 text-theme-primary fw-bold">Noticias del Clima</h1>

    <div v-if="isLoading" class="detail-muted">Cargando noticias de Latinoamérica...</div>
    <div v-else-if="error" class="text-danger">{{ error }}</div>
    <div v-else-if="articles.length === 0" class="detail-muted">
      No se encontraron noticias en este momento.
    </div>

    <div v-else class="row g-4">
      <div v-for="article in articles" :key="article.url" class="col-md-6 col-lg-4">
        <article class="news-card">
          <div v-if="article.urlToImage" class="news-card__image-container">
            <img :src="article.urlToImage" :alt="article.title" class="news-card__img" />
            <span class="news-card__badge">{{ article.source?.name }}</span>
          </div>

          <div class="news-card__body">
            <div class="news-card__meta mb-2">
              <i class="bi bi-geo-alt-fill me-1"></i> {{ article.region || 'Latam' }}
            </div>
            <h2 class="news-card__title">{{ article.title }}</h2>
            <p class="news-card__excerpt">
              {{ article.description }}
            </p>
            <div class="mt-auto">
              <a
                class="btn-news-action"
                :href="article.url"
                target="_blank"
                rel="noopener noreferrer"
              >
                Leer más <i class="bi bi-arrow-right ms-1"></i>
              </a>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template><style scoped lang="scss">
h1 {
  color: var(--card-text-primary);
  font-weight: 700;
}

.news-card {
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 1rem;
  overflow: hidden;
  color: var(--card-text-primary);
  display: flex;
  flex-direction: column;
  height: 100%;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
    
    // El efecto de zoom se activa al hacer hover en la card
    .news-card__img {
      transform: scale(1.05);
    }
  }

  // Contenedor con relación de aspecto fija
  &__image-container {
    width: 100%;
    height: 0;
    padding-bottom: 56.25%; // Relación 16:9
    overflow: hidden;
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0; bottom: 0;
      box-shadow: inset 0 0 40px rgba(0, 0, 0, 0.1);
      pointer-events: none;
    }
  }

  // La imagen propiamente tal
  &__img {
    position: absolute; 
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.5s ease;
  }

  &__badge {
    position: absolute;
    bottom: 10px;
    right: 10px;
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(4px);
    color: white;
    padding: 2px 8px;
    border-radius: 4px;
    font-size: 0.7rem;
    z-index: 2;
  }

  &__body {
    padding: 1.25rem;
    display: flex;
    flex-direction: column;
    flex-grow: 1;

    h2 {
      font-size: 1.1rem;
      font-weight: 700;
      line-height: 1.4;
      margin-bottom: 0.75rem;
      color: var(--card-text-primary);
    }

    p {
      color: var(--card-text-secondary);
      line-height: 1.5;
      font-size: 0.9rem;
    }
  }

  &__meta {
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--card-link);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
}

// Botón de Bootstrap adaptado
.btn-news-action {
  display: inline-flex;
  align-items: center;
  color: var(--card-link);
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }
}
</style>