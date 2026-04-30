const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search-btn");
const statusEl = document.querySelector("#status");
const weatherResult = document.querySelector("#weather-result");

const API_KEY = "f8735f9dcbe3d0fee48bb61828dd360c"; 
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

async function fetchWeather(city) {
  const url = `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`;
  const response = await fetch(url);
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("City not found. Please check the spelling.");
    } else {
      throw new Error("An error occurred while fetching weather data.");
    }
  }
  return response.json();
}

function renderWeather(data) {
  const iconCode = data.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
  
  weatherResult.innerHTML = `
    <h2>${data.name}, ${data.sys.country}</h2>
    <img class="weather-icon" src="${iconUrl}" alt="${data.weather[0].description}" />
    <p class="temp">${Math.round(data.main.temp)}°C</p>
    <p class="condition">${data.weather[0].description}</p>
    <div class="details">
      <p>Feels like: ${Math.round(data.main.feels_like)}°C</p>
      <p>Humidity: ${data.main.humidity}%</p>
    </div>
  `;
  weatherResult.classList.add("active");
}

searchBtn.addEventListener("click", async () => {
  const city = cityInput.value.trim();
  if (!city) {
    statusEl.textContent = "Please enter a city name.";
    weatherResult.classList.remove("active");
    return;
  }

  statusEl.style.color = "#fff";
  statusEl.textContent = "Loading weather data...";
  weatherResult.classList.remove("active");

  try {
    const data = await fetchWeather(city);
    statusEl.textContent = ""; 
    renderWeather(data);
  } catch (error) {
    
    statusEl.style.color = "#ff9a9e";
    statusEl.textContent = error.message;
    weatherResult.classList.remove("active");
  }
});

cityInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    searchBtn.click();
  }
});