import {
    renderCurrenyWeather,
    renderFutureWeather,
    changeUnit,
} from "./dom-manip";
async function changeWeather(initCity = '') {
    const inputCityName = initCity || document.querySelector('.city-name').value;
    if (inputCityName == '') { return }
    const weatherApiData = await getApiData(inputCityName.trim());
    const errorNode = document.querySelector('.error-block');
    errorNode.classList.add('hidden');
    if (Number(weatherApiData.cod) !== 200) {
        errorNode.classList.remove('hidden');
        return
    }

    function getCityName() {
        return weatherApiData.city.name + ', ' + weatherApiData.city.country;
    }
    function getWeatherCode() {
        return weatherApiData.list[0].weather[0].id;
    }
    function getWeatherDescription() {
        return weatherApiData.list[0].weather[0].description;
    }
    function getCurrentTemp() {
        const tempNowKelvin = weatherApiData.list[0].main.temp;
        const tempNowCelsius = Math.round((Number(tempNowKelvin) - 273.15) * 10) / 10;
        return tempNowCelsius;
    }
    function getCurrentFeelsTemp() {
        const tempFeelsNowKelvin = weatherApiData.list[0].main.feels_like;
        const tempFeelsNowCelsius = Math.round((Number(tempFeelsNowKelvin) - 273.15) * 10) / 10;
        return tempFeelsNowCelsius;
    }
    function getChanceOfRain() {
        return weatherApiData.list[0].pop * 100;
    }
    function getHumidity() {
        return weatherApiData.list[0].main.humidity;
    }
    function getWindSpeed() {
        const windSpeedNowMeterPerSecond = weatherApiData.list[0].wind.speed;
        const windSpeedNowKPH = Math.round((Number(windSpeedNowMeterPerSecond) * 3.6) * 10) / 10;
        return windSpeedNowKPH;
    }

    const cityName = getCityName();
    const weatherCode = getWeatherCode();
    const weatherDesc = getWeatherDescription();
    const tempValue = getCurrentTemp();
    const windSpeed = getWindSpeed();
    const feelsTempValue = getCurrentFeelsTemp();
    const rainChance = getChanceOfRain();
    const humidityPerc = getHumidity();

    renderCurrenyWeather(weatherCode,
        cityName,
        weatherDesc,
        tempValue,
        feelsTempValue,
        rainChance,
        humidityPerc,
        windSpeed,
    )
    // sorts the data by day
    const sortedData = weatherApiData.list.reduce((total, next) => {
        total[next.dt_txt.split(' ')[0]] = total[next.dt_txt.split(' ')[0]] || [];
        total[next.dt_txt.split(' ')[0]].push(next);
        return total;
    }, {})
    // sorts the data by temp
    for (const day in sortedData) {
        sortedData[day].sort((a, b) => (a.main.temp - b.main.temp))
    }
    for (const day in sortedData) {
        const sortedDataKeys = Object.keys(sortedData);
        const dayIndex = sortedDataKeys.indexOf(day) + 1;

        const minTemp = Math.round(sortedData[day][0].main.temp - 273.15);
        const maxTemp = Math.round(sortedData[day][sortedData[day].length - 1].main.temp - 273.15);
        const weatherCode = sortedData[day][0].weather[0].id;
        const weatherDesc = sortedData[day][0].weather[0].description;
        renderFutureWeather(dayIndex,
            day,
            maxTemp,
            minTemp,
            weatherCode,
            weatherDesc,
        )
    }

    const unitChangeNode = document.querySelector('.change-unit');
    if (unitChangeNode.classList.contains('imperial')) {
        unitChangeNode.classList.remove('imperial');
        changeUnit()
    }
}

const apiData = (function apiData() {
    const cityName = document.querySelector('.city-name').value;
    let weatherApiData;

    function setApiData() {
        const ApiData = getApiData(cityName);
        ApiData.then((apiData) => {
            weatherApiData = apiData
        }).catch((error) => {
            console.log(error);
        })
    }


    function getCityName() {

        return weatherApiData.city.name + ', ' + weatherApiData.city.country;
    }
    function getWeatherCode() {
        return weatherApiData.list[0].weather[0].id;
    }
    function getWeatherDescription() {
        return weatherApiData.list[0].weather[0].description;
    }
    function getCurrentTemp() {
        const tempNowKelvin = weatherApiData.list[0].main.temp;
        const tempNowCelsius = Math.round((Number(tempNowKelvin) - 273.15) * 10) / 10;
        return tempNowCelsius;
    }
    function getCurrentFeelsTemp() {
        const tempFeelsNowKelvin = weatherApiData.list[0].main.feels_like;
        const tempFeelsNowCelsius = Math.round((Number(tempFeelsNowKelvin) - 273.15) * 10) / 10;
        return tempFeelsNowCelsius;
    }
    function getChanceOfRain() {
        return weatherApiData.list[0].pop * 100;
    }
    function getHumidity() {
        return weatherApiData.list[0].main.humidity;
    }
    function getWindSpeed() {
        const windSpeedNowMeterPerSecond = weatherApiData.list[0].wind.speed;
        const windSpeedNowKPH = Math.round((Number(windSpeedNowMeterPerSecond) * 3.6) * 10) / 10;
        return windSpeedNowKPH;
    }
    return {
        setApiData,
        getCityName,
        getWeatherCode,
        getWeatherDescription,
        getCurrentTemp,
        getCurrentFeelsTemp,
        getChanceOfRain,
        getHumidity,
        getWindSpeed,
    }
}())

async function getApiData(cityName) {
    try {
        const url = 'api.openweathermap.org';
        const response = await fetch(`https://${url}/data/2.5/forecast?q=${cityName}&APPID=9dbacf94042384bcf9011370349c98d3`);
        const weatherData = await response.json();
        return weatherData;
    } catch (error) {
        console.log('getApiData catch');
        console.log(error);
    }
}

// async function getCityList() {
//     const cityUrl = 'https://raw.githubusercontent.com/lutangar/cities.json/master/cities.json'
//     const request = await fetch(cityUrl);
//     const data = await request.json()
//     const countries = [];
//     data.forEach(cityData => {
//         countries.push(cityData.name);
//     });
//     pushCities(countries);
// }
export {
    apiData,
    changeWeather,
}