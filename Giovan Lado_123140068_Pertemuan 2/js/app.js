// Class untuk mengelola data cuaca kota
class WeatherCity {
    constructor(id, city, country, temp, humidity, condition, wind, timezone) {
        this.id = id;
        this.city = city;
        this.country = country;
        this.temp = temp;
        this.humidity = humidity;
        this.condition = condition;
        this.wind = wind;
        this.timezone = timezone;
        this.lastUpdated = new Date();
    }

    // Arrow function untuk mendapatkan emoji cuaca
    getWeatherEmoji = () => {
        const emojiMap = {
            'Cerah': '☀️',
            'Berawan': '⛅',
            'Mendung': '☁️',
            'Hujan': '🌧️',
            'Badai': '⛈️'
        };
        return emojiMap[this.condition] || '🌤️';
    };

    // Arrow function untuk mendapatkan warna berdasarkan suhu
    getTempColor = () => {
        if (this.temp >= 30) return 'text-red-600';
        if (this.temp >= 25) return 'text-orange-500';
        if (this.temp >= 20) return 'text-yellow-600';
        return 'text-blue-600';
    };

    // Arrow function untuk mendapatkan status cuaca
    getWeatherStatus = () => {
        if (this.temp >= 32) return '🔥 Sangat Panas';
        if (this.temp >= 28) return '😰 Panas';
        if (this.temp >= 25) return '😊 Hangat';
        if (this.temp >= 20) return '👍 Nyaman';
        return '🥶 Dingin';
    };

    // Arrow function untuk mendapatkan waktu lokal kota
    getLocalTime = () => {
        const now = new Date();
        const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
        const cityTime = new Date(utc + (3600000 * this.timezone));
        
        const hours = String(cityTime.getHours()).padStart(2, '0');
        const minutes = String(cityTime.getMinutes()).padStart(2, '0');
        const seconds = String(cityTime.getSeconds()).padStart(2, '0');
        
        return `${hours}:${minutes}:${seconds}`;
    };

    // Arrow function untuk format tanggal update
    getLastUpdateTime = () => {
        const options = { 
            hour: '2-digit', 
            minute: '2-digit',
            day: '2-digit',
            month: 'short'
        };
        return this.lastUpdated.toLocaleString('id-ID', options);
    };
}

// Class untuk mengelola storage
class StorageManager {
    constructor(key = 'weatherCities') {
        this.key = key;
    }

    // Async function untuk menyimpan data
    async save(data) {
        return new Promise((resolve) => {
            setTimeout(() => {
                try {
                    localStorage.setItem(this.key, JSON.stringify(data));
                    resolve(true);
                } catch (error) {
                    console.error('Error saving to localStorage:', error);
                    resolve(false);
                }
            }, 100);
        });
    }

    // Async function untuk mengambil data
    async load() {
        return new Promise((resolve) => {
            setTimeout(() => {
                try {
                    const data = localStorage.getItem(this.key);
                    resolve(data ? JSON.parse(data) : []);
                } catch (error) {
                    console.error('Error loading from localStorage:', error);
                    resolve([]);
                }
            }, 100);
        });
    }

    // Async function untuk menghapus semua data
    async clear() {
        return new Promise((resolve) => {
            setTimeout(() => {
                try {
                    localStorage.removeItem(this.key);
                    resolve(true);
                } catch (error) {
                    console.error('Error clearing localStorage:', error);
                    resolve(false);
                }
            }, 50);
        });
    }
}

// Class untuk mengelola aplikasi weather
class WeatherApp {
    constructor() {
        this.cities = [];
        this.storage = new StorageManager();
        this.editingId = null;
        this.timeInterval = null;
    }

    // Arrow function untuk inisialisasi data
    init = async () => {
        await this.loadCities();
        this.render();
        this.startTimeUpdate();
    };

    // Arrow function untuk load cities
    loadCities = async () => {
        const data = await this.storage.load();
        this.cities = data.map(c => new WeatherCity(
            c.id,
            c.city,
            c.country,
            c.temp,
            c.humidity,
            c.condition,
            c.wind,
            c.timezone
        ));
    };

    // Arrow function untuk save cities
    saveCities = async () => {
        await this.storage.save(this.cities);
    };

    // Arrow function untuk menambah city
    addCity = async (cityData) => {
        const newCity = new WeatherCity(
            Date.now(),
            cityData.city,
            cityData.country,
            cityData.temp,
            cityData.humidity,
            cityData.condition,
            cityData.wind,
            cityData.timezone
        );
        this.cities.push(newCity);
        await this.saveCities();
        this.render();
    };

    // Arrow function untuk update city
    updateCity = async (id, cityData) => {
        const index = this.cities.findIndex(c => c.id === id);
        if (index !== -1) {
            this.cities[index] = new WeatherCity(
                id,
                cityData.city,
                cityData.country,
                cityData.temp,
                cityData.humidity,
                cityData.condition,
                cityData.wind,
                cityData.timezone
            );
            await this.saveCities();
            this.render();
        }
    };

    // Arrow function untuk delete city
    deleteCity = async (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus kota ini?')) {
            this.cities = this.cities.filter(c => c.id !== id);
            await this.saveCities();
            this.render();
        }
    };

    // Arrow function untuk get city by ID
    getCityById = (id) => {
        return this.cities.find(c => c.id === id);
    };

    // Arrow function untuk sort cities by temperature
    getCitiesSortedByTemp = () => {
        return [...this.cities].sort((a, b) => b.temp - a.temp);
    };

    // Arrow function untuk update waktu real-time
    startTimeUpdate = () => {
        // Update setiap detik
        this.timeInterval = setInterval(() => {
            this.updateCurrentTime();
            this.updateCityTimes();
        }, 1000);
    };

    // Arrow function untuk update current time
    updateCurrentTime = () => {
        const now = new Date();
        
        // Update jam
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        const timeElement = document.getElementById('currentTime');
        if (timeElement) {
            timeElement.textContent = `${hours}:${minutes}:${seconds}`;
        }
        
        // Update tanggal
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        const dateElement = document.getElementById('currentDate');
        if (dateElement) {
            dateElement.textContent = now.toLocaleDateString('id-ID', options);
        }
        
        // Update hari
        const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
        const dayElement = document.getElementById('currentDay');
        if (dayElement) {
            dayElement.textContent = days[now.getDay()];
        }
    };

    // Arrow function untuk update waktu tiap kota
    updateCityTimes = () => {
        this.cities.forEach(city => {
            const timeElement = document.getElementById(`time-${city.id}`);
            if (timeElement) {
                timeElement.textContent = city.getLocalTime();
            }
        });
    };

    // Method untuk render UI (akan dioverride di main.js)
    render() {
        console.log('Render method should be overridden');
    }

    // Cleanup saat aplikasi ditutup
    cleanup = () => {
        if (this.timeInterval) {
            clearInterval(this.timeInterval);
        }
    };
}

// Export untuk digunakan di main.js
const app = new WeatherApp();