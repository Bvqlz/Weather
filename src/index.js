import { validateCity, formatDate} from "./validFormat.js";
import { fetchWeather, parseWeather } from "./weatherAPI.js";
import { weatherCard, compactWeatherCard, displayCard, displayForecast, displayError } from "./dom.js"

const searchInput = document.querySelector(`input[type="text"]`);
const searchButton = document.querySelector('button');

async function handleSearch() {
    const cityInput = searchInput.value;
    const validate = validateCity(cityInput);

    if(!validate.isValid) {
        displayError(validate.error);
        return;
    }

    const city = validate.city;

    try {
        const rawData = await fetchWeather(city);
        const processedData = parseWeather(rawData);

        displayCard(processedData);
        displayForecast(processedData);

        console.log(processedData);

    } catch (error) {
        displayError('Failed to fetch weather data. Please try again.');
        console.error('Weather fetch error:', error);
    }
}

searchButton.addEventListener('click', handleSearch);
searchInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        handleSearch();
    }
});