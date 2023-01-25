let apiKey = "ca7fbad26013d3ec86767b6a85456620";
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
  const tempEl = document.querySelector("#temperature");
  const windEl = document.querySelector("#wind");
  const humidityEl = document.querySelector("#humidity");
  city = response.data.name;
  h1.innerHTML = city;
  tempEl.innerHTML = `${Math.round(response.data.main.temp)}`;
  windEl.innerHTML = `${Math.round(response.data.wind.speed)}`;
  humidityEl.innerHTML = `${Math.round(response.data.main.humidity)}`;
}

function getSearchValue(e) {
  e.preventDefault();
  city = inputSearch.value;
  inputSearch.value = "";
  let urlCity = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(urlCity).then(getTemperature);
}

function getLocation(e) {
  e.preventDefault();
  function getCurentLocation(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let urlPos = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    axios.get(urlPos).then(getTemperature);
  }
  navigator.geolocation.getCurrentPosition(getCurentLocation);
}

function enterDay(day, hour) {
  day = days[day];
  if (minute < 10) {
    minute = `0${minute}`;
  }

  dateEl.innerHTML = `${day} ${hour}.${minute}`;
}

enterDay(day, hour);
form.addEventListener("submit", getSearchValue);
locationBtn.addEventListener("click", getLocation);
