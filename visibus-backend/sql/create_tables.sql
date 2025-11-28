-- Extensão opcional (pode deixar mesmo sem geom)
CREATE EXTENSION IF NOT EXISTS postgis;

-- ===========================
-- TABELA DE PARADAS (STOPS)
-- ===========================
DROP TABLE IF EXISTS stops CASCADE;

CREATE TABLE stops (
  id TEXT PRIMARY KEY,
  name TEXT,
  stop_desc TEXT,
  lat DOUBLE PRECISION,
  lon DOUBLE PRECISION,
  location_type INTEGER
);

-- Índice eficiente para buscas por proximidade via lat/lon (não usa geom)
CREATE INDEX idx_stops_lat_lon ON stops(lat, lon);


-- ===========================
-- TABELA DE ROTAS
-- ===========================
DROP TABLE IF EXISTS routes CASCADE;

CREATE TABLE routes (
  id TEXT PRIMARY KEY,
  short_name TEXT,
  long_name TEXT
);


-- ===========================
-- TABELA DE TRIPS
-- ===========================
DROP TABLE IF EXISTS trips CASCADE;

CREATE TABLE trips (
  id TEXT PRIMARY KEY,
  route_id TEXT REFERENCES routes(id),
  service_id TEXT,
  headsign TEXT
);


-- ===========================
-- TABELA DE STOP_TIMES
-- ===========================
DROP TABLE IF EXISTS stop_times CASCADE;

CREATE TABLE stop_times (
  id BIGSERIAL PRIMARY KEY,
  trip_id TEXT REFERENCES trips(id),
  stop_id TEXT REFERENCES stops(id),
  stop_sequence INTEGER,
  arrival_time TEXT,
  arrival_time_seconds INTEGER
);

CREATE INDEX idx_stop_times_stop_arrival
  ON stop_times(stop_id, arrival_time_seconds);
