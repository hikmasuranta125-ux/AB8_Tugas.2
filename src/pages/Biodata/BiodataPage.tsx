import { IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import {
  businessOutline,
  cardOutline,
  libraryOutline,
  personOutline,
  schoolOutline,
} from 'ionicons/icons';
import './BiodataPage.css';

interface ButirBiodata {
  label: string;
  nilai: string;
  ikon: string;
}

const daftarBiodata: ButirBiodata[] = [
  { label: 'Nama', nilai: 'HIKMA SURANTA PUJA KARINA', ikon: personOutline },
  { label: 'NIM', nilai: '053764084', ikon: cardOutline },
  { label: 'Program Studi', nilai: 'Sistem Informasi', ikon: libraryOutline },
  { label: 'Fakultas', nilai: 'Sains dan Teknologi', ikon: businessOutline },
  { label: 'Universitas', nilai: 'Universitas Terbuka', ikon: schoolOutline },
];

const BiodataPage: React.FC = () => (
  <IonPage>
    <IonHeader>
      <IonToolbar color="primary">
        <IonTitle>Biodata</IonTitle>
      </IonToolbar>
    </IonHeader>

    <IonContent fullscreen className="biodata">
      <section className="kartu-biodata">
        <div className="kartu-biodata__avatar">HP</div>
        <h2 className="kartu-biodata__nama">HIKMA SURANTA PUJA KARINA</h2>
        <p className="kartu-biodata__nim">NIM 053764084</p>
        <span className="kartu-biodata__peran">Pengembang Aplikasi</span>
      </section>

      <section className="daftar-biodata">
        {daftarBiodata.map((butir) => (
          <div className="butir-biodata" key={butir.label}>
            <span className="butir-biodata__ikon">
              <IonIcon icon={butir.ikon} />
            </span>
            <span className="butir-biodata__teks">
              <small className="butir-biodata__label">{butir.label}</small>
              <strong className="butir-biodata__nilai">{butir.nilai}</strong>
            </span>
          </div>
        ))}
      </section>
    </IonContent>
  </IonPage>
);

export default BiodataPage;
