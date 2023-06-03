let btn = document.querySelector("#fetchBtn");
const weatherid = document.querySelector("#weatherInfoContainer");
let next_btn = document.querySelector("#next_btn");
let prev_btn = document.querySelector("#prev_btn");


function convertTime(timestamp){
  const date = new Date(timestamp * 1000);
  const options = {
     year: "numeric", 
     month: "numeric", 
     day: "numeric"}
  return date.toLocaleString("en-US", options);
}

const input = document.getElementById("input_city");
input.addEventListener("keydown", function(event){
  if (event.key === "Enter"){
    event.preventDefault();
    fetchWeather();
  }   
})

btn.addEventListener('click', function(e) {
      let valid = document.querySelector("#input_city").value;
      if (valid === ""){
        alert("Do not leave blank")
        return false;
      }
});


btn.addEventListener("click", fetchWeather);

function fetchWeather() {
  let input_user = document.querySelector("#input_city").value;
  let apiKey = '8e715392ca450df5ba4cdaa47bd9978e';
  let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${input_user}&appid=${apiKey}`;

  fetch(apiUrl)
    .then(response => {
      if (!response.ok){
        console.log("data invalid")
      }
      return response.json()
    })
    .then(data => {
      // Process the data returned by the API
        showWeather(data); //pass data into function
    })
    .catch(error => {
      // Handle any errors that occurred during the API call
      console.error("Error fetching data:", error);
    });
}

function showWeather (data){
  // Clear previous data
  weatherInfoContainer.innerHTML = "";

  // Create new elements and append them to the container
  let elementCity = document.createElement("h2");
  const city = data.city.name;
  elementCity.textContent = `State/City: ${city}`;
  weatherInfoContainer.appendChild(elementCity);

  let elementCountry = document.createElement("h2")
  const country = data.city.country;
  elementCountry.textContent = `Country: ${country}`;
  weatherInfoContainer.appendChild(elementCountry)

  let element1 = document.createElement("p");
  element1.textContent = convertTime(data.list[0].dt);
  weatherInfoContainer.appendChild(element1);

  let element2 = document.createElement("p");
  tempdata = data.list[0].main.temp;
  const celsius = tempdata - 273.15;
  element2.textContent = "Temperature: " + celsius.toFixed(2) + " C"
  weatherInfoContainer.appendChild(element2);

  let element3 = document.createElement("p");
  element3.textContent = convertTime(data.list[7].dt);
  weatherInfoContainer.appendChild(element3);

console.log(data);
console.log(JSON.stringify(data));
}


