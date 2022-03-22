function currentDate() {
  let date = now.getDate();
  let huors = now.getHours();
  let minutes = now.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
  ];
  let month = months[now.getMonth()];
  if (huors < 10) {
    huors = `0${huors}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day},${month}${date},   ${huors}:${minutes}`;
}
let now = new Date();
let calender = document.querySelector("#time");
calender.innerHTML = currentDate();

function changeCity(event) {
  event.preventDefault();
  let city = document.querySelector("#location-input").value;
  let key = "a981cf77c50fb98eccea448fb49fed9a";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${key}`;
  axios.get(url).then(showTemprature);
  console.log(url);
}
let locationForm = document.querySelector("#location-form");
locationForm.addEventListener("submit", changeCity);

function showTemprature(response) {
  celsiusTemp = response.data.main.temp;
  celsiusTempHigh = response.data.main.temp_max;
  celsiusTempLow = response.data.main.temp_min;
  document.querySelector(
    "#city"
  ).innerHTML = `${response.data.name},${response.data.sys.country}`;
  document.querySelector("#temp").innerHTML = `${Math.round(
    response.data.main.temp
  )}`;
  document.querySelector("#high").innerHTML = `${Math.round(
    response.data.main.temp_max
  )}°C`;
  document.querySelector("#low").innerHTML = `${Math.round(
    response.data.main.temp_min
  )}°C`;
  document.querySelector("#wind").innerHTML = `${Math.round(
    response.data.wind.speed
  )}mph`;
  document.querySelector(
    "#humidity"
  ).innerHTML = `${response.data.main.humidity}%`;
  document.querySelector("#state").innerHTML =
    response.data.weather[0].description;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}
function showFahrenheitTemp(event) {
  event.preventDefault();
  let tempratureElement = document.querySelector("#temp");

  let fahrenheitTemprature = (celsiusTemp * 9) / 5 + 32;
  tempratureElement.innerHTML = Math.round(fahrenheitTemprature);
  document.querySelector("#high").innerHTML = `${Math.round(
    (celsiusTempHigh * 9) / 5 + 32
  )}°F`;
  document.querySelector("#low").innerHTML = `${Math.round(
    (celsiusTempLow * 9) / 5 + 32
  )}°F`;
}
let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", showFahrenheitTemp);

let celsiusTemp = null;
let celsiusTempHigh = null;
let celsiusTempLow = null;
