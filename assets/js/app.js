const { createApp } = Vue;
const { createRouter, createWebHashHistory } = VueRouter;

const apiUrl = 'http://localhost:8080';

// =========================================================
// IMPLEMENTASI AXIOS INTERCEPTORS (Penyuntik Token Otomatis)
// =========================================================

// 1. Menyuntikkan token otomatis ke setiap request
axios.interceptors.request.use(
    (config) => {
        // Ambil token dari local storage browser
        const token = localStorage.getItem('userToken');
        // Jika token tersedia, masukkan ke dalam HTTP Header Authorization Bearer
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 2. Tangkap secara global jika server merespon dengan error 401 (Unauthorized)
axios.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            alert('Sesi Anda telah berakhir atau Token tidak sah. Silakan login kembali.');
            localStorage.clear(); // Bersihkan local storage
            window.location.href = '#/login'; // Tendang paksa ke halaman login
            window.location.reload();
        }
        return Promise.reject(error);
    }
);
// =========================================================

// 1. Definisikan mapping rute & Meta-Auth
const routes = [
    { path: '/', component: Home },
    { path: '/login', component: Login },
    { 
        path: '/artikel', 
        component: Artikel,
        meta: { requiresAuth: true } // Terkunci
    },
    { 
        path: '/about', 
        component: About,
        meta: { requiresAuth: true } // Terkunci (Sesuai tugas)
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

// 2. Navigation Guards (Satpam Pencegat Akses)
router.beforeEach((to, from, next) => {
    const isAuthenticated = localStorage.getItem('isLoggedIn') === 'true';
    
    // Jika rute butuh login TAPI user belum login
    if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
        alert('Akses Ditolak! Anda harus login terlebih dahulu.');
        next('/login'); // Lempar ke form login
    } else {
        next(); // Izinkan masuk
    }
});

// 3. Inisialisasi Aplikasi Vue
const app = createApp({
    data() {
        return {
            isLoggedIn: false
        }
    },
    mounted() {
        // Cek status login saat aplikasi pertama dimuat
        this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    },
    methods: {
        logout() {
            if (confirm('Apakah Anda yakin ingin keluar aplikasi?')) {
                localStorage.clear(); // Gunakan clear agar token juga terhapus bersih
                this.isLoggedIn = false;
                this.$router.push('/');
            }
        }
    }
});

app.use(router);
app.mount('#app');