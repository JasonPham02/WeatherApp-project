const inputCity = document.querySelector("#input_city");
const info1 = document.getElementById("info1");
const info2 = document.getElementById("info2");
const info3 = document.getElementById("info3");
const toggleInput = document.querySelector(".toggle-input");
const toggleLabel = document.querySelector(".toggle-label");
let btn = document.querySelector("#fetchBtn");
let hidB = document.getElementById("hidden");
const slideGuides = document.getElementsByClassName("slide_guide");


let i = 0;
let dataObj;
let todayTemp, tomorTemp, nextTemp;

//GET VALUE FROM THE USER
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

//BUTTON CONVERT UNIT
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

//RECIEVE DATA AND DEFINE dataObj.
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
    console.log(dataObj);
    updateWeatherData();
    fetchIcon();
    hidB.style.display = "block";

    const slideGuideElement = document.getElementsByClassName("slide_guide")[0];
    slideGuideElement.style.display = "block";
    

  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

//GET ICON API
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
  const headContainer = document.getElementById("head-container")
  headContainer.style.display = "flex"

  const iconIMG = document.createElement("img");
  iconIMG.src = iconURL;

  const firstDiv = document.getElementById("firsth1");
  firstDiv.innerHTML = " ";

  const iconDiv = document.getElementById("icon-div");
  iconDiv.innerHTML = " ";
  iconDiv.appendChild(iconIMG);
}

function updateWeatherData() {
  const dataCity = dataObj.city.name;
  const dataCountry = dataObj.city.country;

  let elementCity = document.createElement("h2");
  const city = dataCity;
  elementCity.textContent = `State/City: ${city}`;

  const headInfo = document.getElementById("head-info")
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
    const dataTempMax = dataObj.list[j].main.temp_max;
    const dataTempMin = dataObj.list[j].main.temp_min;
    const dataDescript = dataObj.list[j].weather[0].description

    if (i === 0) {
      todayTemp = new infoWeather(dataTime, dataTemp, dataTempMax, dataTempMin, dataDescript);
      todayTemp.showWeather(info1);
    } else if (i === 1) {
      tomorTemp = new infoWeather(dataTime, dataTemp, dataTempMax, dataTempMin, dataDescript);
      tomorTemp.showWeather(info2);
    } else if (i === 2) {
      nextTemp = new infoWeather(dataTime, dataTemp,dataTempMax, dataTempMin, dataDescript);
      nextTemp.showWeather(info3);
    }
  }
}

class infoWeather {
  constructor(dataTime, dataTemp, dataTempMax, dataTempMin, dataDescript) {
    this.dataTime = dataTime;
    this.dataTemp = dataTemp;
    this.dataTempMax = dataTempMax;
    this.dataTempMin = dataTempMin;
    this.dataDescript = dataDescript;
  }

  showWeather(container) {
    container.innerHTML = "";

    let elementDate = document.createElement("h2");
    const date = convertTime(this.dataTime);
    if (container === info1){
      elementDate.textContent = `Today date: ${date}`;
    } else{
      elementDate.textContent = `Date: ${date}`;
    }
    container.appendChild(elementDate);

    let elementTemp = document.createElement("p");
    container.appendChild(elementTemp);

    let elementTempMin = document.createElement("p");
    container.appendChild(elementTempMin);

    let elementTempMax = document.createElement("p");
    container.appendChild(elementTempMax);

    let elementDescript = document.createElement("p");
    const desData = this.dataDescript;
    elementDescript.textContent = `Description: ${desData}`;
    container.appendChild(elementDescript);

    this.container = container;
    this.updateTemperature();
  }

  updateTemperature() {
    const temperatureInfo = this.container.querySelector("p:nth-child(2)");
    const tempdata = this.dataTemp;
    const temperature = toggleInput.checked ? celsius(tempdata) : fahrenheit(tempdata);
    temperatureInfo.textContent = `Temperature: ${temperature.toFixed(2)} ${toggleInput.checked ? '°C' : '°F'}`;

    const temperatureInfoMin = this.container.querySelector("p:nth-child(3)");
    const tempdataMin = this.dataTempMin;
    const temperatureMin = toggleInput.checked ? celsius(tempdataMin) : fahrenheit(tempdataMin);
    temperatureInfoMin.textContent = `Temperature Min: ${temperatureMin.toFixed(2)} ${toggleInput.checked ? '°C' : '°F'}`;

    const temperatureInfoMax = this.container.querySelector("p:nth-child(4)");
    const tempdataMax = this.dataTempMax;
    const temperatureMax = toggleInput.checked ? celsius(tempdataMax) : fahrenheit(tempdataMax);
    temperatureInfoMax.textContent = `Temperature Max: ${temperatureMax.toFixed(2)} ${toggleInput.checked ? '°C' : '°F'}`;
  }
}

//CONVERT UNITS
function celsius(data) {
  return data - 273.15;
}

function fahrenheit(data) {
  return (data - 273.15) * (9 / 5) + 32;
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

//CHECK SCREEN SIZE
window.addEventListener("load", function() {
  if (window.innerWidth >= 576) {
    showSlideGuide1();
  } else {
    showSlideGuide2();
  }
});

function showSlideGuide1() {
  const slideGuide = document.createElement("div");
  slideGuide.classList.add("slide_guide");
  slideGuide.textContent = "Use left and right arrow keys to slide the container";
  const wrapperMain = document.getElementById("wrapper_main");
  wrapperMain.appendChild(slideGuide);

}

function showSlideGuide2() {
  const slideGuide = document.createElement("div");
  slideGuide.classList.add("slide_guide");
  slideGuide.textContent = "Slide the container to see more info";
  const wrapperMain = document.getElementById("wrapper_main");
  wrapperMain.appendChild(slideGuide);

}
