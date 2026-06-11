const Artikel = {
    template: `
        <div>
            <h2>Manajemen Data Artikel</h2>
            <button id="btn-tambah" @click="tambah">Tambah Data</button>

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Judul</th>
                        <th>Status</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(row, index) in artikel" :key="row.id">
                        <td class="center-text">{{ row.id }}</td>
                        <td>{{ row.judul }}</td>
                        <td>{{ statusText(row.status) }}</td>
                        <td class="center-text">
                            <a href="#" @click.prevent="edit(row)">Edit</a> |
                            <a href="#" @click.prevent="hapus(index, row.id)">Hapus</a>
                        </td>
                    </tr>
                </tbody>
            </table>

            <div class="modal" v-if="showForm">
                <div class="modal-content">
                    <span class="close" @click="showForm = false">&times;</span>
                    <form id="form-data" @submit.prevent="saveData">
                        <h3 id="form-title">{{ formTitle }}</h3>
                        <div>
                            <input type="text" v-model="formData.judul" placeholder="Judul Artikel" required> 
                        </div>
                        <div>
                            <textarea rows="6" v-model="formData.isi" placeholder="Isi Artikel..." required></textarea>
                        </div>
                        <div>
                            <select v-model="formData.status">
                                <option v-for="option in statusOptions" :value="option.value">
                                    {{ option.text }}
                                </option>
                            </select>
                        </div>
                        <input type="hidden" v-model="formData.id">
                        <button type="submit" id="btnSimpan">Simpan</button>
                        <button type="button" @click="showForm = false">Batal</button>
                    </form>
                </div>
            </div>
        </div>
    `,
    data() {
        return {
            artikel: [],
            formData: { id: null, judul: '', isi: '', status: 0 },
            showForm: false,
            formTitle: 'Tambah Data',
            statusOptions: [
                { text: 'Draft', value: 0 },
                { text: 'Publish', value: 'Aktif' }
            ]
        }
    },
    mounted() {
        this.loadData();
    },
    methods: {
        loadData() {
            axios.get('http://localhost:8080/post')
                .then(response => {
                    this.artikel = response.data.artikel;
                })
                .catch(error => console.log(error));
        },
        tambah() {
            this.showForm = true;
            this.formTitle = 'Tambah Data';
            this.formData = { id: null, judul: '', isi: '', status: 'Aktif' };
        },
        hapus(index, id) {
            if (confirm('Yakin menghapus data ini?')) {
                axios.delete('http://localhost:8080/post/' + id)
                    .then(response => {
                        this.artikel.splice(index, 1);
                        alert('Data berhasil dihapus');
                    })
                    .catch(error => console.log(error));
            }
        },
        edit(data) {
            this.showForm = true;
            this.formTitle = 'Ubah Data';
            this.formData = { id: data.id, judul: data.judul, isi: data.isi, status: data.status };
        },
        saveData() {
            if (this.formData.id) {
                axios.put('http://localhost:8080/post/' + this.formData.id, this.formData)
                    .then(response => { this.loadData(); this.showForm = false; })
                    .catch(error => console.log(error));
            } else {
                axios.post('http://localhost:8080/post', this.formData, {
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                })
                .then(response => { this.loadData(); this.showForm = false; })
                .catch(error => console.log(error));
            }
        },
        statusText(status) {
            if (!status) return 'Draft';
            return status === 'Aktif' || status == 1 ? 'Publish' : 'Draft';
        }
    }
};