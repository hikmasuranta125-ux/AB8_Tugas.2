<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Prakiraan Cuaca Jakarta</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" class="halaman-tabel">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Prakiraan Cuaca Jakarta</ion-title>
        </ion-toolbar>
      </ion-header>

      <div class="isi-tabel">
        <div class="kepala-tabel">
          <h2 class="kepala-tabel__judul">Tabel Prakiraan Cuaca</h2>
          <p v-if="data" class="kepala-tabel__satuan">Satuan {{ data.satuan }}</p>
        </div>

        <div v-if="memuat" class="kotak-status">
          <ion-spinner name="crescent"></ion-spinner>
          <p>Memuat data cuaca...</p>
        </div>

        <div v-else-if="galat" class="kotak-status">
          <p>{{ galat }}</p>
          <button class="tombol-ulang" type="button" @click="muatUlang">Coba lagi</button>
        </div>

        <div v-else class="pembungkus-tabel">
          <table ref="tabelEl" class="display tabel-data">
            <thead>
              <tr>
                <th>No</th>
                <th>Hari</th>
                <th>Tanggal</th>
                <th>time (WIB)</th>
                <th>Suhu (°C)</th>
              </tr>
            </thead>
          </table>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonContent,
  IonHeader,
  IonPage,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from '@ionic/vue';
import type { Api, Options } from 'datatables.net';
import DataTabel from 'datatables.net-dt';
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';

import { useCuaca } from '@/composables/useWeather';
import { formatHari, formatJam, formatTanggalSingkat } from '@/utils/format';

import 'datatables.net-dt/css/dataTables.dataTables.min.css';
import './TabelPage.css';

interface BarisTabel {
  nomor: number;
  hari: string;
  tanggal: string;
  jam: string;
  suhu: string;
}

const kolomTabel: Options['columns'] = [
  { data: 'nomor', className: 'kolom-nomor' },
  { data: 'hari' },
  { data: 'tanggal' },
  { data: 'jam' },
  { data: 'suhu', className: 'kolom-suhu' },
];

const opsiTabel: Options = {
  paging: true,
  pageLength: 10,
  lengthMenu: [10, 25, 50, 100],
  searching: true,
  info: true,
  order: [],
  columns: kolomTabel,
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

const { data, memuat, galat, muatUlang } = useCuaca();

const tabelEl = ref<HTMLTableElement | null>(null);
let tabelData: Api | null = null;

const barisTabel = computed<BarisTabel[]>(() => {
  if (!data.value) {
    return [];
  }

  return data.value.prakiraan.map((butir, indeks) => ({
    nomor: indeks + 1,
    hari: formatHari(butir.waktu),
    tanggal: formatTanggalSingkat(butir.waktu),
    jam: formatJam(butir.waktu),
    suhu: butir.suhu.toFixed(1),
  }));
});

async function bangunTabel() {
  await nextTick();

  if (!tabelEl.value) {
    return;
  }

  if (tabelData) {
    tabelData.destroy();
    tabelData = null;
  }

  tabelData = new DataTabel(tabelEl.value, { ...opsiTabel, data: barisTabel.value });
}

watch([memuat, tabelEl, barisTabel], () => {
  if (!memuat.value && !galat.value && barisTabel.value.length > 0) {
    void bangunTabel();
  }
});

onMounted(() => {
  void muatUlang();
});

onBeforeUnmount(() => {
  tabelData?.destroy();
  tabelData = null;
});
</script>
