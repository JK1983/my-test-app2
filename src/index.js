function displayData(response) {
  console.log(response);
  let city = response.data.city;
  let temperature = Math.round(response.data.temperature.current);
  let description = response.data.condition.description;
  let humidity = response.data.temperature.humidity;
  let wind = response.data.wind.speed;
  let iconUrl = response.data.condition.icon_url;
  let date = formatDate(response.data.time * 1000);

  let cityElement = document.querySelector("#current-city");
  cityElement.innerHTML = city;
  let temperatureElement = document.querySelector("#current-temperature");
  temperatureElement.innerHTML = temperature;
  let descriptionElement = document.querySelector("#current-description");
  descriptionElement.innerHTML = description;
  let humidityElement = document.querySelector("#current-humidity");
  humidityElement.innerHTML = `${humidity}%`;
  let windElement = document.querySelector("#current-wind");
  windElement.innerHTML = `${wind}km/h`;
  let iconUrlElement = document.querySelector("#current-iconUrl");
  iconUrlElement.setAttribute("src", iconUrl);
  let dateElement = document.querySelector("#current-date");
  dateElement.innerHTML = date;
}

function formatDate(dateTimestamp) {
  let date = new Date(dateTimestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (minutes < 10) minutes = `0${minutes}`;

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thirsday",
    "Friday",
    "Saturday",
  ];

  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  let city = searchInputElement.value;

  let apiKey = "b2a5adcct04b33178913oc335f405433";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayData);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let initCity = "Kyiv";

let apiKey = "b2a5adcct04b33178913oc335f405433";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${initCity}&key=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayData);
