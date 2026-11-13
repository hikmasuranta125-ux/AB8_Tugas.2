import { ref } from 'vue';

import { ambilCuacaPerJam } from '../services/weatherApi';
import type { DataCuaca } from '../types/weather';

const PESAN_GALAT = 'Data cuaca gagal dimuat. Periksa koneksi internet Anda.';

export function useCuaca() {
  const data = ref<DataCuaca | null>(null);
  const memuat = ref(true);
  const galat = ref<string | null>(null);

  async function muatUlang() {
    memuat.value = true;
    galat.value = null;

    try {
      data.value = await ambilCuacaPerJam();
    } catch {
      galat.value = PESAN_GALAT;
    } finally {
      memuat.value = false;
    }
  }

  return { data, memuat, galat, muatUlang };
}
