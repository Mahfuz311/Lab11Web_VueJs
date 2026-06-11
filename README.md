# Lab11Web_VueJs

# Laporan Praktikum 11: Frontend VueJS dan REST API CodeIgniter 4

## Tujuan Praktikum
1. Memahami konsep dasar Framework VueJS.
2. Mampu membuat Frontend API menggunakan Framework VueJS 3.
3. Mampu mengintegrasikan antarmuka VueJS (Frontend) dengan REST API CodeIgniter 4 (Backend) menggunakan Axios.

---

## 🧩 Langkah-Langkah Praktikum

### 1. Persiapan Folder dan File
Membuat direktori baru `lab11_vuejs` di dalam folder `htdocs` XAMPP dengan struktur file:
- `index.html` (Struktur antarmuka utama)
- `assets/css/style.css` (Gaya tampilan visual)
- `assets/js/app.js` (Logika aplikasi menggunakan VueJS)

Pada praktikum ini, *library* VueJS dan Axios dimuat secara manual menggunakan CDN (Content Delivery Network).

### 2. Membuat Antarmuka Utama (`index.html` & `style.css`)
- Membangun struktur HTML dasar yang mencakup tabel untuk menampilkan daftar artikel.
- Menambahkan tombol "Tambah Data" dan sebuah *Pop-up Modal Form* tersembunyi (`v-if="showForm"`) yang akan digunakan untuk proses pengisian data baru maupun perubahan data (Edit).
- Menerapkan desain tata letak (*layouting*) menggunakan CSS agar antarmuka terlihat modern, rapi, dan responsif.

<img src="https://github.com/Mahfuz311/Lab11Web_VueJs/blob/579588349420f602d4b1fdd924b561ec6ea94ed1/ss/praktikum11.1.png">

### 3. Membangun Logika VueJS (`app.js`)
- Menginisialisasi aplikasi Vue dan mendefinisikan *endpoint* API CodeIgniter 4 (`http://localhost:8080/post`).
- Menggunakan pustaka **Axios** untuk melakukan *request* HTTP (*call API REST*):
  - `axios.get` untuk memuat seluruh data.
  - `axios.post` untuk menyimpan data baru.
  - `axios.put` untuk memperbarui data yang sudah ada.
  - `axios.delete` untuk menghapus data.
- Mengimplementasikan reaktivitas data Vue (seperti `v-model` pada form dan `v-for` pada tabel) sehingga perubahan data langsung terlihat tanpa perlu memuat ulang (*reload*) seluruh halaman browser.

<img src="https://github.com/Mahfuz311/Lab11Web_VueJs/blob/579588349420f602d4b1fdd924b561ec6ea94ed1/ss/praktikum11.2.png"> <img src="https://github.com/Mahfuz311/Lab11Web_VueJs/blob/579588349420f602d4b1fdd924b561ec6ea94ed1/ss/praktikum11.3.png"> <img src="https://github.com/Mahfuz311/Lab11Web_VueJs/blob/579588349420f602d4b1fdd924b561ec6ea94ed1/ss/praktikum11.4.png">

### 4. Mengatasi Masalah CORS (Cross-Origin Resource Sharing)
Saat Frontend (localhost) mencoba mengambil data dari Backend (localhost:8080), browser akan memblokir permintaan tersebut karena kebijakan keamanan CORS. Solusi yang diterapkan adalah dengan membuka gerbang akses dari sisi Backend:
- Membuka file `app/Controllers/Post.php` pada *project* CodeIgniter.
- Menambahkan fungsi `__construct()` yang berisi *header* `Access-Control-Allow-Origin: *` beserta metode dan *header* lain yang diizinkan.

---
**Repository by:** Mahfuz Fauzi
**Mata Kuliah:** Pemrograman Web 2
