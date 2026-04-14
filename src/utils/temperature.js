// src/utils/temperature.js

export function cToF(celsius) {
  if (celsius == null || isNaN(celsius)) return null;
  return celsius * 1.8 + 32; // F = C * 1.8 + 32
}

export function formatTempValue(valueInCelsius, unit = 'C') {
  if (valueInCelsius == null || isNaN(valueInCelsius)) return 'N/D';

  const n = Number(valueInCelsius);

  if (unit === 'F') {
    const f = cToF(n);
    return f.toFixed(1);
  }

  // default: Celsius
  return n.toFixed(1);
}

export function getTempSuffix(unit = 'C') {
  return unit === 'F' ? '°F' : '°C';
}