# PRD — Aplikasi Prakiraan Cuaca Jakarta

## 1. Ringkasan

Membangun aplikasi prakiraan cuaca untuk wilayah Jakarta yang menampilkan data temperatur per jam dari API publik Open-Meteo. Aplikasi fokus pada penyajian data cuaca dan harus menyediakan tampilan tabulasi selain tampilan ringkasan.

## 2. Sumber Data

- Endpoint: `https://api.open-meteo.com/v1/forecast`
- Parameter: `latitude=-6.2`, `longitude=106.8`, `hourly=temperature_2m`
- Parameter tambahan: `timezone=Asia/Jakarta` agar waktu yang ditampilkan sesuai waktu lokal WIB.

## 3. Kebutuhan Pengguna

1. API menampilkan prakiraan cuaca Jakarta, termasuk temperatur per jam.
2. Sistem fokus menampilkan data cuaca.
3. Wajib menampilkan field:
   - `time` — waktu pengukuran
   - `temperature_2m` — suhu per jam dalam derajat Celsius (°C)
4. Data yang sama harus tersedia juga dalam bentuk **tabulasi**.
5. UI/UX modern dan sederhana, warna konsisten, serta mobile friendly.

## 4. Tampilan

- Navigasi tab: **Ringkasan**, **Tabel**, **Biodata**.
- Ringkasan: suhu saat ini, suhu terendah/tertinggi, satuan, zona waktu, dan kartu prakiraan 24 jam.
- Tabel: seluruh data prakiraan per jam dengan paginasi, pencarian, dan label berbahasa Indonesia.
- Biodata: informasi pembuat aplikasi.

## 5. Teknologi

- Ionic Framework (Vue) yang dibuat melalui **Ionic CLI**
- TypeScript
- Vite
- DataTables (`datatables.net`, `datatables.net-dt`) untuk tabel
- Node.js versi 24.22.1

## 6. Ketentuan Teknis

- Struktur proyek multi direktori dengan berkas CSS terpisah per komponen/halaman.
- Menggunakan routing dan navigasi.
- Nama variabel, fungsi, tipe data, dan kelas CSS menggunakan bahasa Indonesia.
- Tidak menyertakan komentar di dalam kode program.
