import { fetcher } from "./http.js";
import { WEATHER_API_URL, WEATHER_API_KEY } from "./constants.js";

const weatherResult = document.getElementById("weather-result");
const weatherApiResult = fetcher(
    `${WEATHER_API_URL}?lat=38.53575&lon=68.77905&units=metric&appid=${WEATHER_API_KEY}`
);

weatherApiResult.then((res) => {
    const temp = Math.round(res.main.temp);
    weatherResult.textContent = temp;
});
