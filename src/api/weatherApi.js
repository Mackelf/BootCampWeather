// src/api/weatherApi.js
import http from './http'

export async function fetchWeatherByCountry(apiUrl) {
  const resp = await http.get(apiUrl)
  return resp.data
}