
const bodyHTML = document.querySelector("body")
const toggleInputCHART = document.getElementsByClassName("toggle-input")[0];
const wrapperMain = document.getElementsByClassName("wrapper_main")[0];
const chartContainer = document.getElementById("chart-container");
const slideGuide = document.createElement("div");
const slideContainer = document.getElementById("slide-container");

//CHECK SCREEN SIZE
window.addEventListener("click", function() {
    slideGuide.innerHTML = ' ';
    if (window.innerWidth >= 576) {
      showSlideGuide1();
    } else {
      showSlideGuide2();
    }
  });
//CHECK SCREEN SIZE

toggleInputCHART.addEventListener("change", function(){
    if (toggleInputCHART.checked){
        handleToggleInputCHECKED();

    }else{
        handleToggleInputUNCHECKED();
    }
});


//SUPPORT FUNCTION
  function handleToggleInputCHECKED(){
    wrapperMain.style.background = 'white';
        
    if (window.innerWidth >= 576){
        document.body.style.marginTop = "50px"
        wrapperMain.style.minWidth = "700px"
    }

    slideContainer.style.display = "none";
    const chartData = extractChartData(dataObj, toggleInputDEGREE);
    renderChart(chartData);

    // UPDATE DEGREE
    toggleInputDEGREE.addEventListener("change", function() {
        const chartData = extractChartData(dataObj, toggleInputDEGREE);
        renderChart(chartData);
      });

    chartContainer.style.display = 'block';
  }

 function handleToggleInputUNCHECKED() {
    if (window.innerWidth >= 576){
        document.body.style.marginTop = "100px"
        wrapperMain.style.minWidth = "500px"
    }
    chartContainer.style.display = 'none';
    wrapperMain.style.background = 'linear-gradient(180deg, #2E85EC 42.69%, rgba(82, 165, 175, 0.72) 84.14%)';
    slideContainer.style.display = "flex";
    chartContainer.innerHTML = ''; // Clear the canvas element
}


function extractChartData(dataObj, toggleInputDEGREE) {
    //STORE DATA INTO CHART OBJ
    const chartData = {
      labels: [],
      datasets: [
        {
            label: "Temperature",
            data: [],
            borderWidth: 2
        },
        {
            label: "Pressure",
            data: [],
            borderWidth: 2
        }

    ]
    };
  
    // Extracting data from dataObj and populating chartData for TEMPERATURE
    for (let i = 0; i < 5; i++) {
    let j = i * 8;
      const dataPoint = dataObj.list[j];
      const timestamp = dataPoint.dt;
      const temperature = dataPoint.main.temp;

      const pressData = convertINGH(dataPoint.main.pressure).toFixed(2);
        
      const date = convertTime(timestamp); 
      chartData.labels.push(date); 
      const tempChart = toggleInputDEGREE.checked ? celsius(temperature).toFixed(2) : fahrenheit(temperature).toFixed(2);

        //FIRST LABEL, TEMPERATURE
      
      chartData.datasets[0].data.push(tempChart);

      //SECOND LABEL, PRESSURE
      chartData.datasets[1].data.push(pressData);
    }
  
    return chartData;
  }

function renderChart(chartData){
    chartContainer.innerHTML = ''; // Clear the existing content

    canvasElement = document.createElement("canvas");
    canvasElement.id = "myChart";
    chartContainer.appendChild(canvasElement);

    const ctx = canvasElement.getContext("2d");
    console.log("chart rendered sucesses");

    //STYLING CHART
    new Chart(ctx, {
        type: "bar",
        data: chartData, 

        options: {
          scales: {
            x:{
                display: true,
                title: {
                    display: true,
                    text: 'DATE',
                    color: 'black',
                    font: {
                        size: 16,
                        weight: 'bold',
                        lineHeight: 1.2,
                    }
                }
            },

            y: {
              beginAtZero: true,
              display: true,
                title: {
                    display: true,
                    text: 'VALUE',
                    color: 'black',
                    font: {
                        size: 16,
                        weight: 'bold',
                        lineHeight: 1.2,
                    }
                }
            }
          }
        }
      });
}

function showSlideGuide1() {
    slideGuide.classList.add("slide_guide");
    slideGuide.textContent = "Use left and right arrow keys to slide the container";
    wrapperMain.appendChild(slideGuide);
  }
  
  function showSlideGuide2() {
    slideGuide.classList.add("slide_guide");
    slideGuide.textContent = "Slide the container to see more info, Experience better on larger screen";
    wrapperMain.appendChild(slideGuide);
  }