<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Biodata</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" class="halaman-biodata">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Biodata</ion-title>
        </ion-toolbar>
      </ion-header>

      <div class="biodata">
        <div class="kartu-biodata">
          <div class="kartu-biodata__avatar">HP</div>
          <h2 class="kartu-biodata__nama">HIKMA SURANTA PUJA KARINA</h2>
          <p class="kartu-biodata__nim">NIM 053764084</p>
          <p class="kartu-biodata__peran">Pengembang Aplikasi</p>
        </div>

        <div class="daftar-biodata">
          <div v-for="butir in daftarBiodata" :key="butir.label" class="butir-biodata">
            <ion-icon class="butir-biodata__ikon" aria-hidden="true" :icon="butir.ikon"></ion-icon>
            <div class="butir-biodata__isi">
              <span class="butir-biodata__label">{{ butir.label }}</span>
              <span class="butir-biodata__nilai">{{ butir.nilai }}</span>
            </div>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/vue';
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
</script>
