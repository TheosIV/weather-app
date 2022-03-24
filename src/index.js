import { changeUnit } from "./dom-manip";
import { changeWeather } from "./api-func";
const searchButton = document.querySelector('button');
const cityInput = document.querySelector('.city-name');
searchButton.addEventListener('click', () => {
	changeWeather()
});
cityInput.addEventListener('keyup', (e) => {
	if (e.keyCode === 13) {
		changeWeather();
	}
})
const unitChange = document.querySelector('.change-unit');
unitChange.addEventListener('click', changeUnit)
function init() {
	changeWeather('Tel aviv');
}
init()
