async function fetchWeather(city) {
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(city)}?unitGroup=us&key=TEBHLZ3JC98BNFH4R775VVRUM&contentType=json`;

    try {
        const response = await fetch(url, {mode: 'cors'});
        if(!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch(error) {
        throw error;
    }
}

function parseWeather(data) {
    return {
        location: data.resolvedAddress,
        timezone: data.timezone,
        description: data.description,
        days: data.days.map(day => ({
            date: day.datatime,
            description: day.description,
            temperature: day.temp,
            windSpeed: day.windspeed,
            precipitationChance: day.precipprob,
            humidity: day.humidity,
        }))
    }
}

export {fetchWeather, parseWeather};