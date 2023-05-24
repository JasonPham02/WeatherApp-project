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
  let element1 = document.createElement("p");
  element1.textContent = data.list[0].weather[0].description;
  weatherInfoContainer.appendChild(element1);

  let element2 = document.createElement("p");
  element2.textContent = convertTime(data.list[0].dt);
  weatherInfoContainer.appendChild(element2);

  let element3 = document.createElement("p");
  element3.textContent = convertTime(data.list[0].dt);
  weatherInfoContainer.appendChild(element3);

console.log(data);
console.log(JSON.stringify(data));
}


