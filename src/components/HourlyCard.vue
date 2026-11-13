<template>
  <div class="kartu-jam" :class="{ 'kartu-jam--aktif': aktif }">
    <span class="kartu-jam__hari">{{ formatHari(waktu) }}</span>
    <span class="kartu-jam__tanggal">{{ formatTanggalSingkat(waktu) }}</span>
    <span class="kartu-jam__suhu">{{ formatSuhu(suhu) }}</span>
    <span class="kartu-jam__jam">{{ formatJam(waktu) }}</span>
  </div>
</template>

<script setup lang="ts">
import { formatHari, formatJam, formatSuhu, formatTanggalSingkat } from '@/utils/format';

import './HourlyCard.css';

defineProps<{
  waktu: string;
  suhu: number;
  aktif: boolean;
}>();
</script>
