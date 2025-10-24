import { fetcher } from "./http.mjs";
import { WEATHER_API_URL, WEATHER_API_KEY } from "./constants.mjs";

const weatherArea = document.getElementById("weather-area");
const weatherResult = document.getElementById("weather-result");

const weatherApiResult = fetcher(
	`${WEATHER_API_URL}?lat=38.53575&lon=68.77905&units=metric&appid=${WEATHER_API_KEY}`
);
console.log('weather-area: ', weatherArea);

weatherApiResult.then((res) => {
	const temp = Math.round(res.main.temp);
	const weatherType = res.weather[0].main;
	const weatherIcon = res.weather?.[0]?.icon;
	const weatherId = res.weather?.[0]?.id;
	let comp = null;
	switch (weatherId) {
		case 800: 
			comp = `<img src="https://openweathermap.org/img/wn/${weatherIcon}.png" /><span id="weather-result">${temp}</span>&#8451;`;
			break;
		case 600:
			comp = `❄️ <span id="weather-result">${temp}</span>&#8451;`;
			break;
		case 500:
			comp = 	`🌧️ <span id="weather-result">${temp}</span>&#8451;`;
			break;
		case 200:
			comp = `🌫️ <span id="weather-result">${temp}</span>&#8451;`;
			break;
		case 802:
			comp = 	 `☁️ <span id="weather-result">${temp}</span>&#8451;`
			break

	}

	if (weatherType === "Rain") {
		weatherArea.innerHTML = `🌧️ <span id="weather-result">${temp}</span>&#8451;`;
	} else if (weatherType === "Clouds") {
		weatherArea.innerHTML = `☁️ <span id="weather-result">${temp}</span>&#8451;`;
	} else if (weatherType === "Mist" || weatherType === "Fog") {
		weatherArea.innerHTML = `🌫️ <span id="weather-result">${temp}</span>&#8451;`;
	} else if (weatherType === "Thunderstorm") {
		weatherArea.innerHTML = `⚡ <span id="weather-result">${temp}</span>&#8451;`;
	} else {
		weatherArea.innerHTML = `🌦️ <span id="weather-result">${temp}</span>&#8451;`;
	}
});


