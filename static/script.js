const inputCity = document.querySelector("#input_city");

const info1 = document.getElementById("info1");
const info2 = document.getElementById("info2");
const info3 = document.getElementById("info3");

const toggleInput = document.querySelector(".toggle-input");
const toggleLabel = document.querySelector(".toggle-label");
let btn = document.querySelector("#fetchBtn");

let hidB = document.getElementById("hidden");

let i = 0;
let dataObj;
let todayTemp, tomorTemp, nextTemp;

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
  if (nextTemp) {
    nextTemp.updateTemperature();
  }
});

async function fetchWeather() {
  let input_user = inputCity.value;
  let apiKey = "8e715392ca450df5ba4cdaa47bd9978e";
  let apiData = `https://api.openweathermap.org/data/2.5/forecast?q=${input_user}&appid=${apiKey}`;

  try {
    const responseData = await fetch(apiData);
    if (!responseData.ok) {
      console.log("Data invalid");
      return;
    }
    dataObj = await responseData.json();
    updateWeatherData();
    fetchIcon();
    hidB.style.display = "block";
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

async function fetchIcon() {
  if (!dataObj || !dataObj.list) {
    console.log("Invalid dataObj structure");
    return;
  }
  const dataIcon = dataObj.list[0].weather[0].icon;
  const apiIcon = `https://openweathermap.org/img/wn/${dataIcon}@2x.png`;

  try {
    const responseIcon = await fetch(apiIcon);
    if (!responseIcon.ok) {
      console.log("Icon Invalid");
      return;
    }
    const iconBlob = await responseIcon.blob();
    const iconURL = URL.createObjectURL(iconBlob);

    addingIcon(iconURL);
  } catch (error) {
    console.error("Error fetching icon:", error);
  }
}

function addingIcon(iconURL) {

  const iconIMG = document.createElement("img");
  iconIMG.src = iconURL;

  const firstDiv = document.getElementById("firsth1");
  firstDiv.innerHTML = " ";

  const iconDiv = document.getElementById("icon-div");
  iconDiv.innerHTML = " ";
  iconDiv.appendChild(iconIMG);
}


function updateWeatherData() {
  // Check if the current index is within the data range
      // Create new elements and append them to the head-info container
      
      const dataCity = dataObj.city.name;
      const dataCountry = dataObj.city.country;

      let elementCity = document.createElement("h2");
      const city = dataCity;
      elementCity.textContent = `State/City: ${city}`;

      const headInfo = document.getElementById("right")
      headInfo.innerHTML = " ";
      headInfo.appendChild(elementCity);
  
      let elementCountry = document.createElement("h2");
      const country = dataCountry;
      elementCountry.textContent = `Country: ${country}`;
      headInfo.appendChild(elementCountry);

  for (let i = 0; i < 3; i++) {
    let j = i * 8;
    const dataTime = dataObj.list[j].dt;
    const dataTemp = dataObj.list[j].main.temp;
    
    // Create a new infoWeather object based on the current index
    if (i === 0) {
      todayTemp = new infoWeather(dataTime, dataTemp);
      todayTemp.showWeather(info1); // Pass the info1 element as an argument
    } else if (i === 1) {
      tomorTemp = new infoWeather(dataTime, dataTemp);
      tomorTemp.showWeather(info2); // Pass the info2 element as an argument
    } else if (i === 2) {
      nextTemp = new infoWeather(dataTime, dataTemp);
      nextTemp.showWeather(info3); // Pass the info3 element as an argument
    }
  }
}


class infoWeather {
  constructor(dataTime, dataTemp) {
    this.dataTime = dataTime;
    this.dataTemp = dataTemp;
  }

  showWeather(container) {
    // Clear previous data
    container.innerHTML = "";

    let elementDate = document.createElement("p");
    const date = convertTime(this.dataTime);
      if (container === info1){
        elementDate.textContent = `Today date: ${date}`;
      } else{
        elementDate.textContent = `Date: ${date}`;
      }
    container.appendChild(elementDate);

    let elementTemp = document.createElement("p");
    container.appendChild(elementTemp);

    this.container = container; // Store the container reference in the object
    this.updateTemperature(); // Call updateTemperature without arguments
  }

  updateTemperature() {
    const temperaturePara = this.container.querySelector("p:nth-child(2)");
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

