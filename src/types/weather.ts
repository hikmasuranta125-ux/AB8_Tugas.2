export interface CuacaPerJam {
  waktu: string;
  suhu: number;
}

export interface DataCuaca {
  lintang: number;
  bujur: number;
  elevasi: number;
  zonaWaktu: string;
  satuan: string;
  prakiraan: CuacaPerJam[];
}
