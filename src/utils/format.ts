const BAHASA = 'id-ID';
const AWALAN_JAM = 0;
const PANJANG_JAM = 2;
const PANJANG_KUNCI_TANGGAL = 10;
const AWAL_JAM_KUNCI = 11;
const AKHIR_JAM_KUNCI = 13;

function ubahKeTanggal(waktuLokal: string): Date {
  return new Date(waktuLokal);
}

export function formatJam(waktuLokal: string): string {
  const tanggal = ubahKeTanggal(waktuLokal);
  const jam = String(tanggal.getHours()).padStart(PANJANG_JAM, '0');
  const menit = String(tanggal.getMinutes()).padStart(PANJANG_JAM, '0');

  return `${jam}:${menit}`;
}

export function formatTanggalJam(waktuLokal: string): string {
  return ubahKeTanggal(waktuLokal).toLocaleString(BAHASA, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
}

export function formatHari(waktuLokal: string): string {
  return ubahKeTanggal(waktuLokal).toLocaleDateString(BAHASA, { weekday: 'short' });
}

export function formatTanggalSingkat(waktuLokal: string): string {
  return ubahKeTanggal(waktuLokal).toLocaleDateString(BAHASA, {
    day: 'numeric',
    month: 'short',
  });
}

export function ambilKunciJamSekarang(zonaWaktu: string): string {
  const bagian = new Intl.DateTimeFormat('sv-SE', {
    timeZone: zonaWaktu,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(new Date());

  const tanggal = bagian.slice(AWALAN_JAM, PANJANG_KUNCI_TANGGAL);
  const jam = bagian.slice(AWAL_JAM_KUNCI, AKHIR_JAM_KUNCI);

  return `${tanggal}T${jam}`;
}

export function formatSuhu(nilai: number): string {
  return `${Math.round(nilai)}°`;
}
