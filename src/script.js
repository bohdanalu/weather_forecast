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
let days = [
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
  console.log(response.data);
  const tempEl = document.querySelector("#temperature");
  const windEl = document.querySelector("#wind");
  const humidityEl = document.querySelector("#humidity");
  const descrEl = document.querySelector("#description");
  const feelsEl = document.querySelector("#feels");
  city = response.data.city;
  h1.innerHTML = city;
  tempEl.innerHTML = `${Math.round(response.data.temperature.current)}`;
  windEl.innerHTML = `${Math.round(response.data.wind.speed)}`;
  humidityEl.innerHTML = `${Math.round(response.data.temperature.humidity)}`;
  descrEl.innerHTML = `${response.data.condition.description}`;
  feelsEl.innerHTML = `${Math.round(response.data.temperature.feels_like)}`;
}

function getSearchValue(e) {
  e.preventDefault();
  city = inputSearch.value;
  inputSearch.value = "";

  let urlCity = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(urlCity).then(getTemperature);
}

function enterDay(day, hour) {
  day = days[day];
  if (minute < 10) {
    minute = `0${minute}`;
  }

  dateEl.innerHTML = `${day} ${hour}:${minute}`;
}

enterDay(day, hour);
form.addEventListener("submit", getSearchValue);
