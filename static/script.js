let btn = document.querySelector("#fetchBtn");
const weatherInfoContainer = document.querySelector("#weatherInfoContainer");
let next_btn = document.querySelector("#next_btn");
let prev_btn = document.querySelector("#prev_btn");
let hidB = document.getElementById("hidden");
const toggleInput = document.querySelector(".toggle-input");
const toggleLabel = document.querySelector(".toggle-label");
const inputCity = document.querySelector("#input_city");
let i = 0;
let dataObj;
let todayTemp, tomorTemp, yesTemp;

inputCity.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    fetchWeather();
  }
});

btn.addEventListener("click", function() {
  let valid = inputCity.value.trim();
  if (valid === "") {
    alert("Do not leave blank");
    return false;
  }
  fetchWeather();
});

toggleInput.addEventListener("change", function() {
  if (todayTemp) {
    todayTemp.updateTemperature();
  }
  if (tomorTemp) {
    tomorTemp.updateTemperature();
  }
  if (yesTemp) {
    yesTemp.updateTemperature();
  }
});

next_btn.addEventListener("click", function() {
  i += 4;
  if (dataObj) {
    updateWeatherData();
  }
});

prev_btn.addEventListener("click", function() {
  i -= 4;
  if (dataObj) {
    updateWeatherData();
  }
});

async function fetchWeather() {
  let input_user = inputCity.value;
  let apiKey = "8e715392ca450df5ba4cdaa47bd9978e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${input_user}&appid=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      console.log("data invalid");
      return;
    }
    dataObj = await response.json(); // Assign the fetched data to the global 'dataObj' variable
    updateWeatherData();

    hidB.style.display = "block";
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function updateWeatherData() {
  // Check if the current index is within the data range
  if (i >= 0 && i < dataObj.list.length) {
    const dataCity = dataObj.city.name;
    const dataCountry = dataObj.city.country;
    const dataTime = dataObj.list[i].dt;
    const dataTemp = dataObj.list[i].main.temp;

    // Create a new infoWeather object based on the current index
    todayTemp = new infoWeather(dataCity, dataCountry, dataTime, dataTemp);
    todayTemp.showWeather();
  }
}

class infoWeather {
  constructor(dataCity, dataCountry, dataTime, dataTemp) {
    this.dataCity = dataCity;
    this.dataCountry = dataCountry;
    this.dataTime = dataTime;
    this.dataTemp = dataTemp;
  }

  showWeather() {
    // Clear previous data
    weatherInfoContainer.innerHTML = "";

    // Create new elements and append them to the container
    let elementCity = document.createElement("h2");
    const city = this.dataCity;
    elementCity.textContent = `State/City: ${city}`;
    weatherInfoContainer.appendChild(elementCity);

    let elementCountry = document.createElement("h2");
    const country = this.dataCountry;
    elementCountry.textContent = `Country: ${country}`;
    weatherInfoContainer.appendChild(elementCountry);

    let elementDate = document.createElement("p");
    const date = convertTime(this.dataTime);
    elementDate.textContent = `Today date: ${date}`;
    weatherInfoContainer.appendChild(elementDate);

    let elementTemp = document.createElement("p");
    weatherInfoContainer.appendChild(elementTemp);

    this.updateTemperature(); // Call updateTemperature method after showing weather
  }

  updateTemperature() {
    const temperaturePara = document.querySelector("#weatherInfoContainer p:nth-child(4)");
    const tempdata = this.dataTemp;
    const temperature = toggleInput.checked ? celsius(tempdata) : fahrenheit(tempdata);
    temperaturePara.textContent = `Temperature: ${temperature.toFixed(2)} ${toggleInput.checked ? '°C' : '°F'}`;
  }
}

function celsius(tempdata) {
  return tempdata - 273.15;
}

function fahrenheit(tempdata) {
  return (tempdata - 273.15) * (9 / 5) + 32;
}

function convertTime(timestamp) {
  const date = new Date(timestamp * 1000);
  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric"
  };
  return date.toLocaleString("en-US", options);
}
