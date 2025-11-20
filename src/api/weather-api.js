import { fetcher } from "../http.js";
import { WEATHER_API_URL, WEATHER_API_KEY } from "../constants.js";

const waitForWeatherElements = () => {
	return new Promise((resolve) => {
		const checkElements = () => {
			const weatherArea = document.getElementById("weather-area");
			const weatherSpinner = document.getElementById("weather-spinner");
			const weatherResult = document.getElementById("weather-result");

			if (weatherArea && weatherSpinner && weatherResult) {
				resolve({ weatherArea, weatherSpinner, weatherResult });
			} else {
				setTimeout(checkElements, 100);
			}
		};
		checkElements();
	});
};

const getWeatherEmoji = (weatherType) => {
	switch(weatherType) {
		case "Rain":
			return "🌧️";
		case "Clouds":
			return "☁️";
		case "Snow":
			return "❄️";
		case "Clear":
			return "☀️";
		case "Mist":
		case "Fog":
			return "🌫️";
		case "Thunderstorm":
			return "⚡";
		default:
			return "🌦️";
	}
};

waitForWeatherElements().then(({ weatherArea, weatherSpinner, weatherResult }) => {
	const weatherApiResult = fetcher(
		`${WEATHER_API_URL}?lat=38.53575&lon=68.77905&units=metric&appid=${WEATHER_API_KEY}`
	);

	weatherApiResult.then((res) => {
		const temp = Math.round(res.main.temp);
		const weatherType = res.weather[0].main;
		const emoji = getWeatherEmoji(weatherType);

		weatherSpinner.style.display = "none";
		weatherResult.textContent = `${emoji} ${temp}℃`;
	}).catch(() => {
		weatherSpinner.style.display = "none";
		weatherResult.textContent = "N/A";
	});
});
