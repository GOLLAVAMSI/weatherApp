
/* Weather fetch and UI update script
   - Uses OpenWeatherMap current weather API (metric units)
   - Replaces placeholder API key with the provided key
   - Maps weather conditions to local SVG icons in /images
*/

// DOM elements
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const cityEl = document.querySelector(".city");
const tempEl = document.querySelector(".temp");
const humidityEl = document.querySelector(".humidity");
const windEl = document.querySelector(".wind");
const iconEl = document.querySelector(".weather .icon");
const descEl = document.querySelector('.desc');

function mapConditionToIcon(main, desc) {
    const key = (main || "").toLowerCase();
    if (key.includes("clear")) return "clear.svg";
    if (key.includes("cloud")) return "cloudy.svg";
    if (key.includes("rain") || key.includes("drizzle")) return "rain.svg";
    if (key.includes("snow")) return "snow.svg";
    if (key.includes("thunder")) return "thunder.svg";
    if (key.includes("mist") || key.includes("fog") || key.includes("haze")) return "mist.svg";
    return "cloudy.svg"; // fallback
}

function mapIconCodeToFile(iconCode) {
    if (!iconCode) return null;
    const code = iconCode.toLowerCase();
    if (code.startsWith('01')) return 'clear.svg';
    if (code.startsWith('02') || code.startsWith('03') || code.startsWith('04')) return 'cloudy.svg';
    if (code.startsWith('09') || code.startsWith('10')) return 'rain.svg';
    if (code.startsWith('11')) return 'thunder.svg';
    if (code.startsWith('13')) return 'snow.svg';
    if (code.startsWith('50')) return 'mist.svg';
    return null;
}

async function fetchWeatherByCity(city) {
    if (!city) return showError('Please enter a city name.');
    try {
        const res = await fetch(`/api/getWeather?q=${encodeURIComponent(city)}`);
        if (!res.ok) throw new Error('Location not found');
        const data = await res.json();
        updateUI(data);
    } catch (err) {
        showError(err.message || 'Failed to fetch weather');
        console.error(err);
    }
}

async function fetchWeatherByCoords(lat, lon) {
    try {
        const res = await fetch(`/api/getWeather?lat=${lat}&lon=${lon}`);
        if (!res.ok) throw new Error('Location not found');
        const data = await res.json();
        updateUI(data);
    } catch (err) {
        showError(err.message || 'Failed to fetch weather');
        console.error(err);
    }
}

function updateUI(data) {
    if (!data || !data.main) return showError('Invalid data');
    const country = data.sys && data.sys.country ? data.sys.country : '';
    cityEl.textContent = `${data.name}${country ? ', ' + country : ''}`;
    tempEl.textContent = `${Math.round(data.main.temp)}°c`;
    humidityEl.textContent = `${data.main.humidity}%`;
    // convert m/s to km/h
    const windKmh = data.wind && data.wind.speed ? Math.round(data.wind.speed * 3.6) : '--';
    windEl.textContent = `${windKmh} km/h`;
    const w = data.weather && data.weather[0] ? data.weather[0] : { main: '', description: '', icon: '' };
    if (descEl) descEl.textContent = w.description || w.main || '';
    // choose icon by icon code first, then fallback to condition
    const iconByCode = mapIconCodeToFile(w.icon);
    const iconFile = iconByCode || mapConditionToIcon(w.main, w.description);
    if (iconEl) iconEl.src = `images/${iconFile}`;
    // cache latest
    try { localStorage.setItem('lastWeather', JSON.stringify(data)); } catch (e) {}
}

function showError(message) {
    cityEl.textContent = message;
    tempEl.textContent = '--°c';
    humidityEl.textContent = '--%';
    windEl.textContent = '-- km/h';
}

// Event handlers
searchBtn.addEventListener('click', () => fetchWeatherByCity(searchBox.value));
searchBox.addEventListener('keydown', (e) => { if (e.key === 'Enter') fetchWeatherByCity(searchBox.value); });

// On load: try geolocation, otherwise fallback to a default city
window.addEventListener('load', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((pos) => {
            fetchWeatherByCoords(pos.coords.latitude, pos.coords.longitude);
        }, () => {
            fetchWeatherByCity('London');
        });
    } else {
        fetchWeatherByCity('London');
    }
});