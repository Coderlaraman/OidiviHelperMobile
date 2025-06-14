// src/types/location.ts

export interface LocationData {
  address: string;
  zip_code: string;
  latitude: number;
  longitude: number;
}

export interface LocationSuggestion {
  place_id: string;
  display_name: string;
  lat: string;
  lon: string;
}
