// src/api/newsApi.js
import http from './http'

const NEWS_API_BASE = 'https://newsapi.org/v2'
const apiKey = import.meta.env.VITE_NEWS_API_KEY

console.log('[NEWS] apiKey:', apiKey ? 'OK (no null)' : 'FALTA')
// src/api/newsApi.js
export async function getLatamWeatherNewsEverything() {
  try {
    const resp = await http.get(`${NEWS_API_BASE}/everything`, {
      params: {
        q: '(clima OR meteorología OR pronóstico) AND (lluvia OR tormenta OR sequía OR inundación OR nieve OR granizo OR "ola de calor" OR ciclón OR huracán)',
        language: 'es',
        sortBy: 'publishedAt',
        pageSize: 20,
        from: getDateDaysAgo(7),
        apiKey,
      },
    })

    console.log('[NEWS everything] status:', resp.data.status, 'total:', resp.data.totalResults)

    return (resp.data.articles || []).map((a) => ({
      ...a,
      region: 'Noticias en español',
    }))
  } catch (error) {
    console.error('[NEWS everything] Error:', error)
    return []
  }
}

// helper
function getDateDaysAgo(days) {
  const d = new Date()
  d.setDate(d.getDate() - days)
  return d.toISOString().split('T')[0] // "2025-04-07"
}
