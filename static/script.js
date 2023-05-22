let btn = document.querySelector("#fetchBtn");
const weatherid = document.querySelector("#weatherInfoContainer");

btn.addEventListener("click", fetchWeather);

function fetchWeather() {
  let lonInput = document.querySelector("#lonInput").value;
  let latInput = document.querySelector("#latInput").value;
  let apiKey = '8e715392ca450df5ba4cdaa47bd9978e';
  let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latInput}&lon=${lonInput}&appid=${apiKey}`;



  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      // Process the data returned by the API
        const newpara = document.createElement("p")

        newpara.textContent = data.list[0].weather[0].description 
        weatherid.appendChild(newpara);

      console.log(data);
    })
    .catch(error => {
      // Handle any errors that occurred during the API call
      console.error("Error fetching data:", error);
    });
}
