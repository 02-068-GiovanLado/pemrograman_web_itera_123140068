// DOM Elements
const loadingState = document.getElementById('loadingState');
const weatherGrid = document.getElementById('weatherGrid');
const modalForm = document.getElementById('modalForm');
const modalTitle = document.getElementById('modalTitle');
const btnTambah = document.getElementById('btnTambah');
const btnCloseModal = document.getElementById('btnCloseModal');
const btnBatal = document.getElementById('btnBatal');
const btnSimpan = document.getElementById('btnSimpan');
const totalCities = document.getElementById('totalCities');

// Form inputs
const inputCity = document.getElementById('inputCity');
const inputCountry = document.getElementById('inputCountry');
const inputTemp = document.getElementById('inputTemp');
const inputHumidity = document.getElementById('inputHumidity');
const inputCondition = document.getElementById('inputCondition');
const inputWind = document.getElementById('inputWind');
const inputTimezone = document.getElementById('inputTimezone');

// Arrow function untuk membuka modal
const openModal = (editId = null) => {
    if (editId) {
        const city = app.getCityById(editId);
        if (city) {
            modalTitle.textContent = 'Edit Data Cuaca';
            inputCity.value = city.city;
            inputCountry.value = city.country;
            inputTemp.value = city.temp;
            inputHumidity.value = city.humidity;
            inputCondition.value = city.condition;
            inputWind.value = city.wind;
            inputTimezone.value = city.timezone;
            app.editingId = editId;
        }
    } else {
        modalTitle.textContent = 'Tambah Kota Baru';
        clearForm();
        app.editingId = null;
    }
    modalForm.classList.remove('hidden');
};

// Arrow function untuk menutup modal
const closeModal = () => {
    modalForm.classList.add('hidden');
    clearForm();
    app.editingId = null;
};

// Arrow function untuk clear form
const clearForm = () => {
    inputCity.value = '';
    inputCountry.value = '';
    inputTemp.value = '';
    inputHumidity.value = '';
    inputCondition.value = 'Cerah';
    inputWind.value = '';
    inputTimezone.value = '7';
};

// Arrow function untuk validasi form
const validateForm = () => {
    if (!inputCity.value.trim()) {
        alert('Nama kota harus diisi!');
        return false;
    }
    if (!inputCountry.value.trim()) {
        alert('Nama negara harus diisi!');
        return false;
    }
    if (!inputTemp.value || isNaN(inputTemp.value)) {
        alert('Suhu harus berupa angka!');
        return false;
    }
    if (!inputHumidity.value || isNaN(inputHumidity.value)) {
        alert('Kelembaban harus berupa angka!');
        return false;
    }
    if (inputHumidity.value < 0 || inputHumidity.value > 100) {
        alert('Kelembaban harus antara 0-100%!');
        return false;
    }
    if (!inputWind.value || isNaN(inputWind.value)) {
        alert('Kecepatan angin harus berupa angka!');
        return false;
    }
    if (!inputTimezone.value || isNaN(inputTimezone.value)) {
        alert('Timezone offset harus berupa angka!');
        return false;
    }
    return true;
};

// Arrow function untuk handle save
const handleSave = async () => {
    if (!validateForm()) return;

    const cityData = {
        city: inputCity.value.trim(),
        country: inputCountry.value.trim(),
        temp: parseFloat(inputTemp.value),
        humidity: parseInt(inputHumidity.value),
        condition: inputCondition.value,
        wind: parseFloat(inputWind.value),
        timezone: parseInt(inputTimezone.value)
    };

    if (app.editingId) {
        await app.updateCity(app.editingId, cityData);
    } else {
        await app.addCity(cityData);
    }

    closeModal();
};

// Arrow function untuk render weather card
const renderWeatherCard = (city) => {
    return `
        <div class="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all hover:-translate-y-2 hover:shadow-2xl">
            <div class="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
                <div class="flex items-start justify-between mb-2">
                    <div>
                        <h3 class="text-2xl font-bold">${city.city}</h3>
                        <p class="text-blue-100 text-sm">${city.country}</p>
                    </div>
                    <div class="text-5xl">${city.getWeatherEmoji()}</div>
                </div>
                <div class="mt-4">
                    <p class="text-5xl font-bold">${city.temp}°C</p>
                    <p class="text-blue-100 text-sm mt-1">${city.condition}</p>
                </div>
            </div>
            
            <div class="p-6">
                <div class="grid grid-cols-2 gap-4 mb-4">
                    <div class="bg-gray-50 rounded-lg p-3">
                        <div class="flex items-center gap-2 text-gray-600 text-sm mb-1">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path>
                            </svg>
                            Kelembaban
                        </div>
                        <p class="text-2xl font-bold text-gray-800">${city.humidity}%</p>
                    </div>
                    
                    <div class="bg-gray-50 rounded-lg p-3">
                        <div class="flex items-center gap-2 text-gray-600 text-sm mb-1">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                            </svg>
                            Angin
                        </div>
                        <p class="text-2xl font-bold text-gray-800">${city.wind} <span class="text-sm">km/h</span></p>
                    </div>
                </div>
                
                <div class="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-4 mb-4">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-2">
                            <svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            <span class="text-sm text-gray-600">Waktu Lokal</span>
                        </div>
                        <p id="time-${city.id}" class="text-xl font-bold text-indigo-600">${city.getLocalTime()}</p>
                    </div>
                </div>
                
                <div class="flex items-center justify-between mb-4">
                    <div class="flex items-center gap-2">
                        <span class="text-2xl">${city.temp >= 30 ? '🔥' : city.temp >= 20 ? '😊' : '🥶'}</span>
                        <span class="text-sm font-semibold ${city.getTempColor()}">${city.getWeatherStatus()}</span>
                    </div>
                </div>
                
                <div class="text-xs text-gray-400 mb-4">
                    Diperbarui: ${city.getLastUpdateTime()}
                </div>
                
                <div class="flex gap-2">
                    <button onclick="openModal(${city.id})" class="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-600 px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-2 font-semibold">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                        </svg>
                        Edit
                    </button>
                    <button onclick="app.deleteCity(${city.id})" class="flex-1 bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-2 font-semibold">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                        </svg>
                        Hapus
                    </button>
                </div>
            </div>
        </div>
    `;
};

// Arrow function untuk render empty state
const renderEmptyState = () => {
    return `
        <div class="col-span-full bg-white rounded-2xl shadow-lg p-12 text-center">
            <svg class="w-24 h-24 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path>
            </svg>
            <h3 class="text-xl font-semibold text-gray-700 mb-2">Belum Ada Data Cuaca</h3>
            <p class="text-gray-500 mb-6">Tambahkan kota untuk memantau cuaca dan waktu</p>
            <button onclick="openModal()" class="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg inline-flex items-center gap-2 transition-colors">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                </svg>
                Tambah Kota Pertama
            </button>
        </div>
    `;
};

// Override render method dari WeatherApp
app.render = () => {
    if (app.cities.length === 0) {
        weatherGrid.innerHTML = renderEmptyState();
    } else {
        const sortedCities = app.getCitiesSortedByTemp();
        weatherGrid.innerHTML = sortedCities.map(city => renderWeatherCard(city)).join('');
    }
    totalCities.textContent = app.cities.length;
};

// Event Listeners
btnTambah.addEventListener('click', () => openModal());
btnCloseModal.addEventListener('click', closeModal);
btnBatal.addEventListener('click', closeModal);
btnSimpan.addEventListener('click', handleSave);

// Close modal saat klik di luar modal content
modalForm.addEventListener('click', (e) => {
    if (e.target === modalForm) {
        closeModal();
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // ESC untuk close modal
    if (e.key === 'Escape' && !modalForm.classList.contains('hidden')) {
        closeModal();
    }
    // Ctrl/Cmd + N untuk tambah kota
    if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
        e.preventDefault();
        openModal();
    }
});

// Arrow function untuk inisialisasi aplikasi
const initApp = async () => {
    try {
        loadingState.classList.remove('hidden');
        weatherGrid.classList.add('hidden');
        
        // Simulasi loading
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        await app.init();
        
        loadingState.classList.add('hidden');
        weatherGrid.classList.remove('hidden');
        
        // Update waktu pertama kali
        app.updateCurrentTime();
    } catch (error) {
        console.error('Error initializing app:', error);
        alert('Terjadi kesalahan saat memuat aplikasi');
    }
};

// Cleanup saat window ditutup
window.addEventListener('beforeunload', () => {
    app.cleanup();
});

// Jalankan aplikasi saat DOM ready
document.addEventListener('DOMContentLoaded', initApp);