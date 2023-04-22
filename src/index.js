const api_key = "5717bd65a240df95236c9074f5d570a9";

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getWeatherData);
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}

function getWeatherData(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`;
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const temperature = data.main.temp;
        const description = data.weather[0].description;
        const icon = data.weather[0].icon;
        const city = data.name;
  
        // Update UI with current city and weather data
        document.querySelector(".location").textContent = city;
        updateUI(temperature, description, icon, data);
      })
      .catch(error => console.log(error));
  }
  

function getWeatherByCity() {
    const city = document.querySelector("#city-input").value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`;
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.main) {
          const temperature = data.main.temp;
          const description = data.weather[0].description;
          const icon = data.weather[0].icon;
  
          updateUI(temperature, description, icon, data);
        } else {
          console.log("Error: Could not retrieve weather data for the specified city.");
        }
      })
      .catch(error => console.log(error));
  }
  
  function updateUI(temperature, description, icon, data) {
    const iconUrl = `https://openweathermap.org/img/w/${icon}.png`;
  
    const locationElement = document.querySelector(".location");
    if (locationElement) {
      locationElement.textContent = data.name;
    }
    
    const temperatureElement = document.querySelector(".temperature");
    if (temperatureElement) {
      temperatureElement.textContent = `${temperature}°C`;
    }
  }
  
  
document.querySelector("button").addEventListener("click", () => {
  const city = document.querySelector("input").value;
  getWeatherByCity(city);
 
});

    getLocation();
