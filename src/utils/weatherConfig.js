// src/utils/weatherConfig.js

export const COUNTRIES = {
  chile: {
    label: 'Chile 🇨🇱',
    capital: 'Santiago',
    cacheKey: 'weatherCache_chile',
    timezone: 'America/Santiago',
    cities: [
      'Arica',
      'Iquique',
      'Antofagasta',
      'Copiapo',
      'La Serena',
      'Valparaiso',
      'Santiago',
      'Rancagua',
      'Talca',
      'Chillán',
      'Concepción',
      'Temuco',
      'Valdivia',
      'Puerto Montt',
      'Coyhaique',
      'Punta Arenas',
    ],
    apiUrl:
      'https://api.open-meteo.com/v1/forecast' +
      '?latitude=-18.4746,-20.2133,-23.6509,-27.3668,-29.9027,-33.0472,-33.4489,-34.1708,-35.4264,-36.0667,-36.8270,-38.7359,-39.8142,-41.4693,-45.5752,-53.1638' +
      '&longitude=-70.2979,-70.1503,-70.3975,-70.3322,-71.2519,-71.6127,-70.6693,-70.7444,-71.6554,-71.9167,-73.0498,-72.5904,-73.2459,-72.9411,-72.0662,-70.9171' +
      '&current=temperature_2m,weather_code' +
      '&daily=weather_code,temperature_2m_max,temperature_2m_min' +
      '&timezone=America/Santiago',
  },

  argentina: {
    label: 'Argentina 🇦🇷',
    capital: 'Buenos Aires',
    cacheKey: 'weatherCache_argentina',
    timezone: 'America/Argentina/Buenos_Aires',
    cities: [
      'Buenos Aires',
      'Córdoba',
      'Rosario',
      'Posadas',
      'San Salvador de Jujuy',
      'Catamarca',
      'Formosa',
      'Resistencia',
      'Paraná',
      'San Juan',
      'San Luis',
      'Santa Rosa',
      'Neuquén',
      'Rawson',
      'Viedma',
      'Río Gallegos',
      'Ushuaia',
      'Bahía Blanca',
      'Sgo. del Estero',
      'Tucumán',
      'Salta',
      'La Plata',
      'Mendoza',
      'La Rioja',
    ],
    apiUrl:
      'https://api.open-meteo.com/v1/forecast' +
      '?latitude=-34.6132,-31.4135,-32.9468,-27.3671,-24.1858,-28.4696,-26.1849,-27.4606,-31.7333,-31.5375,-33.3017,-32.4847,-36.6167,-38.9516,-43.3002,-40.8135,-45.8641,-54.8019,-38.7196,-27.8006,-26.8241,-24.7859,-34.9215,-33.2950' +
      '&longitude=-58.3772,-64.1811,-60.6393,-55.8961,-65.2995,-65.7852,-58.1731,-58.9839,-60.5298,-68.5364,-66.3378,-58.2321,-64.2833,-68.0591,-65.1023,-62.9967,-67.4808,-68.3030,-62.2724,-64.2615,-65.2226,-65.4117,-57.9545,-66.3356' +
      '&current=temperature_2m,weather_code' +
      '&daily=weather_code,temperature_2m_max,temperature_2m_min' +
      '&timezone=America/Argentina/Buenos_Aires',
  },
bolivia: {
  label: 'Bolivia 🇧🇴',
  capital: 'Sucre',
  cacheKey: 'weatherCache_bolivia',
  timezone: 'America/La_Paz',
  cities: [
    'Cobija',
    'Trinidad',
    'El Alto',
    'La Paz',
    'Cochabamba',
    'Santa Cruz de la Sierra',
    'Oruro',
    'Sucre',
    'Potosí',
  ],
  apiUrl:
    'https://api.open-meteo.com/v1/forecast' +
    '?latitude=-11.0267,-14.8333,-16.5,-16.5,-17.3895,-17.7863,-17.9833,-19.0333,-19.5836' +
    '&longitude=-68.7692,-64.9,-68.15,-68.15,-66.1568,-63.1812,-67.15,-65.2627,-65.7531' +
    '&current=temperature_2m,weather_code' +
    '&daily=weather_code,temperature_2m_max,temperature_2m_min' +
    '&timezone=America%2FLa_Paz' +
    '&forecast_days=8',
},
// Agrega estos países al objeto COUNTRIES en weatherConfig.js

peru: {
  label: 'Perú 🇵🇪',
  capital: 'Lima',
  cacheKey: 'weatherCache_peru',
  timezone: 'America/Lima',
  cities: [
    'Piura',
    'Chiclayo',
    'Trujillo',
    'Huánuco',
    'Lima',
    'Huancayo',
    'Cusco',
    'Arequipa',
  ],
  apiUrl:
    'https://api.open-meteo.com/v1/forecast' +
    '?latitude=-5.19449,-6.77137,-8.11599,-9.93062,-12.04318,-12.06513,-13.52264,-16.39889' +
    '&longitude=-80.63282,-79.84088,-79.02998,-76.24223,-77.02824,-75.20486,-71.96734,-71.535' +
    '&current=temperature_2m,weather_code' +
    '&daily=weather_code,temperature_2m_max,temperature_2m_min' +
    '&timezone=America%2FLima' +
    '&forecast_days=8',
},

colombia: {
  label: 'Colombia 🇨🇴',
  capital: 'Bogotá',
  cacheKey: 'weatherCache_colombia',
  timezone: 'America/Bogota',
  cities: [
    'Santa Marta',
    'Barranquilla',
    'Cartagena',
    'Medellín',
    'Bucaramanga',
    'Cúcuta',
    'Bogotá',
    'Cali',
  ],
  apiUrl:
    'https://api.open-meteo.com/v1/forecast' +
    '?latitude=11.24079,10.96854,10.39972,6.25184,7.12539,7.89391,4.60971,3.43722' +
    '&longitude=-74.19904,-74.78132,-75.51444,-75.56359,-73.1198,-72.50782,-74.08175,-76.5225' +
    '&current=temperature_2m,weather_code' +
    '&daily=weather_code,temperature_2m_max,temperature_2m_min' +
    '&timezone=America%2FBogota' +
    '&forecast_days=8',
},

ecuador: {
  label: 'Ecuador 🇪🇨',
  capital: 'Quito',
  cacheKey: 'weatherCache_ecuador',
  timezone: 'America/Guayaquil',
  cities: [
    'Esmeraldas',
    'Ibarra',
    'Quito',
    'Manta',
    'Ambato',
    'Guayaquil',
    'Cuenca',
    'Loja',
  ],
  apiUrl:
    'https://api.open-meteo.com/v1/forecast' +
    '?latitude=0.9667,-0.35,-0.22985,-0.94937,-1.24908,-2.19616,-2.9001,-3.99313' +
    '&longitude=-79.65,-78.11667,-78.52495,-80.73137,-78.61675,-79.88621,-79.00453,-79.20422' +
    '&current=temperature_2m,weather_code' +
    '&daily=weather_code,temperature_2m_max,temperature_2m_min' +
    '&timezone=America%2FGuayaquil' +
    '&forecast_days=8',
},

venezuela: {
  label: 'Venezuela 🇻🇪',
  capital: 'Caracas',
  cacheKey: 'weatherCache_venezuela',
  timezone: 'America/Caracas',
  cities: [
    'Maracaibo',
    'Barquisimeto',
    'Valencia',
    'Maracay',
    'Caracas',
    'Barcelona',
    'Ciudad Bolívar',
    'Ciudad Guayana',
  ],
  apiUrl:
    'https://api.open-meteo.com/v1/forecast' +
    '?latitude=10.66663,10.0647,10.16202,10.23535,10.48801,10.13625,8.12923,8.35122' +
    '&longitude=-71.61245,-69.35703,-68.00765,-67.59113,-66.87919,-64.68618,-63.54086,-62.64102' +
    '&current=temperature_2m,weather_code' +
    '&daily=weather_code,temperature_2m_max,temperature_2m_min' +
    '&timezone=America%2FCaracas' +
    '&forecast_days=8',
},

paraguay: {
  label: 'Paraguay 🇵🇾',
  capital: 'Asunción',
  cacheKey: 'weatherCache_paraguay',
  timezone: 'America/Asuncion',
  cities: [
    'Pedro Juan Caballero',
    'Concepción',
    'San Lorenzo',
    'Asunción',
    'Capiatá',
    'Ciudad del Este',
    'Encarnación',
    'Pilar',
  ],
  apiUrl:
    'https://api.open-meteo.com/v1/forecast' +
    '?latitude=-22.54722,-23.39985,-25.33968,-25.28646,-25.3552,-25.50972,-27.33333,-26.86667' +
    '&longitude=-55.73333,-57.43236,-57.50879,-57.647,-57.44545,-54.61111,-55.86667,-58.3' +
    '&current=temperature_2m,weather_code' +
    '&daily=weather_code,temperature_2m_max,temperature_2m_min' +
    '&timezone=America%2FAsuncion' +
    '&forecast_days=8',
},

uruguay: {
  label: 'Uruguay 🇺🇾',
  capital: 'Montevideo',
  cacheKey: 'weatherCache_uruguay',
  timezone: 'America/Montevideo',
  cities: [
    'Artigas',
    'Salto',
    'Paysandú',
    'Fray Bentos',
    'Durazno',
    'Minas',
    'Montevideo',
    'Punta del Este',
  ],
  apiUrl:
    'https://api.open-meteo.com/v1/forecast' +
    '?latitude=-30.40361,-31.38333,-32.31667,-33.11651,-33.38056,-34.37589,-34.90328,-34.96667' +
    '&longitude=-56.47139,-57.96667,-58.08333,-58.31067,-56.52361,-55.23771,-56.18816,-54.95' +
    '&current=temperature_2m,weather_code' +
    '&daily=weather_code,temperature_2m_max,temperature_2m_min' +
    '&timezone=America%2FMontevideo' +
    '&forecast_days=8',
},

brasil: {
  label: 'Brasil 🇧🇷',
  capital: 'Brasília',
  cacheKey: 'weatherCache_brasil',
  timezone: 'America/Sao_Paulo',
  cities: [
    'Belém',
    'Fortaleza',
    'Recife',
    'Salvador',
    'Brasília',
    'Rio de Janeiro',
    'São Paulo',
    'Porto Alegre',
  ],
  apiUrl:
    'https://api.open-meteo.com/v1/forecast' +
    '?latitude=-1.45583,-3.71722,-8.05389,-12.97563,-15.77972,-22.90642,-23.5475,-30.03283' +
    '&longitude=-48.50444,-38.54306,-34.88111,-38.49096,-47.92972,-43.18223,-46.63611,-51.23019' +
    '&current=temperature_2m,weather_code' +
    '&daily=weather_code,temperature_2m_max,temperature_2m_min' +
    '&timezone=America%2FSao_Paulo' +
    '&forecast_days=8',
},

mexico: {
  label: 'México 🇲🇽',
  capital: 'Ciudad de México',
  cacheKey: 'weatherCache_mexico',
  timezone: 'America/Mexico_City',
  cities: [
    'Tijuana',
    'Hermosillo',
    'Chihuahua',
    'Monterrey',
    'Guadalajara',
    'Ciudad de México',
    'Puebla',
    'Mérida',
  ],
  apiUrl:
    'https://api.open-meteo.com/v1/forecast' +
    '?latitude=32.5027,29.1026,28.63528,25.67507,20.66682,19.42847,19.03793,20.97537' +
    '&longitude=-117.00371,-110.97732,-106.08889,-100.31847,-103.39182,-99.12766,-98.20346,-89.61696' +
    '&current=temperature_2m,weather_code' +
    '&daily=weather_code,temperature_2m_max,temperature_2m_min' +
    '&timezone=America%2FMexico_City' +
    '&forecast_days=8',
},
  // aquí luego agregas más países
}

export const localeMap = {
  chile:     'es-CL',
  argentina: 'es-AR',
  bolivia:   'es-BO',
  peru:      'es-PE',
  colombia:  'es-CO',
  ecuador:   'es-EC',
  venezuela: 'es-VE',
  paraguay:  'es-PY',
  uruguay:   'es-UY',
  brasil:    'pt-BR',
  mexico:    'es-MX',
}

export const CACHE_TTL_MS = 6 * 60 * 60 * 1000
