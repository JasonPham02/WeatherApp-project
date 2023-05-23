let btn = document.querySelector("#fetchBtn");
const weatherid = document.querySelector("#weatherInfoContainer");

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
  const newlist = document.querySelector("ul");
  let ul = document.getElementById("list");

  element1.textContent = data.list[0].weather[0].description 
  element2.textContent = data.list[0].dt
  element3.textContent = data.list[0].dt

  

  newlist.appendChild(element1);
  newlist.appendChild(element2);
  newlist.appendChild(element3);

console.log(data);
console.log(JSON.stringify(data));

}