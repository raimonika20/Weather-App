import { City } from "country-state-city";
export const STATES = ["RJ", "MH", "GJ", "MP", "UP"];

export const weatherAPIBase =
  "https://api.openweathermap.org/data/2.5/weather?q=";
export const cityAPIBase =
  "https://api.bigdatacloud.net/data/reverse-geocode-client";
export const apiKey = "ae6992475e03f32c2e010eaa1f9b4250";

export function getCurrentPositionPromise(options) {
  return new Promise((resolve, reject) =>
    navigator.geolocation.getCurrentPosition(resolve, reject, options),
  );
}

export function getImagePath(weather) {
  const weatherTypeImageMap = {
    Clouds:
      "https://cdn.pixabay.com/photo/2013/04/01/09/22/clouds-98536_960_720.png",
    Clear:
      "https://cdn.icon-icons.com/icons2/2505/PNG/512/sunny_weather_icon_150663.png",
    Rain: "https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather07-1024.png",
    Drizzle:
      "https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather10-1024.png",
  };
  if (weatherTypeImageMap[weather] === undefined) {
    return weatherTypeImageMap["Clear"];
  }
  return weatherTypeImageMap[weather];
}

export function getCityNameOptions() {
  const cities = STATES.map((state) =>
    City.getCitiesOfState("IN", state),
  ).flat();
  return cities.map((city) => ({
    value: city.name,
    label: city.name,
  }));
}
