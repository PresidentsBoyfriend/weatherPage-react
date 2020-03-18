import { API_KEY_OPEN_WEATHER_MAP, API_KEY_WEATHER_BIT } from "../api";

export const weatherMapFetch = async (latitude, longitude) => {
  await fetch(
    `https://api.openweathermap.org/data/2.5/weather?
  lat=${latitude}
  &lon=${longitude}
  &appid=${API_KEY_OPEN_WEATHER_MAP}
  &units=metric`
  )
    .then(response => {
      localStorage.setItem("localOpenWeatherMap", response);
      response.json();
    })
    .then(parsedRes => {
      return parsedRes;
    });
};

export const weatherBitFetch = async (latitude, longitude) => {
  await fetch(
    `https://api.weatherbit.io/v2.0/current?
    &lat=${latitude}
    &lon=${longitude}
    &key=${API_KEY_WEATHER_BIT}`
  )
    .then(response => {
      localStorage.setItem("localWeatherBit", response);
      response.json();
    })
    .then(parsedRes => {
      return parsedRes;
    });
};
