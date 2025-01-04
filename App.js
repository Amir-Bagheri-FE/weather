const weatherType = document.getElementById("type");
const form = document.querySelector("form");
let city = document.querySelector("#city");
const cityResult = document.getElementById("city-result");
let APIkey = "4ceb823a82f9f68606df92af5b318129";
const weatherIcon = document.getElementById("weatherIcon");
let feels = document.getElementById("feels");
let humidity = document.getElementById("humidity");
let wind = document.getElementById("wind");

//changes on selected city
form.addEventListener("submit", (event) => {
  event.preventDefault();
  getweatherData(city.value);
});
async function getweatherData(city) {
  try {
    //getting data from API
    let responseData = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}&units=metric`
    );
    const data = await responseData.json();
    console.log(data);
    //using data in app
    city.value = "";
    cityResult.textContent = data.name;
    weatherType.textContent = data.weather[0].description;
    weatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    feels.textContent = data.main.feels_like;
    humidity.textContent = data.main.humidity + "%";
    wind.textContent = data.wind.speed + "KM/H";
  } catch (error) {
    alert(error);
  }
}
