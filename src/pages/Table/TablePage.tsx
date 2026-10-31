import {
  IonContent,
  IonHeader,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import type { Options } from 'datatables.net';
import DataTabelCore from 'datatables.net-dt';
import DataTabel from 'datatables.net-react';
import { useMemo } from 'react';
import { useCuaca } from '../../hooks/useWeather';
import { formatHari, formatJam, formatTanggalSingkat } from '../../utils/format';
import 'datatables.net-dt/css/dataTables.dataTables.min.css';
import './TablePage.css';

DataTabel.use(DataTabelCore);

interface BarisTabel {
  nomor: number;
  hari: string;
  tanggal: string;
  jam: string;
  suhu: string;
}

const kolomTabel: Options['columns'] = [
  { data: 'nomor', title: 'No', className: 'kolom-nomor' },
  { data: 'hari', title: 'Hari' },
  { data: 'tanggal', title: 'Tanggal' },
  { data: 'jam', title: 'time (WIB)' },
  { data: 'suhu', title: 'Suhu (°C)', className: 'kolom-suhu' },
];

const opsiTabel: Options = {
  paging: true,
  pageLength: 10,
  lengthMenu: [10, 25, 50, 100],
  searching: true,
  info: true,
  order: [],
  language: {
    search: 'Cari:',
    searchPlaceholder: 'Cari data cuaca...',
    lengthMenu: 'Tampilkan _MENU_ data',
    info: 'Menampilkan _START_ sampai _END_ dari _TOTAL_ data',
    infoEmpty: 'Tidak ada data',
    infoFiltered: '(disaring dari _MAX_ total data)',
    zeroRecords: 'Data tidak ditemukan',
    emptyTable: 'Data cuaca belum tersedia',
    paginate: {
      first: 'Awal',
      last: 'Akhir',
      next: 'Berikutnya',
      previous: 'Sebelumnya',
    },
  },
};

const TablePage: React.FC = () => {
  const { data, memuat, galat, muatUlang } = useCuaca();

  const barisTabel = useMemo<BarisTabel[]>(() => {
    if (!data) {
      return [];
    }

    return data.prakiraan.map((baris, indeks) => ({
      nomor: indeks + 1,
      hari: formatHari(baris.waktu),
      tanggal: formatTanggalSingkat(baris.waktu),
      jam: formatJam(baris.waktu),
      suhu: baris.suhu.toFixed(1),
    }));
  }, [data]);

  const tanganiMuatUlang = async (peristiwa: CustomEvent<{ complete: () => void }>) => {
    await muatUlang();
    peristiwa.detail.complete();
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Tabel Prakiraan</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="tabel-cuaca">
        <IonRefresher slot="fixed" onIonRefresh={tanganiMuatUlang}>
          <IonRefresherContent
            pullingText="Tarik untuk memperbarui"
            refreshingSpinner="circles"
            refreshingText="Memuat data cuaca..."
          />
        </IonRefresher>

        {memuat && !data && (
          <div className="kotak-status">
            <IonSpinner name="crescent" />
            <p>Menyiapkan tabel data...</p>
          </div>
        )}

        {galat && (
          <div className="kotak-status kotak-status--galat">
            <h3>Data gagal dimuat</h3>
            <p>{galat}</p>
            <button type="button" className="tombol-ulang" onClick={() => void muatUlang()}>
              Coba lagi
            </button>
          </div>
        )}

        {data && (
          <>
            <header className="kepala-tabel">
              <div>
                <h2>Prakiraan Cuaca Jakarta</h2>
                <p>{barisTabel.length} baris data per jam</p>
              </div>
              <span className="kepala-tabel__satuan">Satuan {data.satuan}</span>
            </header>

            <div className="pembungkus-tabel">
              <DataTabel
                data={barisTabel}
                columns={kolomTabel}
                options={opsiTabel}
                className="display tabel-data"
              />
            </div>
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default TablePage;
