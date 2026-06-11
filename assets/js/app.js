const { createApp } = Vue;
const { createRouter, createWebHashHistory } = VueRouter;

// Definisikan Rute URL ke Komponen
const routes = [
    { path: '/', component: Home },
    { path: '/artikel', component: Artikel },
    { path: '/about', component: About }
];

// Buat instance router
const router = createRouter({
    history: createWebHashHistory(),
    routes
});

// Inisialisasi Aplikasi Vue dan gunakan Router
const app = createApp({});
app.use(router);
app.mount('#app');