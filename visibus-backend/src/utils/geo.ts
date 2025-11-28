// src/utils/geo.ts
export function haversineSql(lat: number, lon: number, radiusKm = 1) {
  // returns SQL condition and param array fragment
  // We'll use formula in query directly; caller must pass params (lat, lon, radiusKm)
  // In SQL we'll compute distance in km: 6371 *...
  // This helper just documents param order: lat, lon, radiusKm
  return {
    paramsOrder: ["lat", "lon", "radiusKm"],
  };
}
