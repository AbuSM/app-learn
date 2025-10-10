import { fetcher } from "./http.mjs";
import { WEATHER_API_URL, WEATHER_API_KEY } from "./constants.mjs";

const weatherArea = document.getElementById("weather-area");
const weatherResult = document.getElementById("weather-result");

const weatherApiResult = fetcher(
  `${WEATHER_API_URL}?lat=38.53575&lon=68.77905&units=metric&appid=${WEATHER_API_KEY}`
);

weatherApiResult.then((res) => {
  const temp = Math.round(res.main.temp);
  const weatherType = res.weather[0].main;

  if (weatherType === "Rain") {
    weatherArea.innerHTML = `🌧️ <span id="weather-result">${temp}</span>&#8451;`;
  }
  else if (weatherType === "Clouds") {
    weatherArea.innerHTML = `☁️ <span id="weather-result">${temp}</span>&#8451;`;
  }
  else if (weatherType === "Snow") {
    weatherArea.innerHTML = `❄️ <span id="weather-result">${temp}</span>&#8451;`;
  }
  else if (weatherType === "Clear") {
    weatherArea.innerHTML = `☀️ <span id="weather-result">${temp}</span>&#8451;`;
  }
  else if (weatherType === "Mist" || weatherType === "Fog") {
    weatherArea.innerHTML = `🌫️ <span id="weather-result">${temp}</span>&#8451;`;
  }
  else if (weatherType === "Thunderstorm") {
    weatherArea.innerHTML = `⚡ <span id="weather-result">${temp}</span>&#8451;`;
  }
  else {
    weatherArea.innerHTML = `🌦️ <span id="weather-result">${temp}</span>&#8451;`;
  }
});
