function renderCurrenyWeather(weatherCode, cityName, weatherDesc, tempValue, feelsTempValue, rainChance, humidityPerc, windSpeed) {
    const cityNameNode = document.querySelector('.current-result__city-name');
    cityNameNode.textContent = cityName;

    const weatherImg = document.querySelector('.weather-img');
    if (weatherCode >= 200 && weatherCode < 300) {
        weatherImg.src = './img/thunderstorm.svg'
    } else if (weatherCode >= 300 && weatherCode < 600) {
        weatherImg.src = './img/rain.svg'
    } else if (weatherCode >= 600 && weatherCode < 700) {
        weatherImg.src = './img/snow.svg'
    } else if (weatherCode >= 700 && weatherCode < 800) {
        weatherImg.src = './img/mist.svg'
    } else if (weatherCode === 800) {
        weatherImg.src = './img/sun.svg'
    } else { weatherImg.src = './img/clouds.svg' }
    const weatherDescNode = document.querySelector('.current-result__weather-description');
    weatherDescNode.textContent = weatherDesc;

    const tempNode = document.querySelector('.temp-value');
    tempNode.textContent = tempValue;

    const feelsTempNode = document.querySelector('.feels-like-value');
    feelsTempNode.textContent = feelsTempValue;

    const rainNode = document.querySelector('.rain-chance-value');
    rainNode.textContent = rainChance;

    const humidityNode = document.querySelector('.humidity-value');
    humidityNode.textContent = humidityPerc;

    const windSpeedNode = document.querySelector('.wind-speed-value');
    windSpeedNode.textContent = windSpeed;
}

function renderFutureWeather(dayIndex, dayDate, maxTemp, minTemp, weatherCode, weatherDesc) {
    const dayNode = document.querySelector(`.forecast-weather>div:nth-child(${dayIndex})`);

    const dayNameNode = dayNode.querySelector('.day-name');
    const splittedDay = dayDate.split('-');
    const d = new Date(Number(splittedDay[0]), Number(splittedDay[1]), Number(splittedDay[2]));
    if (d.getDay() === 0) {
        dayNameNode.textContent = 'Sunday';
    } else if (d.getDay() === 1) {
        dayNameNode.textContent = 'Monday';
    } else if (d.getDay() === 2) {
        dayNameNode.textContent = 'Tuesday';
    } else if (d.getDay() === 3) {
        dayNameNode.textContent = 'Wednesday';
    } else if (d.getDay() === 4) {
        dayNameNode.textContent = 'Thursday';
    } else if (d.getDay() === 5) {
        dayNameNode.textContent = 'Friday';
    } else {
        dayNameNode.textContent = 'Saturday';
    }

    const maxTempNode = dayNode.querySelector('.max-temp-value');
    maxTempNode.textContent = maxTemp;

    const minTempNode = dayNode.querySelector('.min-temp-value');
    minTempNode.textContent = minTemp;

    const forecastDayImg = dayNode.querySelector('.forecast-day-img');
    if (weatherCode >= 200 && weatherCode < 300) {
        forecastDayImg.src = './img/thunderstorm.svg'
    } else if (weatherCode >= 300 && weatherCode < 600) {
        forecastDayImg.src = './img/rain.svg'
    } else if (weatherCode >= 600 && weatherCode < 700) {
        forecastDayImg.src = './img/snow.svg'
    } else if (weatherCode >= 700 && weatherCode < 800) {
        forecastDayImg.src = './img/mist.svg'
    } else if (weatherCode === 800) {
        forecastDayImg.src = './img/sun.svg'
    } else { forecastDayImg.src = './img/clouds.svg' }

    const weatherDescriptionNode = dayNode.querySelector('.weather-forecast-description');
    weatherDescriptionNode.textContent = weatherDesc;
}
function changeUnit() {
    const unitNode = document.querySelector('.change-unit');
    const unitSymbol = document.querySelectorAll('.unit-symbol');
    const unitName = document.querySelector('.unit-name');
    if (unitNode.classList.contains('imperial')) {
        unitNode.classList.remove('imperial');
        unitName.textContent = 'Metric';

        const windSpeedUnit = document.querySelector('.wind-speed-unit');
        windSpeedUnit.textContent = 'km/h';
        const windSpeedValue = document.querySelector('.wind-speed-value');
        windSpeedValue.textContent = Math.round(windSpeedValue.textContent * 16.1) / 10


        unitSymbol.forEach((unit) => {
            unit.textContent = '°C';
        })
        const forecastDays = document.querySelectorAll('.forecast-day');
        forecastDays.forEach((day) => {
            const currentValue = day.querySelector('.unit-value').textContent;
            day.querySelector('.unit-value').textContent = Math.round((currentValue - 32) * 5 / 9)
        })
        const currentWeather = document.querySelector('.current-weather');
        currentWeather.querySelectorAll('.unit-value').forEach((value) => {
            const currentValue = value.textContent;
            value.textContent = Math.round(((currentValue - 32) * 5 / 9) * 10) / 10;
        })

    } else {
        unitNode.classList.add('imperial');
        unitName.textContent = 'Imperial';

        const windSpeedUnit = document.querySelector('.wind-speed-unit');
        const windSpeedValue = document.querySelector('.wind-speed-value');
        windSpeedValue.textContent = Math.round(windSpeedValue.textContent * 6.2) / 10

        windSpeedUnit.textContent = 'mph';
        unitSymbol.forEach((unit) => {
            unit.textContent = '°F';
        })
        const forecastDays = document.querySelectorAll('.forecast-day');
        forecastDays.forEach((day) => {
            const currentValue = day.querySelector('.unit-value').textContent;
            day.querySelector('.unit-value').textContent = Math.round((currentValue * 9 / 5) + 32)
        })
        const currentWeather = document.querySelector('.current-weather');
        currentWeather.querySelectorAll('.unit-value').forEach((value) => {
            const currentValue = value.textContent;
            value.textContent = Math.round(((currentValue * 9 / 5) + 32) * 10) / 10;
        })
    }
}
/* 
function pushCities(cities) {
    const cityInputNode = document.querySelector('.city-input');
    const autoSuggestionNode = document.createElement('div');
    autoSuggestionNode.classList.add('auto-city');
    cities.forEach((city) => {
        const cityNode = document.createElement('li');
        cityNode.textContent = city;
        autoSuggestionNode.appendChild(cityNode);
    })
    cityInputNode.appendChild(autoSuggestionNode);
}*/
export {
    renderCurrenyWeather,
    renderFutureWeather,
    changeUnit,
}