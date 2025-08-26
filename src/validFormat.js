function validateCity(city) {
    const trimCity = city.trim();

    if (!trimCity) {
        return {isValid: false, error: 'Please enter a city name'}
    }

    const cityRegex = /^[a-zA-Z\s\-'\.]+$/;
    if(!cityRegex.test(city)) {
        return {isValid: false, error: 'Please enter valid city'}
    }

    return {isValid: true, city: trimCity};
}

function formatDate(date, time) {
    const dateObject = new Date(date + 'T12:00:00');
    return dateObject.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        timeZone: time
    });
}

export {validateCity, formatDate};