from abc import ABC, abstractmethod

# Abstract base class
class LibraryItem(ABC):
    """
    Kelas abstrak sebagai dasar untuk semua item di perpustakaan.
    """

    def __init__(self, id_item, title):
        self._id_item = id_item  # protected
        self._title = title      # protected

    @property
    def title(self):
        """Getter untuk atribut title."""
        return self._title

    @abstractmethod
    def display_info(self):
        """
        Metode abstrak yang harus diimplementasikan oleh subclass.
        """
        pass

# Subclass Book
class Book(LibraryItem):
    """
    Kelas Book mewarisi dari LibraryItem.
    Menyimpan informasi tambahan seperti penulis dan jumlah halaman.
    """

    def __init__(self, id_item, title, author, pages):
        super().__init__(id_item, title)
        self.author = author
        self.pages = pages

    def display_info(self):
        """
        Menampilkan informasi buku.
        """
        return f"ID: {self._id_item}, Judul: {self.title}, Penulis: {self.author}, Halaman: {self.pages}"

# Subclass Magazine
class Magazine(LibraryItem):
    """
    Kelas Magazine mewarisi dari LibraryItem.
    Menyimpan informasi tambahan seperti nomor edisi dan bulan terbit.
    """

    def __init__(self, id_item, title, issue_number, release_month):
        super().__init__(id_item, title)
        self.issue_number = issue_number
        self.release_month = release_month

    def display_info(self):
        """
        Menampilkan informasi majalah.
        """
        return f"ID: {self._id_item}, Judul: {self.title}, Edisi: {self.issue_number}, Bulan Terbit: {self.release_month}"

# Class Library
class Library:
    """
    Kelas Library untuk mengelola koleksi item perpustakaan.
    """

    def __init__(self):
        self.__items = []  # private attribute

    def add_item(self, item):
        """
        Menambahkan item ke koleksi perpustakaan.
        """
        self.__items.append(item)
        print(f"Item '{item.title}' berhasil ditambahkan.")

    def list_items(self):
        """
        Menampilkan semua item dalam koleksi perpustakaan.
        """
        if not self.__items:
            print("\nTidak ada item di perpustakaan.")
            return
        print("\nDaftar Item di Perpustakaan:")
        print("-" * 60)
        for item in self.__items:
            print(item.display_info())

    def search_item(self, query):
        """
        Mencari item berdasarkan ID atau judul.
        """
        results = []
        for item in self.__items:
            if query.lower() in item.title.lower() or query == item._id_item:
                results.append(item)
        if results:
            print(f"\nHasil pencarian untuk '{query}':")
            for item in results:
                print(item.display_info())
        else:
            print(f"\nItem dengan ID atau judul '{query}' tidak ditemukan.")

def menu():
    """
    Fungsi menu interaktif untuk pengguna.
    """
    library = Library()

    while True:
        print("\n" + "="*50)
        print("SISTEM MANAJEMEN PERPUSTAKAAN")
        print("="*50)
        print("1. Tambah Buku")
        print("2. Tambah Majalah")
        print("3. Lihat Daftar Item")
        print("4. Cari Item")
        print("5. Keluar")
        print("-"*50)

        pilihan = input("Pilih menu (1-5): ")

        if pilihan == '1':
            try:
                id_item = input("Masukkan ID Buku: ")
                title = input("Masukkan Judul Buku: ")
                author = input("Masukkan Penulis: ")
                pages = int(input("Masukkan Jumlah Halaman: "))
                book = Book(id_item, title, author, pages)
                library.add_item(book)
            except ValueError:
                print("Jumlah halaman harus berupa angka.")
            except Exception as e:
                print(f"Terjadi kesalahan: {e}")

        elif pilihan == '2':
            try:
                id_item = input("Masukkan ID Majalah: ")
                title = input("Masukkan Judul Majalah: ")
                issue_number = input("Masukkan Nomor Edisi: ")
                release_month = input("Masukkan Bulan Terbit: ")
                magazine = Magazine(id_item, title, issue_number, release_month)
                library.add_item(magazine)
            except Exception as e:
                print(f"Terjadi kesalahan: {e}")

        elif pilihan == '3':
            library.list_items()

        elif pilihan == '4':
            query = input("Cari berdasarkan ID atau Judul: ")
            library.search_item(query)

        elif pilihan == '5':
            print("\nTerima kasih telah menggunakan sistem perpustakaan.")
            break

        else:
            print("\nPilihan tidak valid. Silakan pilih antara 1-5.")

if __name__ == "__main__":
    menu()