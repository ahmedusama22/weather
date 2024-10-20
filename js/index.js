const searchInput = document.getElementById("searchInput");
let today = new Date();
let daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let monthsOfYear = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let dayName = daysOfWeek[today.getDay()];
let monthName = monthsOfYear[today.getMonth()];
let monthNum = today.getMonth() + 1;
let cartona = ``;
apiResponse("cairo");

async function apiResponse(q) {
  console.log(q.length);
  if(q.length > 3){
    try {
      let response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=8055111d6a9345359d954046241010&q=${q}&days=3`
      );
      let data = await response.json();
      displayCurrentDay(data);
      displayDays(data);
    } catch (error) {
      console.log(error);
    }
  }
  
}

function displayCurrentDay(data) {
  cartona = `
     <div class="col-md-4 p-0 ">
        <div class="card bg-card me-3">
           <ul class="d-flex list-unstyled justify-content-between align-items-center border-bottom bg-body-secondary p-2">
               <li>${dayName}</li>
               <li>${monthNum} ${monthName}</li>
           </ul>
           <div class="card-body text-white">
               <h3>${data.location.name}</h3>
               <h3 class="fs-90">${data.current.temp_c}°C</h3>
               <img src="https:${data.current.condition.icon}" class="w-25" alt=""/>
               <br />
               <span>${data.current.condition.text}</span>
               <div class="icons-weather d-flex mt-3">
                   <div class="icon-1 me-4">
                       <img src="./imgs/icon-umberella.png" alt=""/>
                       <span>${data.current.humidity}%</span> <!-- Humidity -->
                   </div>
                   <div class="icon-1 me-4">
                       <img src="./imgs/icon-wind.png" alt=""/>
                       <span>${data.current.wind_kph} km/h</span> <!-- Wind speed -->
                   </div>
                   <div class="icon-1 me-4">
                       <img src="./imgs/icon-compass.png" alt=""/>
                       <span>${data.current.wind_dir}</span> <!-- Wind direction -->
                   </div>
               </div>
           </div>
        </div>
    </div>`;
  document.getElementById("rowData").innerHTML = cartona;
}

function displayDays(data) {
  let forecastDay = data.forecast.forecastday;
  for (let i = 1; i <= 2; i++) {
    let nextDate = new Date(forecastDay[i].date);
    let dayIndex = nextDate.getDay();
    let dayForecast = `
        <div class="col-md-4 p-0">
            <div class="card bg-card me-3">
                <ul class="d-flex list-unstyled justify-content-center align-items-center border-bottom bg-body-secondary  p-2">
                    <li>${daysOfWeek[dayIndex]}</li> 
                </ul>
                <div class="card-body text-white">
                    <div class="d-flex justify-content-center align-items-center flex-column">
                        <img src="https:${forecastDay[i].day.condition.icon}" class="w-25" alt=""/>
                        <br />
                        <h3>${forecastDay[i].day.maxtemp_c}°C</h3>
                        <h3 class='h5'>${forecastDay[i].day.mintemp_c}°C</h3>
                        <span>${forecastDay[i].day.condition.text}</span>
                    </div>
                </div>
            </div>
        </div>`;
    cartona += dayForecast;
  }
  document.getElementById("rowData").innerHTML = cartona;
}
searchInput.addEventListener("input", function () {
  let city = searchInput.value;
  
  if (city) {
    apiResponse(city);
  }
});