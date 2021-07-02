// api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

const weatherApi = {
    key: "a029e731117a6b9a5a8fa53ff50703bf",
    baseUrl: "https://api.openweathermap.org/data/2.5/weather?"
   
}


// Event Listener Function on keypress

const searchInputBox = document.getElementById(`input-box`);

searchInputBox.addEventListener(`keypress`, (event) => {
    if(event.keyCode==13){
        console.log(searchInputBox.value);
        getWeatherReport(searchInputBox.value);
        document.querySelector(`.weather-body`).style.display = "block";
        
    }
});

// Get Weather report

function getWeatherReport(city){
    fetch(`${weatherApi.baseUrl}q=${city}&appid=${weatherApi.key}&units=metric`)
    .then(weather => {
        return weather.json();
    }).then(showWeatherReport);
}

// Show Weather Report
function showWeatherReport(weather){
    console.log(weather);

    let city = document.getElementById(`city`);
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let temperature = document.getElementById(`temp`);
    temperature.innerHTML = `${Math.round(weather.main.temp)}&deg;C`;

    let minMaxTemp = document.getElementById(`min-max`);
    minMaxTemp.innerHTML = `${Math.floor(weather.main.temp_min)}&deg;C (min)/ ${Math.ceil(weather.main.temp_max)}&deg;C (max) `;

    let weatherType = document.getElementById(`weather`);
    weatherType.innerText = `${weather.weather[0].main}`;

    let date = document.getElementById(`date`);
    let todayDate = new Date();
    date.innerText = dateManage(todayDate);

    if(weatherType.textContent == 'Clear'){
        document.body.style.backgroundImage = "url('images/clear.jpg')";
    
    } else if(weatherType.textContent == 'Clouds'){
        document.body.style.backgroundImage = "url('images/cloud.jpeg')";
    
    } else if(weatherType.textContent == 'Rain'){
        document.body.style.backgroundImage = "url('images/rain.jpg')";
    
    } else if(weatherType.textContent == 'Snow'){
        document.body.style.backgroundImage = "url('images/snow.jpg')";
    
    } else if(weatherType.textContent == 'Thunderstorm'){
        document.body.style.backgroundImage = "url('images/thunderstorm.jpg')";
    
    } else if(weatherType.textContent == 'Haze'){
        document.body.style.backgroundImage = "url('images/cloudy.jpeg')";
    }  else if(weatherType.textContent == 'Mist'){
        document.body.style.backgroundImage = "url('images/mist.jpg')";
    } 
}

// Changing temperature from Celsius to Faranhite
// function celsiusToFahrenheit(temperature){
//     return (temperature*9/5)+32;
// }

// const weatherstatus = document.getElementById(`temp`);

// weatherstatus.addEventListener("click", function(cToF) {
//     if(weather.temp.value == undefined) return;
//     if(weather.tempe.unit == "celsius"){
//         let fahrenheit = celsiusToFahrenheit(weather.temp.value);

//         fahrenheit = Math.floor(fahrenheit);

//         fahrenheit.innerHTML = `${fahrenheit}&deg;F <span>F</span>`;

//         weather.temp.unit = "fahrenheit";
//     }else{
//         weatherstatus.innerHTML = `${weather.temp.value}&deg;C <span>C</span>`;

//         weather.temp.unit = "celsius";
//     }

// });


// Date manage

function dateManage(dateArg) {

    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let months = ["January", "February", "March", "April", "May", "June", "July", "August","September", "October", "November", "December"];

    let year = dateArg.getFullYear();
    let month = months[dateArg.getMonth()];
    let date = dateArg.getDate();
    let day = days[dateArg.getDay()];

    return `${date} ${month} (${day}), ${year}`;
}