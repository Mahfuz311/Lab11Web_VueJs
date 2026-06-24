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

# Laporan Praktikum 12: VueJS Komponen dan Routing (Single Page Application)

## Tujuan Praktikum
1. Memahami konsep komponen pada Framework VueJS untuk memecah antarmuka menjadi bagian-bagian modular.
2. Memahami konsep *Client-Side Routing* untuk membangun *Single Page Application* (SPA).
3. Mengimplementasikan komponen dan *routing* menggunakan Vue Router berbasis CDN pada aplikasi Frontend API.

---

## 🧩 Langkah-Langkah Praktikum

### 1. Persiapan Vue Router dan Struktur Direktori
- Membuka file `index.html` dan menambahkan pustaka **Vue Router** melalui CDN tepat di bawah pustaka VueJS.
- Membuat folder baru `assets/js/components/` untuk menyimpan file-file komponen agar kode lebih terstruktur dan modular.

### 2. Membuat Komponen Halaman
Memecah antarmuka menjadi tiga komponen utama yang berdiri sendiri:
- **`Home.js`**: Berisi *template* untuk halaman Beranda/Selamat Datang.
- **`Artikel.js`**: Memindahkan seluruh logika CRUD (Create, Read, Update, Delete) artikel dan tabel antarmuka dari praktikum sebelumnya ke dalam satu komponen terisolasi.
- **`About.js`**: Membuat komponen baru yang berisi profil singkat mahasiswa (Nama, NIM, Kelas, Program Studi, Kampus) beserta **Foto Profil/Avatar** untuk memenuhi tugas praktikum.

### 3. Mengonfigurasi Router pada `app.js`
Memodifikasi file `app.js` utama untuk mengatur *routing*:
- Mendefinisikan pemetaan (*mapping*) rute URL ke masing-masing komponen (`/` ke Home, `/artikel` ke Artikel, `/about` ke About).
- Membuat *instance router* menggunakan `createRouter` dan `createWebHashHistory()`.
- Menginisialisasi aplikasi Vue dan menyambungkannya dengan *router* (`app.use(router)`).

### 4. Memodifikasi Master Layout (`index.html`)
- Memperbarui menu navigasi dengan menggunakan elemen `<router-link to="...">` agar perpindahan halaman ditangani oleh Vue Router, bukan oleh browser konvensional.
- Menyediakan tag `<router-view></router-view>` sebagai area penampung dinamis tempat komponen akan di-*render* secara bergantian berdasarkan URL yang aktif.

### 5. Hasil Pengujian (Testing SPA)
Aplikasi kini berjalan penuh sebagai SPA. Saat menu navigasi diklik, halaman berpindah secara instan tanpa ada proses *hard-reload* atau *refresh* pada browser.

<img src="https://github.com/Mahfuz311/Lab11Web_VueJs/blob/7df9a8b091a3ae4f84efc9de14d3638e9ba25faf/ss/praktikum12.1.png">
<img src="https://github.com/Mahfuz311/Lab11Web_VueJs/blob/7df9a8b091a3ae4f84efc9de14d3638e9ba25faf/ss/praktikum12.2.png">
<img src="https://github.com/Mahfuz311/Lab11Web_VueJs/blob/7df9a8b091a3ae4f84efc9de14d3638e9ba25faf/ss/praktikum12.3.png">

---

# Laporan Praktikum 13: VueJS Autentikasi dan Navigation Guards (SPA Security)

## Tujuan Praktikum
1. Memahami konsep keamanan dan pembatasan hak akses rute pada sisi klien (*Client-Side Security*).
2. Memahami konsep *Navigation Guards* (`beforeEach`) pada Vue Router.
3. Membuat API Endpoint autentikasi pada backend CodeIgniter 4.
4. Mengimplementasikan modul Login dan proteksi halaman admin pada aplikasi Single Page Application (SPA) Frontend API.

---

## 🧩 Langkah-Langkah Praktikum

### 1. Pembuatan API Endpoint Login (Sisi Backend CI4)
- Membuat *controller* baru bernama `Auth.php` di dalam direktori `app/Controllers/Api/`.
- Membangun fungsi `login()` yang bertugas menerima input *username* dan *password* dari *request body* JSON, lalu memvalidasinya dengan data di tabel `user` database.
- Mengonfigurasi respons API. Jika berhasil, API mengembalikan status 200 beserta token *base64_encode*. Jika gagal, mengembalikan status 401 (*Unauthorized*).
- Mendaftarkan rute API khusus pada `app/Config/Routes.php` dengan metode POST (`$routes->post('api/login', 'Api\Auth::login');`).

### 2. Pengembangan Integrasi Frontend (Sisi VueJS SPA)
- **Komponen Login (`Login.js`):** Membuat antarmuka form login yang menangkap input pengguna dan mengirimkannya ke API Backend menggunakan Axios POST. Jika respons sukses, status `isLoggedIn` dan `userToken` disimpan ke dalam `localStorage` browser.
- **Konfigurasi Proteksi Rute (`app.js`):** - Menambahkan properti `meta: { requiresAuth: true }` pada rute `/artikel` dan `/about` agar terkunci.
  - Mengimplementasikan **Navigation Guards** menggunakan `router.beforeEach`. Fungsi ini bertindak sebagai "satpam" yang mencegat pengguna jika mencoba mengakses rute terkunci tanpa memiliki status login yang valid di `localStorage`, lalu mengarahkannya paksa ke halaman `/login`.
- **Modifikasi Tata Letak (`index.html`):** Menerapkan direktif `v-if` dan `v-else` pada menu navigasi untuk merubah tombol "Login" menjadi "Logout" secara dinamis berdasarkan status autentikasi pengguna.
- **Desain Antarmuka (`style.css`):** Menambahkan CSS khusus agar kotak form login tampil rapi dan presisi di tengah layar.

### 3. Hasil Pengujian Skenario Keamanan
- **Skenario A (Akses Ditolak):** Saat mencoba menekan menu "Kelola Artikel" atau "About Me" dalam keadaan belum login, sistem langsung memunculkan *alert* peringatan dan membelokkan (*redirect*) paksa halaman ke form Login.
- **Skenario B (Akses Diterima):** Saat memasukkan kredensial yang valid, Axios berhasil melakukan HTTP POST ke backend CI4, dan pengguna langsung diarahkan ke halaman tabel manajemen artikel dengan menu yang berubah menjadi "Logout".

<img src="https://github.com/Mahfuz311/Lab11Web_VueJs/blob/9c1085912276fd42c98f2982a07592fc5f487e72/ss/praktikum13.1.png">
<img src="https://github.com/Mahfuz311/Lab11Web_VueJs/blob/9c1085912276fd42c98f2982a07592fc5f487e72/ss/praktikum13.2.png">
<img src="https://github.com/Mahfuz311/Lab11Web_VueJs/blob/9c1085912276fd42c98f2982a07592fc5f487e72/ss/praktikum13.3.png">


### Analisis Alur Kerja Fungsional Keamanan SPA

**1. Alur Kerja `router.beforeEach` (Navigation Guards)**
Dalam arsitektur SPA VueJS, `router.beforeEach` bertindak sebagai *interceptor* (pencegat) atau "satpam" di sisi klien yang akan tereksekusi sebelum browser merender halaman yang dituju. 
- Saat pengguna mencoba mengakses rute internal (misalnya `/artikel` atau `/about`), fungsi ini pertama-tama akan mengecek apakah rute tersebut dilindungi oleh properti `meta: { requiresAuth: true }`.
- Jika rute tersebut dilindungi, sistem akan memeriksa keberadaan status `isLoggedIn` di dalam `localStorage` browser.
- Jika status valid (pengguna sudah *login*), sistem akan memanggil fungsi `next()` untuk mengizinkan pengguna masuk ke halaman yang dituju.
- Sebaliknya, jika pengguna belum *login*, perpindahan halaman akan dibatalkan, memunculkan *alert* peringatan akses ditolak, dan mengalihkan pengguna secara paksa (`next('/login')`) ke halaman form login.

**2. Alur Kerja Axios HTTP Post pada Form Login**
Axios digunakan sebagai perantara komunikasi asinkron antara antarmuka VueJS dan API backend CodeIgniter 4.
- Saat pengguna menekan tombol login, fungsi `handleLogin()` akan mengambil data dari *input* formulir (*username* dan *password*).
- Axios kemudian mengirimkan data tersebut menggunakan metode `POST` ke *endpoint* autentikasi CI4 (`http://localhost:8080/api/login`).
- Backend CodeIgniter akan memvalidasi data tersebut ke dalam database. Jika kredensial sesuai, backend merespons dengan status `200` beserta data token.
- Axios di sisi frontend akan menangkap respons sukses ini (`.then(response => ...)`), lalu menyimpan status `isLoggedIn` dan `userToken` ke dalam `localStorage` browser.
- Setelah data sesi berhasil disimpan, Vue Router secara programatis mengarahkan (`push`) pengguna menuju halaman tabel artikel.

---

# Laporan Praktikum 14: Keamanan API, Autentikasi Token, dan Axios Interceptors

## Tujuan Praktikum
1. Memahami konsep keamanan RESTful API menggunakan *Token-Based Authentication*.
2. Mengimplementasikan *Filters* pada CodeIgniter 4 untuk mengamankan *endpoint* API.
3. Mengimplementasikan Axios Interceptors pada aplikasi Frontend VueJS.
4. Melakukan pengujian transmisi data aman secara *end-to-end*.

---

## 🧩 Langkah-Langkah Praktikum

### 1. Mengamankan Endpoint API (Sisi Backend CI4)
- Membuat `ApiAuthFilter.php` di dalam `app/Filters/` untuk mencegat setiap *request* yang masuk. Filter ini bertugas mengecek keberadaan dan validitas token pada HTTP Header `Authorization`. Jika token tidak ada atau tidak valid, server langsung menolak dengan status HTTP 401 (Unauthorized).
- Mendaftarkan alias filter `apiauth` pada `app/Config/Filters.php`.
- Menerapkan filter tersebut pada `app/Config/Routes.php` khusus untuk rute yang memanipulasi data sensitif (POST, PUT, DELETE pada *resource* post).

### 2. Implementasi Axios Interceptors (Sisi VueJS Frontend)
- Mengonfigurasi `axios.interceptors.request.use` pada file `app.js`. Fitur ini berfungsi sebagai kurir otomatis yang mengambil token dari `localStorage` dan menyuntikkannya ke dalam *header* `Authorization: Bearer <token>` pada setiap *request* yang mengarah ke server.
- Mengonfigurasi `axios.interceptors.response.use` untuk menangkap respons *error* secara global. Jika server mengembalikan status 401, sistem akan memberikan *alert*, menghapus sesi, dan memaksa pengguna kembali ke halaman Login.

### 3. Hasil Pengujian dan Bukti Keamanan
**Bukti 1: Simulasi Akses Ilegal via Postman**
Saat mencoba melakukan POST data secara langsung ke *endpoint* API tanpa menyertakan Token, CodeIgniter 4 berhasil memblokir akses tersebut dan merespons dengan pesan *error* 401 Unauthorized.
<img src="https://github.com/Mahfuz311/Lab11Web_VueJs/blob/8001c4e241f9f16156949d302153ddf3399a3dfe/ss/praktikum14.1.png">

**Bukti 2: Pengujian Transmisi Data Aman di Browser**
Setelah melakukan login, seluruh proses manipulasi data (Tambah/Ubah/Hapus) berhasil dilakukan berkat Axios Interceptor. Pada inspeksi *Developer Tools (Network Tab)*, terlihat jelas bahwa *header* `Authorization` telah disematkan secara otomatis di latar belakang.
<img src="https://github.com/Mahfuz311/Lab11Web_VueJs/blob/8001c4e241f9f16156949d302153ddf3399a3dfe/ss/praktikum14.2.png">

---

## Kesimpulan Analisis Keamanan (Vue Router vs CI4 Filters)
Terdapat perbedaan mendasar dalam fungsi perlindungan keamanan antara Vue Router (Client-side) dan CodeIgniter Filters (Server-side):
- **Vue Router Navigation Guards (`beforeEach`):** Hanya berfungsi sebagai "Gembok Visual/Antarmuka". Ia melindungi antarmuka aplikasi dengan mencegah pengguna yang belum login melihat komponen halaman tertentu di browser. Namun, ini **tidak melindungi data di database**.
- **CodeIgniter 4 Filters (`ApiAuthFilter`):** Berfungsi sebagai "Gembok Sistem/Infrastruktur". Ini adalah keamanan sejati yang melindungi *database* dan logika *backend*. Walaupun penyerang tidak menggunakan antarmuka VueJS (misalnya menggunakan Postman atau terminal), mereka tetap tidak bisa memanipulasi data tanpa memiliki Token Kriptografi yang valid. Kedua sistem ini wajib diimplementasikan secara bersamaan untuk menciptakan *Full-Stack Security* yang sempurna.

---
**Selesai! Repository by:** Mahfuz Fauzi | **Mata Kuliah:** Pemrograman Web 2

**Repository by:** Mahfuz Fauzi
**Mata Kuliah:** Pemrograman Web 2
