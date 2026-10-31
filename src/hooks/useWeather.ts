import { useCallback, useEffect, useState } from 'react';
import { ambilCuacaPerJam } from '../services/weatherApi';
import type { DataCuaca } from '../types/weather';

interface HasilCuaca {
  data: DataCuaca | null;
  memuat: boolean;
  galat: string | null;
  muatUlang: () => Promise<void>;
}

export function useCuaca(): HasilCuaca {
  const [data, setData] = useState<DataCuaca | null>(null);
  const [memuat, setMemuat] = useState<boolean>(true);
  const [galat, setGalat] = useState<string | null>(null);

  const muatUlang = useCallback(async () => {
    setMemuat(true);
    setGalat(null);
    try {
      const hasil = await ambilCuacaPerJam();
      setData(hasil);
    } catch (kesalahan) {
      setGalat(
        kesalahan instanceof Error ? kesalahan.message : 'Terjadi kesalahan yang tidak diketahui.',
      );
    } finally {
      setMemuat(false);
    }
  }, []);

  useEffect(() => {
    void muatUlang();
  }, [muatUlang]);

  return { data, memuat, galat, muatUlang };
}
