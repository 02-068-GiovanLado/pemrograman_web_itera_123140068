# Data awal mahasiswa dalam bentuk list of dictionaries
data_mahasiswa = [
    {"nama": "Andi", "NIM": "12345", "nilai_uts": 80, "nilai_uas": 85, "nilai_tugas": 88},
    {"nama": "Budi", "NIM": "12346", "nilai_uts": 70, "nilai_uas": 75, "nilai_tugas": 72},
    {"nama": "Citra", "NIM": "12347", "nilai_uts": 90, "nilai_uas": 92, "nilai_tugas": 89},
    {"nama": "Dina", "NIM": "12348", "nilai_uts": 60, "nilai_uas": 65, "nilai_tugas": 62},
    {"nama": "Eko", "NIM": "12349", "nilai_uts": 55, "nilai_uas": 50, "nilai_tugas": 58}
]

def hitung_nilai_akhir(mahasiswa):
    """Menghitung nilai akhir berdasarkan bobot: UTS 30%, UAS 40%, Tugas 30%"""
    uts = mahasiswa['nilai_uts']
    uas = mahasiswa['nilai_uas']
    tugas = mahasiswa['nilai_tugas']
    return 0.3 * uts + 0.4 * uas + 0.3 * tugas

def tentukan_grade(nilai_akhir):
    """Menentukan grade berdasarkan nilai akhir"""
    if nilai_akhir >= 80:
        return 'A'
    elif nilai_akhir >= 70:
        return 'B'
    elif nilai_akhir >= 60:
        return 'C'
    elif nilai_akhir >= 50:
        return 'D'
    else:
        return 'E'

def tampilkan_tabel():
    """Menampilkan data mahasiswa dalam bentuk tabel"""
    print("\n" + "="*80)
    print(f"{'No':<3} {'Nama':<15} {'NIM':<10} {'UTS':<5} {'UAS':<5} {'Tugas':<7} {'Akhir':<7} {'Grade':<5}")
    print("="*80)
    for i, mhs in enumerate(data_mahasiswa, start=1):
        nilai_akhir = hitung_nilai_akhir(mhs)
        grade = tentukan_grade(nilai_akhir)
        print(f"{i:<3} {mhs['nama']:<15} {mhs['NIM']:<10} {mhs['nilai_uts']:<5} {mhs['nilai_uas']:<5} {mhs['nilai_tugas']:<7} {nilai_akhir:<7.2f} {grade:<5}")
    print("="*80)

def cari_nilai_tertinggi_terendah():
    """Menampilkan mahasiswa dengan nilai tertinggi dan terendah"""
    if not data_mahasiswa:
        print("\nTidak ada data mahasiswa.")
        return

    mahasiswa_dengan_nilai = []
    for mhs in data_mahasiswa:
        nilai_akhir = hitung_nilai_akhir(mhs)
        mahasiswa_dengan_nilai.append((mhs, nilai_akhir))

    tertinggi = max(mahasiswa_dengan_nilai, key=lambda x: x[1])
    terendah = min(mahasiswa_dengan_nilai, key=lambda x: x[1])

    print(f"\nMahasiswa dengan nilai tertinggi: {tertinggi[0]['nama']} (Nilai: {tertinggi[1]:.2f})")
    print(f"Mahasiswa dengan nilai terendah: {terendah[0]['nama']} (Nilai: {terendah[1]:.2f})")

def input_mahasiswa_baru():
    """Menambahkan data mahasiswa baru dari input pengguna"""
    print("\n--- Input Mahasiswa Baru ---")
    nama = input("Nama: ")
    nim = input("NIM: ")
    try:
        uts = float(input("Nilai UTS: "))
        uas = float(input("Nilai UAS: "))
        tugas = float(input("Nilai Tugas: "))
    except ValueError:
        print("Input nilai harus berupa angka.")
        return

    data_mahasiswa.append({
        "nama": nama,
        "NIM": nim,
        "nilai_uts": uts,
        "nilai_uas": uas,
        "nilai_tugas": tugas
    })
    print("Data mahasiswa baru berhasil ditambahkan.")

def filter_berdasarkan_grade():
    """Menampilkan mahasiswa berdasarkan grade yang dipilih"""
    grade_dicari = input("\nMasukkan grade yang ingin difilter (A/B/C/D/E): ").upper()
    hasil = []
    for mhs in data_mahasiswa:
        nilai_akhir = hitung_nilai_akhir(mhs)
        grade = tentukan_grade(nilai_akhir)
        if grade == grade_dicari:
            hasil.append(mhs)

    if hasil:
        print(f"\nMahasiswa dengan grade {grade_dicari}:")
        print(f"{'Nama':<15} {'NIM':<10} {'UTS':<5} {'UAS':<5} {'Tugas':<7} {'Akhir':<7} {'Grade':<5}")
        print("-"*60)
        for mhs in hasil:
            nilai_akhir = hitung_nilai_akhir(mhs)
            print(f"{mhs['nama']:<15} {mhs['NIM']:<10} {mhs['nilai_uts']:<5} {mhs['nilai_uas']:<5} {mhs['nilai_tugas']:<7} {nilai_akhir:<7.2f} {grade_dicari:<5}")
    else:
        print(f"Tidak ada mahasiswa dengan grade {grade_dicari}.")

def hitung_rata_rata_kelas():
    """Menghitung dan menampilkan rata-rata nilai akhir kelas"""
    if not data_mahasiswa:
        print("\nTidak ada data mahasiswa.")
        return

    total = sum(hitung_nilai_akhir(mhs) for mhs in data_mahasiswa)
    rata_rata = total / len(data_mahasiswa)
    print(f"\nRata-rata nilai kelas: {rata_rata:.2f}")

def menu():
    """Menampilkan menu pilihan dan memproses input pengguna"""
    while True:
        print("\n" + "="*40)
        print("PROGRAM PENGELOLAAN DATA NILAI MAHASISWA")
        print("="*40)
        print("1. Tampilkan Data Mahasiswa")
        print("2. Tambah Mahasiswa Baru")
        print("3. Cari Nilai Tertinggi & Terendah")
        print("4. Filter Berdasarkan Grade")
        print("5. Rata-rata Kelas")
        print("6. Keluar")
        print("-"*40)

        pilihan = input("Pilih menu (1-6): ")

        if pilihan == '1':
            tampilkan_tabel()
        elif pilihan == '2':
            input_mahasiswa_baru()
        elif pilihan == '3':
            cari_nilai_tertinggi_terendah()
        elif pilihan == '4':
            filter_berdasarkan_grade()
        elif pilihan == '5':
            hitung_rata_rata_kelas()
        elif pilihan == '6':
            print("\nTerima kasih telah menggunakan program ini.")
            break
        else:
            print("\nPilihan tidak valid. Silakan pilih antara 1-6.")

# Jalankan program
if __name__ == "__main__":
    menu()