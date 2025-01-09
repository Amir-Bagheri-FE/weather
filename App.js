const weatherType = document.getElementById("type");
const form = document.querySelector("form");
let city = document.querySelector("#city");
const cityResult = document.getElementById("city-result");
let APIkey = "4ceb823a82f9f68606df92af5b318129";//put an active API key
const weatherIcon = document.getElementById("weatherIcon");
let feels = document.getElementById("feels");
let humidity = document.getElementById("humidity");
let wind = document.getElementById("wind");
let minWeather=document.querySelector('#min-weather')
let maxWeather=document.querySelector('#max-weather')
let temp=document.querySelector('#temp')
const sunriseText=document.getElementById('Sunrise')
const sunsetText=document.getElementById('Sunset')

//tomorrow weather 
let tomorrowBtn=document.getElementById('tomorrow');
tomorrowBtn.disabled=true
tomorrowBtn.style.cursor='not-allowed';
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
    
    //using data in app
    cityResult.textContent = data.name;
    weatherType.textContent = data.weather[0].description;
    weatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    temp.textContent=data.main.temp+'°'+'c'
    feels.textContent = data.main.feels_like+'°'+'c'
    maxWeather.textContent=data.main.temp_max
    minWeather.textContent=data.main.temp_min
    humidity.textContent = data.main.humidity + "%";
    wind.textContent = data.wind.speed + "KM/H";
    tomorrowBtn.disabled=false;
    tomorrowBtn.style.cursor='';
    //sunset and sunrise
    let SunRiseTime=new Date(data.sys.sunrise*1000)
    const SunRise=SunRiseTime.toLocaleString().slice(9,14)
    sunriseText.textContent=SunRise+'AM'
    let SunSetTime=new Date(data.sys.sunset*1000)
    const SunSet=SunSetTime.toLocaleString().slice(9,14)
    sunsetText.textContent=SunSet+'PM'
  } catch (error) {
    alert(error);
  }
}
 tomorrowBtn.addEventListener('click',tomorrowWeather)
 async function tomorrowWeather() {
  try {
    let cityName=city.value
    let responseData2= await fetch(
      `http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${APIkey}&units=metric`
      ).then(tomorrowBtn.disabled=true,
        tomorrowBtn.style.cursor='not-allowed'
      )
      const data2 =await responseData2.json();
    //tomorrow data in app 
      let headList=data2.list[4]
    cityResult.textContent = data2.city.name+':'+headList.dt_txt.slice(0,10)
    weatherType.textContent=headList.weather[0].description
    weatherIcon.src = `http://openweathermap.org/img/wn/${headList.weather[0].icon}@2x.png`;
    temp.textContent=headList.main.temp+'°'+'c'
    feels.textContent = headList.main.feels_like+'°'+'c'
    maxWeather.textContent=headList.main.temp_max
    minWeather.textContent=headList.main.temp_min
    humidity.textContent = headList.main.humidity + "%";
    wind.textContent =headList.wind.speed + "KM/H";
  } catch (error) {
    alert(error)
  }
 }