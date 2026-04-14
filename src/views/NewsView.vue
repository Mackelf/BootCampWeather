<script setup>
import { ref, onMounted } from 'vue';
import { getLatamWeatherNewsEverything } from '@/api/newsApi';

const isLoading = ref(true);
const error = ref(null);
const articles = ref([]);

async function loadNews() {
  try {
    isLoading.value = true;
    error.value = null;
    const data = await getLatamWeatherNewsEverything();
    // limitar para la UI (ej. primeras 12)
    articles.value = data.slice(0, 12);
  } catch (e) {
    error.value = e.message || 'Error cargando noticias';
  } finally {
    isLoading.value = false;
  }
}

onMounted(loadNews);
</script>

<template>
  <section class="container py-4">
    <h1 class="mb-3">Noticias de clima en español</h1>

    <div v-if="isLoading" class="text-muted">Cargando noticias...</div>
    <div v-else-if="error" class="text-danger">{{ error }}</div>
    <div v-else-if="articles.length === 0" class="text-muted">
      No se encontraron noticias de clima en este momento.
    </div>

    <div v-else class="row g-3">
      <div
        v-for="article in articles"
        :key="article.url"
        class="col-md-6 col-lg-4"
      >
        <article class="news-card h-100">
          <div v-if="article.urlToImage" class="news-card__image">
            <img :src="article.urlToImage" :alt="article.title" />
          </div>
          <div class="news-card__body">
            <p class="news-card__source small text-muted">
              {{ article.source?.name }} • {{ article.region }}
            </p>
            <h2 class="h6 mb-2">{{ article.title }}</h2>
            <p class="small text-muted">
              {{ article.description }}
            </p>
            <a
              class="btn btn-sm btn-outline-primary"
              :href="article.url"
              target="_blank"
              rel="noopener noreferrer"
            >
              Ver noticia
            </a>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

