<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Prakiraan Cuaca Jakarta</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" class="beranda">
      <ion-refresher slot="fixed" @ion-refresh="tanganiMuatUlang">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>

      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Prakiraan Cuaca Jakarta</ion-title>
        </ion-toolbar>
      </ion-header>

      <div v-if="memuat" class="kotak-status">
        <ion-spinner name="crescent"></ion-spinner>
        <p>Memuat data cuaca...</p>
      </div>

      <div v-else-if="galat" class="kotak-status">
        <p>{{ galat }}</p>
        <button class="tombol-ulang" type="button" @click="muatUlang">Coba lagi</button>
      </div>

      <div v-else-if="data && cuacaSekarang" class="isi-beranda">
        <div class="kartu-utama">
          <p class="kartu-utama__label">Suhu saat ini</p>
          <p class="kartu-utama__suhu">{{ formatSuhu(cuacaSekarang.suhu) }}</p>
          <p class="kartu-utama__waktu">{{ formatTanggalJam(cuacaSekarang.waktu) }} WIB</p>
        </div>

        <div class="kisi-ringkasan">
          <div class="butir-ringkasan">
            <span class="butir-ringkasan__label">Suhu terendah</span>
            <span class="butir-ringkasan__nilai">{{ formatSuhu(suhuTerendah) }}</span>
          </div>
          <div class="butir-ringkasan">
            <span class="butir-ringkasan__label">Suhu tertinggi</span>
            <span class="butir-ringkasan__nilai">{{ formatSuhu(suhuTertinggi) }}</span>
          </div>
          <div class="butir-ringkasan">
            <span class="butir-ringkasan__label">Satuan</span>
            <span class="butir-ringkasan__nilai">{{ data.satuan }}</span>
          </div>
          <div class="butir-ringkasan">
            <span class="butir-ringkasan__label">Zona waktu</span>
            <span class="butir-ringkasan__nilai">{{ data.zonaWaktu }}</span>
          </div>
        </div>

        <section class="bagian-jam">
          <h2 class="bagian-jam__judul">Prakiraan 24 jam</h2>
          <div class="gulir-jam">
            <HourlyCard
              v-for="butir in jamTampil"
              :key="butir.waktu"
              :waktu="butir.waktu"
              :suhu="butir.suhu"
              :aktif="butir.waktu === cuacaSekarang.waktu"
            />
          </div>
        </section>

        <p class="catatan-sumber">
          Data bersumber dari Open-Meteo untuk koordinat {{ data.lintang }}, {{ data.bujur }}.
        </p>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonContent,
  IonHeader,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from '@ionic/vue';
import { computed, onMounted } from 'vue';

import HourlyCard from '@/components/HourlyCard.vue';
import { useCuaca } from '@/composables/useWeather';
import { ambilKunciJamSekarang, formatSuhu, formatTanggalJam } from '@/utils/format';

import './RingkasanPage.css';

const JUMLAH_JAM_TAMPIL = 24;

interface PeristiwaMuatUlang extends CustomEvent {
  detail: { complete: () => void };
}

const { data, memuat, galat, muatUlang } = useCuaca();

const jamTampil = computed(() => {
  if (!data.value) {
    return [];
  }

  const kunciSekarang = ambilKunciJamSekarang(data.value.zonaWaktu);
  const posisi = data.value.prakiraan.findIndex(
    (butir) => butir.waktu.slice(0, kunciSekarang.length) === kunciSekarang,
  );
  const mulai = posisi > 0 ? posisi : 0;

  return data.value.prakiraan.slice(mulai, mulai + JUMLAH_JAM_TAMPIL);
});

const suhuTerendah = computed(() =>
  jamTampil.value.length > 0 ? Math.min(...jamTampil.value.map((butir) => butir.suhu)) : 0,
);

const suhuTertinggi = computed(() =>
  jamTampil.value.length > 0 ? Math.max(...jamTampil.value.map((butir) => butir.suhu)) : 0,
);

const cuacaSekarang = computed(() => (jamTampil.value.length > 0 ? jamTampil.value[0] : null));

async function tanganiMuatUlang(peristiwa: PeristiwaMuatUlang) {
  await muatUlang();
  peristiwa.detail.complete();
}

onMounted(() => {
  void muatUlang();
});
</script>
