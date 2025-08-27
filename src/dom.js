import {formatDate, formatCompact} from './validFormat.js'

function weatherCard(data, location, timezone) {
    const card = document.createElement('div');
    card.className = 'weather-card';

    const locationElement = document.createElement('h2');
    locationElement.textContent = location;
    const dateElement = document.createElement('h3');
    dateElement.textContent = formatDate(data.date, timezone);

    const descriptionElement = document.createElement('p');
    descriptionElement.textContent = data.description;

    const temperatureElement = document.createElement('div');
    temperatureElement.className = 'temperature';
    temperatureElement.innerHTML = `<span class="temp-main">${Math.round(data.temperature)}°F</span>`

    const detailsElement = document.createElement('div');
    detailsElement.className = 'weather-details';
    detailsElement.innerHTML = `
        <div class="detail-item">
            <span class="label">Wind Speed:</span>
            <span class="value">${data.windSpeed} mph</span>
        </div>
        <div class="detail-item">
            <span class="label">Precipitation Chance:</span>
            <span class="value">${data.precipitationChance}%</span>
        </div>
        <div class="detail-item">
            <span class="label">Humidity:</span>
            <span class="value">${data.humidity}%</span>
        </div>
        `

    card.appendChild(locationElement);
    card.appendChild(dateElement);
    card.appendChild(descriptionElement);
    card.appendChild(temperatureElement);
    card.appendChild(detailsElement);

    return card;
}

function compactWeatherCard(data, timezone) {
    const card = document.createElement('div');
    card.className = 'weather-card compact';

    const dayElement = document.createElement('h4');
    dayElement.textContent = formatCompact(data.date, timezone);

    const temperatureElement = document.createElement('div');
    temperatureElement.className = 'temperature-compact';
    temperatureElement.textContent = `${Math.round(data.temperature)}°F`;

    card.appendChild(dayElement);
    card.appendChild(temperatureElement);
    return card;
}

function displayCard(weatherData) {
    let container = document.querySelector('.weather-container');
    if(!container) {
        container = document.createElement('div');
        container.className = 'weather-container';
        document.body.appendChild(container);
    }

    container.innerHTML = ``;
    const todayData = weatherData.days[0];
    const card = weatherCard(todayData, weatherData.location, weatherData.timezone);

    container.appendChild(card);
}

function displayForecast(weatherData) {
    let forecastContainer = document.querySelector('.forecast-container');
    if(!forecastContainer) {
        forecastContainer = document.createElement('div');
        forecastContainer.className = 'forecast-container';
        document.body.appendChild(forecastContainer);
    }

    forecastContainer.innerHTML = ``
    weatherData.days.slice(0, 7).forEach(day => {
        const compactCard = compactWeatherCard(day, weatherData.timezone);
        forecastContainer.appendChild(compactCard);
    })
}



function displayError(message) {
    let errorElement = document.createElement('div');
    if(!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        document.body.appendChild(errorElement);
    }

    errorElement.textContent = message;
    setTimeout(() => {
        errorElement.textContent = '';
    }, 5000)
}


export { weatherCard, compactWeatherCard, displayCard, displayForecast, displayError };