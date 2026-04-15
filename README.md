# 🌤️ BootCamp Weather

Proyecto de portfolio desarrollado como evidencia del aprendizaje en el Bootcamp de Desarrollo Frontend — Talento Digital / SENCE.

Aplicación web SPA que muestra el **clima actual y el pronóstico de 7 días** para ciudades de Chile y Argentina. Consume la API pública de Open-Meteo sin necesidad de API key, aplica caché local independiente por país, y adapta su paleta visual según la hora del día y las preferencias del usuario (tema claro/oscuro, unidades °C/°F).

---

## 🚀 Tecnologías utilizadas

- **Vue.js 3** — Composition API, `<script setup>`
- **Vue Router 4** — navegación SPA sin recarga
- **Vuex 4** — estado global de autenticación y preferencias de usuario
- **Vite** — entorno de desarrollo y build
- **Axios** — cliente HTTP para APIs de clima y noticias
- **Bootstrap 5** — grilla y utilidades
- **Bootstrap Icons** — íconos de clima y UI
- **SCSS** — estilos propios con variables, BEM y patrón 7-1
- **Open-Meteo API** — datos meteorológicos gratuitos y sin API key
- **NewsAPI.org** — noticias de clima en español (endpoint `everything`)
- **localStorage** — caché por país con TTL de 6 horas

---

## 📁 Estructura del proyecto

```text
src/
├── App.vue                         # Componente raíz, aplica tema global
├── main.js                         # Punto de entrada, monta la app
│
├── api/
│   ├── http.js                     # Cliente Axios base con interceptores
│   ├── newsApi.js                  # Integración NewsAPI.org (noticias clima)
│   └── weatherApi.js               # Wrapper Axios para Open-Meteo
│
├── assets/
│   └── scss/
│       ├── main.scss               # Punto de entrada SCSS
│       ├── abstracts/
│       │   └── _variables.scss     # Variables globales (colores, gradientes)
│       ├── base/
│       │   └── _reset.scss         # Reset y estilos base
│       ├── components/
│       │   ├── _buttonsFav.scss    # Estilos botón favorito ⭐
│       │   ├── _favorite-card.scss # Tarjeta de favoritos
│       │   ├── _news-card.scss     # Tarjeta de noticias
│       │   └── _weather-card.scss  # Tarjeta de clima
│       ├── layout/
│       │   └── _header.scss        # Estilos del header/navbar
│       └── themes/
│           └── _theme.scss         # Temas dark/light + day/afternoon/night
│
├── components/
│   ├── Navbar.vue                  # Barra de navegación con login/logout
│   └── WeatherCard.vue             # Tarjeta reutilizable de clima
│
├── mock/
│   └── users.js                    # Usuarios mock + persistencia localStorage
│
├── router/
│   └── index.js                    # Rutas SPA + guards de autenticación
│
├── store/
│   ├── index.js                    # Store raíz de Vuex
│   └── auth.js                     # Módulo auth: usuario, login, preferencias
│
├── utils/
│   ├── temperature.js              # Helpers para formatear °C/°F
│   ├── weatherConfig.js            # Configuración de 11 países y ciudades
│   └── weatherHelpers.js           # Caché, normalización, iconos, stats
│
└── views/
    ├── HomeView.vue                # Dashboard con capitales
    ├── PronosticosView.vue         # Listado de ciudades por país
    ├── LugarDetalleView.vue        # Detalle y forecast 7 días por ciudad
    ├── NewsView.vue                # Noticias de clima en español
    ├── LoginView.vue               # Inicio de sesión simulado
    ├── RegisterView.vue            # Registro de nuevo usuario
    ├── FavoritesView.vue           # Lugares favoritos (requiere login)
    ├── PreferencesView.vue         # Preferencias °C/°F y tema (requiere login)
    └── AboutView.vue               # Información del autor
```

---

## 🗺️ Rutas disponibles

| Ruta                           | Vista              | Descripción                                              |
|--------------------------------|--------------------|----------------------------------------------------------|
| `/`                            | HomeView           | Dashboard con capitales y accesos                        |
| `/pronosticos`                 | PronosticosView    | Listado de ciudades por país                             |
| `/pronosticos/:country/:city`  | LugarDetalleView   | Detalle y forecast 7 días por ciudad                     |
| `/news`                        | NewsView           | Noticias de clima en español (NewsAPI)                   |
| `/login`                       | LoginView          | Inicio de sesión simulado                                |
| `/favoritos`                   | FavoritesView      | Lugares favoritos del usuario (requiere login)           |
| `/preferencias`                | PreferencesView    | Unidad °C/°F y tema claro/oscuro (requiere login)        |
| `/about`                       | QuienesSomosView   | Información del autor                                    |

---

## ⚙️ Funcionalidades principales

- Pronósticos por ciudad con temperatura actual, mínima y máxima.
- Selector de país (Chile 🇨🇱 / Argentina 🇦🇷) con carga dinámica.
- Búsqueda de ciudades en tiempo real con `v-model`.
- Detalle semanal con forecast de 7 días, promedio, tipo de semana y alertas.
- Caché por país en `localStorage` con TTL de 6 horas (logs en consola).
- Theme de cards según hora del día (día / tarde / noche).
- Tema global **dark/light** configurable por usuario.
- Soporte de unidades **°C / °F** configurables en la vista de preferencias.
- Login simulado con Vuex (usuarios mock) y rutas protegidas (`/favoritos`, `/preferencias`).
- Navbar con estado de sesión (nombre, login/logout, accesos a secciones de usuario).
- Lista de **lugares favoritos** por usuario autenticado.
- Clima actual de capitales en el Home con navegación directa al detalle.
- Noticias de clima en español usando **NewsAPI.org** (`/everything`, filtro por clima y últimos 7 días).
- Arquitectura multi-país extensible a más mercados (COUNTRIES en `weatherConfig.js`).

---

## 🌐 API de clima utilizada

**Open-Meteo** — API meteorológica gratuita y sin registro.

- 📄 Documentación: https://open-meteo.com/en/docs  
- 🔗 URL base: `https://api.open-meteo.com/v1/forecast`

La app consulta todas las ciudades en **una sola petición** por país, enviando los arrays de latitudes y longitudes separados por coma:

```text
?latitude=...&longitude=...
&current=temperature_2m,weather_code
&daily=weather_code,temperature_2m_max,temperature_2m_min
&timezone=America/Santiago
```

Para cada país se configura el endpoint final en `weatherConfig.js`, incluyendo timezone, capital y lista de ciudades.

---

## 📰 API de noticias utilizada

**NewsAPI.org** — Servicio de noticias para consultar artículos en tiempo real.

> Importante: NewsAPI no permite usar la API key directamente desde producción abierta.  
> En este proyecto se utiliza solo para fines educativos en entorno local.

- 📄 Documentación general: https://newsapi.org/docs  
- 📄 Endpoint usado: `/v2/everything`  
- 🔐 API key: se lee desde `import.meta.env.VITE_NEWS_API_KEY` (definida en `.env.local`)

Ejemplo de consulta simplificada:

```http
GET https://newsapi.org/v2/everything
  ?q=(clima OR meteorología OR pronóstico)
    AND (lluvia OR tormenta OR sequía OR inundación OR nieve OR granizo
         OR "ola de calor" OR ciclón OR huracán)
  &language=es
  &from=YYYY-MM-DD    # últimos 7 días
  &sortBy=publishedAt
  &pageSize=20
  &apiKey=TU_API_KEY
```

La vista `NewsView.vue` consume esta API con **Axios**, muestra tarjetas de noticias (imagen + título + descripción) y limita la cantidad de artículos renderizados para mantener la interfaz limpia.

---

## 📊 Cálculo de estadísticas (`getForecastStats`)

Las estadísticas se calculan sobre los **próximos 7 días** del pronóstico (`forecast.slice(1, 8)`), excluyendo el día actual.

### Temperatura promedio semanal

\[
avgTemp = \frac{\sum_{i=1}^{7} \left(\frac{maxTemp[i] + minTemp[i]}{2}\right)}{7}
\]

Se redondea a un decimal y se usa tanto en la tarjeta de detalle como en la sección “Resumen semanal”.

### Alertas automáticas

| Alerta              | Condición                               |
|---------------------|-----------------------------------------|
| 🌡️ **Calor**        | Al menos un día con máxima ≥ 25°C       |
| 🧊 **Frío**         | Al menos un día con mínima ≤ 5°C        |
| 🌧️ **Semana lluviosa** | 3 o más días con códigos de lluvia (51–99) |

### Tipo de semana

Se cuentan días despejados (0–1), nublados (2–3, 45–48) y lluviosos (51–99).  
La categoría con más días define la etiqueta: *Semana despejada*, *Semana nublada*, *Semana lluviosa* o *Semana variada*.

---

## 🎨 Arquitectura de estilos — SCSS

Paleta principal:

| Variable             | Color       | Uso                      |
|----------------------|------------|--------------------------|
| `$color-primary`     | `#4a9edd`  | Botones y acentos        |
| `$color-bg`          | `#0a1628`  | Fondo body               |
| `$color-text`        | `#ffffff`  | Texto principal          |
| `$color-text-muted`  | `#a8c4e0`  | Texto secundario         |
| `$color-border`      | `#2a5a8c`  | Bordes de cards          |

Themes de cards por hora del día (modo dark):

| Theme            | Horario       | Gradiente                             |
|------------------|--------------|----------------------------------------|
| `theme-day`      | 06:00 – 17:59| Azul oscuro `#1a3a5c → #0f2744`        |
| `theme-afternoon`| 18:00 – 20:59| Naranja `#f59e0b → #9a3412`            |
| `theme-night`    | 21:00 – 05:59| Noche `#1e293b → #020617`              |

El tema global (`app-theme-dark` / `app-theme-light`) se combina con estos themes por hora para generar variantes claras/oscuro de cada tarjeta, manteniendo el contraste y la armonía visual.

Convención de nombres **BEM**:

```scss
.weather-card { ... }
.weather-card__icon { ... }
.weather-card__title { ... }

.news-card { ... }
.news-card__image { ... }
.news-card__body { ... }
```

---

## 🌍 Arquitectura multi-país (`weatherConfig.js`)

Toda la configuración de cada país vive en el objeto `COUNTRIES`. Agregar un país nuevo es tan simple como añadir una entrada:

```js
const COUNTRIES = {
  chile: {
    label:    'Chile 🇨🇱',
    capital:  'Santiago',
    cacheKey: 'weatherCache_chile',
    timezone: 'America/Santiago',
    cities:   ['Arica', 'Iquique', ...],
    apiUrl:   'https://api.open-meteo.com/v1/forecast?...',
  },
  argentina: {
    label:    'Argentina 🇦🇷',
    capital:  'Buenos Aires',
    cacheKey: 'weatherCache_argentina',
    timezone: 'America/Argentina/Buenos_Aires',
    cities:   ['Buenos Aires', 'Córdoba', ...],
    apiUrl:   'https://api.open-meteo.com/v1/forecast?...',
  },
}
```

### Caché independiente por país

| País       | Clave localStorage        | TTL    |
|-----------|---------------------------|--------|
| Chile     | `weatherCache_chile`      | 6 horas|
| Argentina | `weatherCache_argentina`  | 6 horas|
| Noticias  | `newsCache` (opcional)    | 3 horas|

---

## 🔐 Autenticación y preferencias

Para esta iteración se agregó un sistema de login simulado utilizando **Vuex 4**:

- Módulo `auth` con:
  - `state.user`, `state.isAuthenticated`.
  - Mutaciones `SET_USER`, `LOGOUT`, `UPDATE_PREFERENCES`.
  - Getters `isAuthenticated`, `currentUser`, `favorites`, `preferences`.
- Login contra un arreglo de usuarios mock (`mockUsers`), sin backend real.
- Rutas protegidas (`/favoritos`, `/preferencias`) usando guards de **Vue Router** (`meta.requiresAuth` + `beforeEach`).

Preferencias de usuario:

- Unidad de temperatura: °C / °F.
- Tema global: claro / oscuro.

Las preferencias se guardan en Vuex y se consumen en:

- `WeatherCard.vue` y `LugarDetalleView.vue` para formatear °C/°F.  
- `HomeView.vue` para mostrar capitales en la unidad elegida.  
- `App.vue` para aplicar clases `app-theme-light` / `app-theme-dark` y combinar con los temas por hora (day/afternoon/night).

---

## 🏙️ Ciudades cubiertas

**Chile 🇨🇱 (16 ciudades)**
Arica · Iquique · Antofagasta · Copiapó · La Serena · Valparaíso · Santiago · Rancagua · Talca · Chillán · Concepción · Temuco · Valdivia · Puerto Montt · Coyhaique · Punta Arenas

**Argentina 🇦🇷 (24 ciudades)**
Buenos Aires · Córdoba · Rosario · Posadas · San Salvador de Jujuy · Catamarca · Formosa · Resistencia · Paraná · San Juan · San Luis · Santa Rosa · Neuquén · Rawson · Viedma · Río Gallegos · Ushuaia · Bahía Blanca · Sgo. del Estero · Tucumán · Salta · La Plata · Mendoza · La Rioja

**Bolivia 🇧🇴 (9 ciudades)**
Cobija · Trinidad · El Alto · La Paz · Cochabamba · Santa Cruz de la Sierra · Oruro · Sucre · Potosí

**Perú 🇵🇪 (8 ciudades)**
Piura · Chiclayo · Trujillo · Huánuco · Lima · Huancayo · Cusco · Arequipa

**Colombia 🇨🇴 (8 ciudades)**
Santa Marta · Barranquilla · Cartagena · Medellín · Bucaramanga · Cúcuta · Bogotá · Cali

**Ecuador 🇪🇨 (8 ciudades)**
Esmeraldas · Ibarra · Quito · Manta · Ambato · Guayaquil · Cuenca · Loja

**Venezuela 🇻🇪 (8 ciudades)**
Maracaibo · Barquisimeto · Valencia · Maracay · Caracas · Barcelona · Ciudad Bolívar · Ciudad Guayana

**Paraguay 🇵🇾 (8 ciudades)**
Pedro Juan Caballero · Concepción · San Lorenzo · Asunción · Capiatá · Ciudad del Este · Encarnación · Pilar

**Uruguay 🇺🇾 (8 ciudades)**
Artigas · Salto · Paysandú · Fray Bentos · Durazno · Minas · Montevideo · Punta del Este

**Brasil 🇧🇷 (8 ciudades)**
Belém · Fortaleza · Recife · Salvador · Brasília · Rio de Janeiro · São Paulo · Porto Alegre

**México 🇲🇽 (8 ciudades)**
Tijuana · Hermosillo · Chihuahua · Monterrey · Guadalajara · Ciudad de México · Puebla · Mérida

---
**Total: 11 países · 103 ciudades cubiertas**


### Caché independiente por país

| País       | Clave localStorage          | TTL    |
|------------|-----------------------------|--------|
| Chile      | `weatherCache_chile`        | 6 horas|
| Argentina  | `weatherCache_argentina`    | 6 horas|
| Bolivia    | `weatherCache_bolivia`      | 6 horas|
| Perú       | `weatherCache_peru`         | 6 horas|
| Colombia   | `weatherCache_colombia`     | 6 horas|
| Ecuador    | `weatherCache_ecuador`      | 6 horas|
| Venezuela  | `weatherCache_venezuela`    | 6 horas|
| Paraguay   | `weatherCache_paraguay`     | 6 horas|
| Uruguay    | `weatherCache_uruguay`      | 6 horas|
| Brasil     | `weatherCache_brasil`       | 6 horas|
| México     | `weatherCache_mexico`       | 6 horas|

## 🏃 Cómo correr el proyecto localmente

```bash
# Clonar el repositorio
git clone https://github.com/Mackelf/weather-frontend-m2.git

# Entrar a la carpeta
cd weather-frontend-m2

# Instalar dependencias
npm install

# Crear archivo de variables locales (.env.local) con tu API key de NewsAPI
echo "VITE_NEWS_API_KEY=TU_API_KEY_AQUI" > .env.local

# Correr en modo desarrollo
npm run dev
```

> ⚠️ No instalar en carpetas sincronizadas con Google Drive.  
> Usar una carpeta local estándar.

---
---

## 📝 Notas de versión (iteración actual)

### Iteración: Autenticación, preferencias y noticias

- Agregado login simulado con **Vuex 4**:
  - Módulo `auth` con usuario actual, estado `isAuthenticated` y preferencias.
  - Rutas protegidas `/favoritos` y `/preferencias` mediante guards de Vue Router.
  - Navbar con saludo al usuario, enlaces a secciones privadas y botón de logout.

- Preferencias de usuario:
  - Unidad de temperatura configurable: **°C / °F**.
  - Tema global de la app: **oscuro / claro**.
  - Integración de preferencias en Home, WeatherCard y vista de detalle.

- Temas visuales:
  - Combinación de tema global (`app-theme-dark` / `app-theme-light`) con temas por hora (`theme-day`, `theme-afternoon`, `theme-night`).
  - Nuevos gradientes para modo claro basados en los gradientes existentes.

- Noticias de clima:
  - Migración desde feed RSS a **NewsAPI.org** usando Axios.
  - Endpoint `/v2/everything` filtrado por palabras clave de clima en español y fecha de los últimos 7 días.
  - Vista `NewsView.vue` con tarjetas de noticias, imágenes recortadas y cantidad limitada de artículos.

- Documentación:
  - README actualizado con nuevas rutas, estructura de archivos, APIs usadas y pasos para configurar `.env.local` con `VITE_NEWS_API_KEY`.

  ### Iteración: Expansión de cobertura geográfica

- Agregados 9 nuevos países: Bolivia 🇧🇴, Perú 🇵🇪, Colombia 🇨🇴, Ecuador 🇪🇨, Venezuela 🇻🇪, Paraguay 🇵🇾, Uruguay 🇺🇾, Brasil 🇧🇷 y México 🇲🇽.
- Total: 11 países y 103 ciudades cubiertas con Open-Meteo.
- Caché independiente por país con TTL de 6 horas para cada uno.
- Arquitectura `weatherConfig.js` extensible sin modificar la lógica de vistas.
- Registro de usuario con persistencia en `localStorage` agregado en `/registro`.
- Deploy configurado en GitHub Pages desde rama `gh-pages`.
  
## 👤 Autor

Mario Canto  
Técnico en T.I. reconvertido a **Frontend Developer**.  
Bootcamp Talento Digital — Módulo Frontend  
GitHub: [@Mackelf](https://github.com/Mackelf)

---

## 📦 Dependencias externas

- [Open-Meteo](https://open-meteo.com/) — datos meteorológicos, sin API key  
- [NewsAPI.org](https://newsapi.org/) — noticias de clima en español  
- [Bootstrap 5](https://getbootstrap.com/) — grilla y utilidades  
- [Bootstrap Icons](https://icons.getbootstrap.com/) — íconos del tiempo  