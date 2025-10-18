# Aplikasi Manajemen Tugas Akademik

## 📖 Deskripsi Aplikasi

**Task Master** adalah aplikasi web interaktif yang dirancang khusus untuk membantu mahasiswa mengelola dan mengorganisir tugas-tugas akademik mereka dengan lebih efisien. Aplikasi ini menyediakan antarmuka yang user-friendly dengan fitur lengkap untuk menambah, mengedit, melacak, dan menyelesaikan tugas sesuai dengan deadline yang ditentukan.

Dengan design modern dan intuitif, Task Master membuat manajemen tugas akademik menjadi lebih mudah dan menyenangkan.

---

## ✨ Fitur-Fitur Utama

### 1. **Tambah Tugas Baru** 📝
- Input nama tugas dengan validasi minimal 3 karakter
- Pilih mata kuliah yang terkait
- Tentukan deadline dengan format tanggal dan waktu
- Validasi otomatis untuk memastikan deadline di masa depan

### 2. **Kelola Status Tugas** ✅
- Tandai tugas sebagai selesai/belum selesai dengan checkbox
- Tampilan visual yang berbeda untuk tugas yang sudah selesai (strikethrough)
- Update status real-time tanpa perlu refresh

### 3. **Pencarian & Filter** 🔍
- Cari tugas berdasarkan nama atau mata kuliah
- Filter tugas: Semua, Belum Selesai, Selesai
- Hasil pencarian real-time saat mengetik

### 4. **Hapus Tugas** 🗑️
- Tombol hapus yang dilengkapi konfirmasi
- Mencegah penghapusan tugas secara tidak sengaja

### 5. **Tampilkan Statistik** 📊
- Total tugas yang ada
- Jumlah tugas belum selesai
- Jumlah tugas yang sudah selesai
- Update statistik secara real-time

### 6. **Countdown Deadline** ⏱️
- Menampilkan sisa waktu hingga deadline dalam hari dan jam
- Indikator jika deadline sudah terlewat

### 7. **Penyimpanan Data Lokal** 💾
- Semua data tersimpan di localStorage browser
- Data tetap tersimpan meski browser ditutup
- Perbaruan otomatis setiap kali ada perubahan

### 8. **Validasi Form Lengkap** ✔️
- Nama tugas tidak boleh kosong dan minimal 3 karakter
- Mata kuliah tidak boleh kosong dan minimal 3 karakter
- Deadline harus dipilih dan berada di masa depan
- Pesan error yang jelas dan membantu pengguna

---

## 📁 Struktur File

```
task-manager/
├── index.html      # Struktur HTML aplikasi
├── style.css       # Styling dan desain (~210 lines)
├── script.js       # Logika JavaScript dan fungsionalitas
└── README.md       # Dokumentasi (file ini)
```

---

## 🚀 Cara Menjalankan Aplikasi

### **Metode 1: Langsung di Browser**
1. Download atau clone repository ini
2. Buka folder `task-manager` di komputer Anda
3. Double-click file `index.html`
4. Aplikasi akan terbuka otomatis di browser default Anda

### **Metode 2: Menggunakan Local Server (Recommended)**
Jika Anda memiliki Python terpasang:

```bash
# Python 3
python -m http.server 8000

# atau Python 2
python -m SimpleHTTPServer 8000
```

Kemudian buka browser dan akses: `http://localhost:8000`

### **Metode 3: Menggunakan VS Code Live Server**
1. Buka folder di VS Code
2. Install extension "Live Server" (oleh Ritwick Dey)
3. Klik kanan pada `index.html` → "Open with Live Server"
4. Aplikasi akan terbuka di browser dengan auto-refresh

---

## 📋 Daftar Fitur yang Diimplementasikan

| No | Fitur | Status | Deskripsi |
|:--:|-------|:------:|-----------|
| 1 | Tambah Tugas | ✅ | Menambah tugas baru dengan nama, mata kuliah, dan deadline |
| 2 | Tandai Selesai | ✅ | Mengubah status tugas menjadi selesai/belum selesai |
| 3 | Hapus Tugas | ✅ | Menghapus tugas dengan konfirmasi |
| 4 | Pencarian Tugas | ✅ | Mencari tugas berdasarkan nama atau mata kuliah |
| 5 | Filter Tugas | ✅ | Filter berdasarkan status (Semua, Belum Selesai, Selesai) |
| 6 | Statistik Tugas | ✅ | Menampilkan total, belum selesai, dan selesai |
| 7 | Countdown Deadline | ✅ | Menampilkan sisa waktu hingga deadline |
| 8 | Penyimpanan Data | ✅ | Menyimpan data di localStorage browser |
| 9 | Validasi Form | ✅ | Validasi input untuk memastikan data valid |
| 10 | Responsive Design | ✅ | Desain yang responsif untuk desktop dan mobile |

---

## 🔧 Penjelasan Teknis

### **1. Penggunaan localStorage**

localStorage digunakan untuk menyimpan data tugas secara permanen di browser pengguna.

#### **Menyimpan Data:**
```javascript
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
```
- Mengkonversi array `tasks` menjadi format JSON
- Menyimpan dengan key `'tasks'` di localStorage

#### **Mengambil Data:**
```javascript
function loadTasks() {
    const saved = localStorage.getItem('tasks');
    tasks = saved ? JSON.parse(saved) : [];
}
```
- Mengambil data dari localStorage
- Mengkonversi JSON kembali menjadi array JavaScript
- Jika tidak ada data, inisialisasi dengan array kosong

#### **Proses Sinkronisasi:**
- Data diperbarui setiap kali ada perubahan (tambah, edit, hapus)
- Fungsi `saveTasks()` dipanggil otomatis setelah setiap operasi
- Data dimuat saat halaman pertama kali dibuka

---

### **2. Validasi Form**

Validasi dilakukan pada saat pengguna submit form untuk memastikan data yang diinput valid.

#### **Validasi Nama Tugas:**
```javascript
if (!taskName.trim()) {
    nameError.textContent = 'Nama tugas tidak boleh kosong';
    isValid = false;
} else if (taskName.trim().length < 3) {
    nameError.textContent = 'Nama tugas minimal 3 karakter';
    isValid = false;
}
```

#### **Validasi Mata Kuliah:**
```javascript
if (!taskCourse.trim()) {
    courseError.textContent = 'Mata kuliah tidak boleh kosong';
    isValid = false;
} else if (taskCourse.trim().length < 3) {
    courseError.textContent = 'Mata kuliah minimal 3 karakter';
    isValid = false;
}
```

#### **Validasi Deadline:**
```javascript
if (!taskDeadline) {
    deadlineError.textContent = 'Deadline harus dipilih';
    isValid = false;
} else {
    const selectedDate = new Date(taskDeadline);
    const now = new Date();
    
    if (selectedDate <= now) {
        deadlineError.textContent = 'Deadline harus di masa depan';
        isValid = false;
    }
}
```

#### **Tampil Error Message:**
- Error hanya ditampilkan jika ada kesalahan (`display: none` default)
- Class `show` ditambahkan untuk menampilkan error
- User-friendly message membantu pengguna memperbaiki input

---

### **3. Struktur Data Tugas**

Setiap tugas menyimpan informasi:
```javascript
{
    id: 1234567890,           // Timestamp unik
    name: "Buat Resume",      // Nama tugas
    course: "Pemrograman Web",// Mata kuliah
    deadline: "2024-12-25T14:30", // Format ISO 8601
    completed: false,         // Status selesai
    createdAt: "2024-12-01T10:00:00.000Z" // Waktu dibuat
}
```

---

### **4. Fitur Pencarian & Filter**

#### **Pencarian Real-time:**
```javascript
function filterTasks() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    
    let filtered = tasks.filter(task => {
        const matchSearch = 
            task.name.toLowerCase().includes(searchTerm) ||
            task.course.toLowerCase().includes(searchTerm);
        // ... logika filter status
        return matchSearch && matchFilter;
    });
}
```

#### **Filter Status:**
- Semua: Menampilkan semua tugas
- Belum Selesai: Hanya tugas dengan `completed = false`
- Selesai: Hanya tugas dengan `completed = true`

---
<img width="1920" height="1080" alt="Screenshot (326)" src="https://github.com/user-attachments/assets/d9d88e0b-b903-4e13-8fb3-ce54895ecd98" />
---
<img width="1920" height="1080" alt="Screenshot (327)" src="https://github.com/user-attachments/assets/1c8ddeaa-3610-4811-8d10-6e882881cac1" />
---
<img width="1920" height="1080" alt="Screenshot (328)" src="https://github.com/user-attachments/assets/2ae4d6b2-fe2b-475d-836e-38afc1fb525d" />



