let btn = document.querySelector("#fetchBtn");
const weatherInfoContainer = document.querySelector("#weatherInfoContainer");
let next_btn = document.querySelector("#next_btn");
let prev_btn = document.querySelector("#prev_btn");
let hidB = document.getElementById("hidden");
const toggleInput = document.querySelector(".toggle-input");
const toggleLabel = document.querySelector(".toggle-label");
const inputCity = document.querySelector("#input_city");
let data; // Declare the 'data' variable globally

inputCity.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    fetchWeather();
  }
});

btn.addEventListener("click", function() {
  let valid = inputCity.value;
  if (valid === "") {
    alert("Do not leave blank");
    return false;
  }
  fetchWeather();
});

toggleInput.addEventListener("change", function() {
  updateTemperature(); // No need to pass 'data' as a parameter
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
    data = await response.json(); // Assign the fetched data to the global 'data' variable
    showWeather(data);
    hidB.style.display = "block";
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function showWeather(data) {
  // Clear previous data
  weatherInfoContainer.innerHTML = "";

  // Create new elements and append them to the container
  let elementCity = document.createElement("h2");
  const city = data.city.name;
  elementCity.textContent = `State/City: ${city}`;
  weatherInfoContainer.appendChild(elementCity);

  let elementCountry = document.createElement("h2");
  const country = data.city.country;
  elementCountry.textContent = `Country: ${country}`;
  weatherInfoContainer.appendChild(elementCountry);

  let element1 = document.createElement("p");
  const date = convertTime(data.list[0].dt);
  element1.textContent = `Today date: ${date}`;
  weatherInfoContainer.appendChild(element1);

  let element2 = document.createElement("p");
  const tempdata = data.list[0].main.temp;
  const temperature = toggleInput.checked ? celsius(tempdata) : fahrenheit(tempdata);
  element2.textContent = `Temperature: ${temperature.toFixed(2)} ${toggleInput.checked ? '°C' : '°F'}`;
  weatherInfoContainer.appendChild(element2);
}

function updateTemperature() {
  const temperaturePara = document.querySelector("#weatherInfoContainer p:nth-child(4)");
  const tempdata = data.list[0].main.temp;
  const temperature = toggleInput.checked ? celsius(tempdata) : fahrenheit(tempdata);
  temperaturePara.textContent = `Temperature: ${temperature.toFixed(2)} ${toggleInput.checked ? '°C' : '°F'}`;
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
