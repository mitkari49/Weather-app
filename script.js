document.addEventListener('DOMContentLoaded', () => {
    const fetchDataBtn = document.getElementById('fetch-data-btn');
    const mapContainer = document.getElementById('map-container');
    const weatherDataContainer = document.getElementById('weather-data-container');
    const latitudeSpan = document.getElementById('latitude');
    const longitudeSpan = document.getElementById('longitude');

    const API_KEY = '9057f98f2d506bf70aea12181dc0ea11'; // Replace with your OpenWeatherMap API key
    const LATITUDE = 18.6224957;
    const LONGITUDE = 73.8639865;

    fetchDataBtn.addEventListener('click', fetchData);

    function fetchData() {
        // Set the provided latitude and longitude
        const lat = LATITUDE;
        const lon = LONGITUDE;

        // Display the latitude and longitude
        latitudeSpan.textContent = `Lat: ${lat}`;
        longitudeSpan.textContent = `Long: ${lon}`;

        displayMap(lat, lon);
        fetchWeatherData(lat, lon);
    }

    function displayMap(lat, lon) {
        const mapUrl = `https://maps.google.com/maps?q=${lat},${lon}&z=15&output=embed`;
        mapContainer.innerHTML = `<iframe src="${mapUrl}" frameborder="0" width="100%" height="100%"></iframe>`;
    }

    function fetchWeatherData(lat, lon) {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('API Response:', data); // Log the response to inspect it
                displayWeatherData(data);
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
                weatherDataContainer.innerHTML = `<p>Failed to retrieve weather data. Please try again later.</p>`;
            });
    }

    function displayWeatherData(data) {
        const weatherHtml = `
            <div>Location: ${data.name}</div>
            <div>Wind Speed: ${data.wind.speed} m/s</div>
            <div>Humidity: ${data.main.humidity}%</div>
            <div>Time Zone: GMT +${data.timezone / 3600}</div>
            <div>Pressure: ${data.main.pressure} hPa</div>
            <div>Wind Direction: ${data.wind.deg}°</div>
            <div>UV Index: N/A</div>
            <div>Feels like: ${data.main.feels_like}°C</div>
        `;
        weatherDataContainer.innerHTML = weatherHtml;
    }
});
