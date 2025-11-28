export type Stop = {
  id: string;
  name: string;
  lat: number;
  lon: number;
};

export type LineForStop = {
  trip_id: string;
  number: string;
  name: string;
  arrival_time: string | null;
  arrival_time_seconds: number | null;
};
