const { createApp } = Vue;

// URL dari REST API CodeIgniter 4 kamu yang sedang berjalan
const apiUrl = 'http://localhost:8080';

createApp({
    data() {
        return {
            artikel: [],
            formData: {
                id: null,
                judul: '',
                isi: '',
                status: 0
            },
            showForm: false,
            formTitle: 'Tambah Data',
            statusOptions: [
                { text: 'Draft', value: 0 },
                { text: 'Publish', value: 'Aktif' } // Sesuaikan dengan status database CI4 kamu
            ]
        }
    },
    mounted() {
        this.loadData();
    },
    methods: {
        // Mengambil semua data (GET)
        loadData() {
            axios.get(apiUrl + '/post')
                .then(response => {
                    this.artikel = response.data.artikel;
                })
                .catch(error => console.log(error));
        },
        
        // Membuka form tambah data
        tambah() {
            this.showForm = true;
            this.formTitle = 'Tambah Data';
            this.formData = {
                id: null,
                judul: '',
                isi: '',
                status: 'Aktif'
            };
        },
        
        // Menghapus data (DELETE)
        hapus(index, id) {
            if (confirm('Yakin menghapus data ini?')) {
                axios.delete(apiUrl + '/post/' + id)
                    .then(response => {
                        this.artikel.splice(index, 1);
                        alert('Data berhasil dihapus');
                    })
                    .catch(error => console.log(error));
            }
        },
        
        // Membuka form edit data
        edit(data) {
            this.showForm = true;
            this.formTitle = 'Ubah Data';
            this.formData = {
                id: data.id,
                judul: data.judul,
                isi: data.isi,
                status: data.status
            };
        },
        
        // Menyimpan data (POST untuk tambah, PUT untuk edit)
        saveData() {
            if (this.formData.id) {
                // Update (PUT)
                axios.put(apiUrl + '/post/' + this.formData.id, this.formData)
                    .then(response => {
                        this.loadData();
                        this.showForm = false;
                        alert('Data berhasil diubah');
                    })
                    .catch(error => console.log(error));
            } else {
                // Tambah (POST)
                axios.post(apiUrl + '/post', this.formData, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                })
                .then(response => {
                    this.loadData();
                    this.showForm = false;
                    alert('Data berhasil ditambahkan');
                })
                .catch(error => console.log(error));
            }
        },
        
        // Format teks status
        statusText(status) {
            if (!status) return 'Draft';
            return status === 'Aktif' || status == 1 ? 'Publish' : 'Draft';
        }
    }
}).mount('#app');