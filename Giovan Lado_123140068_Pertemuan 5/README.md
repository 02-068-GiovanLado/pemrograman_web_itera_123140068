# Sistem Manajemen Perpustakaan Sederhana

## Deskripsi
Program ini adalah implementasi sederhana dari sistem manajemen perpustakaan menggunakan konsep Object-Oriented Programming (OOP) dalam Python. Program ini memungkinkan pengguna untuk menambahkan, menampilkan, dan mencari item perpustakaan seperti buku dan majalah secara interaktif.

## Fitur
- Menambahkan item (buku/majalah) ke koleksi perpustakaan secara interaktif.
- Menampilkan daftar semua item yang tersedia.
- Mencari item berdasarkan ID atau judul.
- Menggunakan konsep OOP: abstract class, inheritance, encapsulation, dan polymorphism.

## Struktur Kelas
- `LibraryItem`: Kelas abstrak sebagai dasar item perpustakaan.
- `Book` dan `Magazine`: Subclass dari `LibraryItem`.
- `Library`: Kelas untuk mengelola koleksi item.

## Contoh Penggunaan
Program dijalankan secara interaktif. Contoh alur penggunaan:
- Pilih menu 1 untuk menambahkan buku.
- Pilih menu 2 untuk menambah majalah.
- Pilih menu 3 untuk melihat daftar item.
- Pilih menu 4 untuk mencari item.
- Pilih menu 5 untuk keluar.

## Konsep OOP yang Diterapkan
- **Abstract Class & Inheritance**: `LibraryItem` sebagai kelas dasar, `Book` dan `Magazine` mewarisinya.
- **Encapsulation**: Atribut `__items` di kelas `Library` bersifat private.
- **Polymorphism**: Method `display_info()` diimplementasikan secara berbeda oleh subclass.
- **Property Decorator**: Digunakan pada atribut `title` di `LibraryItem`.

<img width="804" height="529" alt="image" src="https://github.com/user-attachments/assets/df29f2f3-967d-487c-a6b4-8fc2a4b363e8" />
<img width="739" height="350" alt="image" src="https://github.com/user-attachments/assets/31e834ea-ddf4-4e43-b9e2-2c2a28132845" />
<img width="771" height="357" alt="image" src="https://github.com/user-attachments/assets/a03af729-d28b-4408-ad00-f91c3a1a4047" />

---
