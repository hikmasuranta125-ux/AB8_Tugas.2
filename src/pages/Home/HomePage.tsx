import {
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import {
  arrowDownOutline,
  arrowUpOutline,
  compassOutline,
  locationOutline,
  timeOutline,
} from 'ionicons/icons';
import { useMemo } from 'react';
import HourlyCard from '../../components/HourlyCard/HourlyCard';
import { useCuaca } from '../../hooks/useWeather';
import { ambilKunciJamSekarang, formatSuhu, formatTanggalJam } from '../../utils/format';
import './HomePage.css';

const HomePage: React.FC = () => {
  const { data, memuat, galat, muatUlang } = useCuaca();

  const indeksJamSekarang = useMemo(() => {
    if (!data) {
      return 0;
    }
    const kunciJam = ambilKunciJamSekarang(data.zonaWaktu);
    const indeks = data.prakiraan.findIndex((baris) => baris.waktu.startsWith(kunciJam));
    return indeks >= 0 ? indeks : 0;
  }, [data]);

  const cuacaSekarang = data?.prakiraan[indeksJamSekarang];

  const jamBerikutnya = useMemo(
    () => (data ? data.prakiraan.slice(indeksJamSekarang, indeksJamSekarang + 24) : []),
    [data, indeksJamSekarang],
  );

  const { suhuTerendah, suhuTertinggi } = useMemo(() => {
    const daftarSuhu = jamBerikutnya.map((baris) => baris.suhu);
    if (daftarSuhu.length === 0) {
      return { suhuTerendah: 0, suhuTertinggi: 0 };
    }
    return {
      suhuTerendah: Math.min(...daftarSuhu),
      suhuTertinggi: Math.max(...daftarSuhu),
    };
  }, [jamBerikutnya]);

  const tanganiMuatUlang = async (peristiwa: CustomEvent<{ complete: () => void }>) => {
    await muatUlang();
    peristiwa.detail.complete();
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Cuaca Jakarta</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="beranda">
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
            <p>Mengambil data dari Open-Meteo API...</p>
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

        {data && cuacaSekarang && (
          <>
            <section className="kartu-utama">
              <span className="kartu-utama__lokasi">
                <IonIcon icon={locationOutline} />
                Jakarta, Indonesia
              </span>
              <strong className="kartu-utama__suhu">{formatSuhu(cuacaSekarang.suhu)}C</strong>
              <span className="kartu-utama__label">Suhu saat ini</span>
              <span className="kartu-utama__waktu">
                <IonIcon icon={timeOutline} />
                {formatTanggalJam(cuacaSekarang.waktu)}
              </span>
            </section>

            <section className="kisi-ringkasan">
              <div className="butir-ringkasan">
                <IonIcon icon={arrowDownOutline} className="butir-ringkasan__ikon butir-ringkasan__ikon--rendah" />
                <span className="butir-ringkasan__label">Terendah 24 jam</span>
                <strong className="butir-ringkasan__nilai">{formatSuhu(suhuTerendah)}C</strong>
              </div>
              <div className="butir-ringkasan">
                <IonIcon icon={arrowUpOutline} className="butir-ringkasan__ikon butir-ringkasan__ikon--tinggi" />
                <span className="butir-ringkasan__label">Tertinggi 24 jam</span>
                <strong className="butir-ringkasan__nilai">{formatSuhu(suhuTertinggi)}C</strong>
              </div>
              <div className="butir-ringkasan">
                <IonIcon icon={compassOutline} className="butir-ringkasan__ikon" />
                <span className="butir-ringkasan__label">Koordinat</span>
                <strong className="butir-ringkasan__nilai butir-ringkasan__nilai--kecil">
                  {data.lintang}, {data.bujur}
                </strong>
              </div>
            </section>

            <section className="bagian-jam">
              <header className="kepala-bagian">
                <h2>Prakiraan 24 Jam ke Depan</h2>
                <span className="kepala-bagian__satuan">{data.satuan}</span>
              </header>
              <div className="gulir-jam">
                {jamBerikutnya.map((baris) => (
                  <HourlyCard
                    key={baris.waktu}
                    waktu={baris.waktu}
                    suhu={baris.suhu}
                    aktif={baris.waktu === cuacaSekarang.waktu}
                  />
                ))}
              </div>
            </section>

            <p className="catatan-sumber">
              Sumber: api.open-meteo.com · Zona waktu {data.zonaWaktu} · Elevasi {data.elevasi} m ·
              Total {data.prakiraan.length} baris data per jam.
            </p>
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
