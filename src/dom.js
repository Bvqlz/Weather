import {formatDate} from './validFormat.js'

function weatherCard(data, location) {
    const card = document.createElement('div');
    card.className = 'weather-card';

    const locationElement = document.createElement('h2');
    locationElement.textContent = location;
    const dateElement = document.createElement('h3');
    dateElement.textContent = formatDate(data.date, data.timezone);

    const descriptionElement = document.createElement('p');
    descriptionElement.textContent = data.description;

    const temperatureElement = document.createElement('div');
    temperatureElement.className = 'temperature';
    temperatureElement.innerHTML = `<span class="temp-main">${Math.round(data.temperature)}</span>`

    const detailsElement = document.createElement('div');
    detailsElement.className = 'weather-details';
    detailsElement.innerHTML = `
        <div class="detail-item">
            <span class="label">Wind Speed:</span>
            <span class="value">${data.windSpeed}</span>
        </div>
        <div class="detail-item">
            <span class="label">Precipitation Chance:</span>
            <span class="value">${data.precipitationChance}%</span>
        </div>
        <div class="detail-item">
            <span class="label">Humidity:</span>
            <span class="value">${data.humidity}</span>
        </div>
        `

    card.appendChild(locationElement);
    card.appendChild(dateElement);
    card.appendChild(descriptionElement);
    card.appendChild(temperatureElement);
    card.appendChild(detailsElement);

    return card;
}