let apiKey = "7257784ffef8033bt527ba3e0e2ba0fo";
const form = document.querySelector("#search-form");
const inputSearch = document.querySelector("#city-input");
const locationBtn = document.querySelector("#current-location-button");
const dateEl = document.querySelector("#date");
const h1 = document.querySelector("h1");
let date = new Date();
let day = date.getDay();
let hour = date.getHours();
let minute = date.getMinutes();
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let city = "";

function getTemperature(response) {
  let data = response.data;
  const tempEl = document.querySelector("#temperature");
  const windEl = document.querySelector("#wind");
  const humidityEl = document.querySelector("#humidity");
  const descrEl = document.querySelector("#description");
  const feelsEl = document.querySelector("#feels");
  const iconEl = document.querySelector("#temp-img");
  city = data.city;
  h1.innerHTML = city;
  tempEl.innerHTML = `${Math.round(data.temperature.current)}`;
  windEl.innerHTML = `${Math.round(data.wind.speed)}`;
  humidityEl.innerHTML = `${Math.round(data.temperature.humidity)}`;
  descrEl.innerHTML = `${data.condition.description}`;
  feelsEl.innerHTML = `${Math.round(data.temperature.feels_like)}`;
  iconEl.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${data.condition.icon}.png`
  );
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fry", "Sat"];
  return days[day];
}

function getTempForecast(response) {
  let daysforecast = response.data.daily;
  const forecastEl = document.querySelector("#forecast");
  let forecast = "";

  daysforecast.forEach((day, index) => {
    if (index < 6) {
      forecast += ` 
      <li class="forecast-item col-2 d-flex flex-column align-items-center">
      <span class="forecast-day">${formatDay(day.time)}</span>
      <img class="forecast-img"
         src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
           day.condition.icon
         }.png" alt="Sky icon">
      <div class="temp-inner">
         <span class="temp-max" id="temp-max">${Math.round(
           day.temperature.maximum
         )}</span>
         <span class="units">°</span>
         <span class="temp-min" id="temp-min">${Math.round(
           day.temperature.minimum
         )}</span>
         <span class="units">°</span>
      </div>
      </li>`;
    }
  });

  forecastEl.innerHTML = forecast;
}

function getSearchValue(e) {
  e.preventDefault();
  city = inputSearch.value;
  if (!inputSearch.value) {
    city = "Kyiv";
  }
  inputSearch.value = "";

  let urlCity = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(urlCity).then(getTemperature);
  let urlforecast = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;
  axios.get(urlforecast).then(getTempForecast);
}

function enterDay(day, hour) {
  day = days[day];
  if (minute < 10) {
    minute = `0${minute}`;
  }

  dateEl.innerHTML = `${day} ${hour}:${minute}`;
}
document.addEventListener("DOMContentLoaded", getSearchValue);
enterDay(day, hour);
form.addEventListener("submit", getSearchValue);
