const BAHASA = 'id-ID';

function ubahKeTanggal(waktuLokal: string): Date {
  return new Date(waktuLokal);
}

export function formatJam(waktuLokal: string): string {
  return ubahKeTanggal(waktuLokal).toLocaleTimeString(BAHASA, {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
}

export function formatTanggalJam(waktuLokal: string): string {
  const tanggal = ubahKeTanggal(waktuLokal).toLocaleDateString(BAHASA, {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  return `${tanggal}, ${formatJam(waktuLokal)}`;
}

export function formatHari(waktuLokal: string): string {
  return ubahKeTanggal(waktuLokal).toLocaleDateString(BAHASA, { weekday: 'short' });
}

export function formatTanggalSingkat(waktuLokal: string): string {
  return ubahKeTanggal(waktuLokal).toLocaleDateString(BAHASA, {
    day: '2-digit',
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
    hour12: false,
  }).format(new Date());

  return bagian.replace(' ', 'T');
}

export function formatSuhu(nilai: number): string {
  return `${Math.round(nilai)}°`;
}
