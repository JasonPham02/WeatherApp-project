const bodyHTML = document.querySelector("body")
const toggleInput0 = document.getElementsByClassName("toggle-input")[0];
const wrapperMain = document.getElementsByClassName("wrapper_main")[0];
const chartContainer = document.getElementById("chart-container");
const slideGuide = document.createElement("div");

//CHECK SCREEN SIZE
window.addEventListener("click", function() {
    slideGuide.innerHTML = ' ';
    if (window.innerWidth >= 576) {
      showSlideGuide1();
    } else {
      showSlideGuide2();
    }
  });
  
  function showSlideGuide1() {
    slideGuide.classList.add("slide_guide");
    slideGuide.textContent = "Use left and right arrow keys to slide the container";
    wrapperMain.appendChild(slideGuide);
  }
  
  function showSlideGuide2() {
    slideGuide.classList.add("slide_guide");
    slideGuide.textContent = "Slide the container to see more info";
    wrapperMain.appendChild(slideGuide);
  }
//CHECK SCREEN SIZE

toggleInput0.addEventListener("change", function(){
    if (toggleInput0.checked){
        
        wrapperMain.style.background = 'white';
        if (window.innerWidth >= 576){
            document.body.style.marginTop = "50px"
            wrapperMain.style.minWidth = "700px"
        }

        slideContainer = document.getElementById("slide-container");
        slideContainer.style.display = "none";

        
        chartContainer.innerHTML = ''; // Clear the existing content

        canvasElement = document.createElement("canvas");
        canvasElement.id = "myChart";
        chartContainer.appendChild(canvasElement);

        const ctx = canvasElement.getContext("2d");
        

        new Chart(ctx, {
          type: 'bar',
          data: {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
              label: '# of Votes',
              data: [12, 19, 3, 5, 2, 3],
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: false
              }
            }
          }
        });
    }else{
        if (window.innerWidth >= 576){
            document.body.style.marginTop = "100px"
            wrapperMain.style.minWidth = "500px"
        }
        wrapperMain.style.background = 'linear-gradient(180deg, #2E85EC 42.69%, rgba(82, 165, 175, 0.72) 84.14%)';
        slideContainer.style.display = "flex";
        chartContainer.innerHTML = ''; // Clear the canvas element
    }
});
