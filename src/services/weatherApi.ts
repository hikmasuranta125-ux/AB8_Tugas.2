import type { CuacaPerJam, DataCuaca } from '../types/weather';

export const TITIK_API = 'https://api.open-meteo.com/v1/forecast';
export const LINTANG_JAKARTA = -6.2;
export const BUJUR_JAKARTA = 106.8;
export const ZONA_WAKTU_JAKARTA = 'Asia/Jakarta';

interface ResponsOpenMeteo {
  latitude: number;
  longitude: number;
  elevation: number;
  timezone: string;
  hourly_units: {
    time: string;
    temperature_2m: string;
  };
  hourly: {
    time: string[];
    temperature_2m: number[];
  };
}

export function buatUrlApi(): string {
  const parameter = new URLSearchParams({
    latitude: String(LINTANG_JAKARTA),
    longitude: String(BUJUR_JAKARTA),
    hourly: 'temperature_2m',
    timezone: ZONA_WAKTU_JAKARTA,
  });

  return `${TITIK_API}?${parameter.toString()}`;
}

export async function ambilCuacaPerJam(): Promise<DataCuaca> {
  const respons = await fetch(buatUrlApi());

  if (!respons.ok) {
    throw new Error(`Gagal mengambil data cuaca (HTTP ${respons.status}).`);
  }

  const muatan = (await respons.json()) as ResponsOpenMeteo;
  const daftarWaktu = muatan.hourly?.time ?? [];
  const daftarSuhu = muatan.hourly?.temperature_2m ?? [];

  if (daftarWaktu.length === 0) {
    throw new Error('API tidak mengembalikan data prakiraan cuaca.');
  }

  const prakiraan: CuacaPerJam[] = daftarWaktu.map((waktu, indeks) => ({
    waktu,
    suhu: daftarSuhu[indeks],
  }));

  return {
    lintang: muatan.latitude,
    bujur: muatan.longitude,
    elevasi: muatan.elevation,
    zonaWaktu: muatan.timezone,
    satuan: muatan.hourly_units?.temperature_2m ?? '°C',
    prakiraan,
  };
}
