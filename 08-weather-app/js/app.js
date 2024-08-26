// DOM ELEMENTLERİ
const cityInputEl = document.querySelector(".inputText");
const buttonEl = document.querySelector(".btn");
const tempEl = document.querySelector(".temp");
const feltWarmthEl = document.getElementById("felt-warmth");
const cityEl = document.querySelector(".city");
const weatherValueEl = document.getElementById("weatherValue");

const getWeatherData = async (cityName) => {
  const API_KEY = "d4f6553ddfaa0835b27731301d103e5f";
  const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`;

  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    // console.log(data);

    if(!response){
        throw new Error;
    }

    // return data;

    // HTML'de display
    cityEl.textContent = `${data.name} / ${data.sys.country}`;
    tempEl.textContent = `${data.main.temp}`;
    weatherValueEl.textContent = data.weather[0].description;
    feltWarmthEl.textContent = `Feels like ${data.main.feels_like}`;

  } catch (error) {
    console.log(error);
  }


};

// getWeatherData("istanbul");

buttonEl.addEventListener("click", () => {

    let city = cityInputEl.value.trim();
    
    if(!city){
        cityInputEl.focus();
        alert("Please enter a city name!");
    } else{
        getWeatherData(city);
    }

});
