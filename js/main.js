"use strict" 

// html variables 
let findName= document.getElementById("find"),
    day=document.getElementsByClassName("day"),
    todayNum=document.getElementById("today-num"),
    monthName=document.getElementById("month"),
    countryLocation=document.getElementById("location"),
    currentTemp=document.getElementById("current-temp"),
    maxTemp=document.getElementsByClassName("maxtemp"),
    smallTemp=document.getElementsByClassName("smalltemp"),
    icon=document.getElementsByClassName("condition"),
    currentStatus=document.getElementsByClassName("status"),
    humidity=document.getElementById("humdi"),
    wind=document.getElementById("wind"),
    direction=document.getElementById("direction")

// js variable 
let getData={},
forecastdays=[],
country=""

// get weather 
function getweather(country) {
    fetch(`https://api.weatherapi.com/v1/forecast.json?key=d3a9af24dd8a4b06a44213233231308&q=${country}&days=3`)
    .then(response => response.json())
    .then(data => {
     getData=data
     displayForecast()
     console.log(getData)
    })}

// default forecast
getweather("london")

// display forecast 
function displayForecast(){
    forecastdays=getData.forecast.forecastday

    /* current day */
    let today=new Date(forecastdays[0].date)
    console.log(today)
    todayNum.innerHTML=today.toLocaleDateString('en-US',{day:'numeric'})
    monthName.innerHTML=today.toLocaleDateString('en-US',{month:'long'})
    countryLocation.innerHTML=getData.location.name;
    currentTemp.innerHTML=getData.current.temp_c;
    humidity.innerHTML=getData.current.humidity+"%";
    wind.innerHTML=getData.current.wind_kph+"km/h";
    direction.innerHTML=getData.current.wind_dir;

// match inputs 
    for (let i=0; i<3; i++){
      let iconSrc="https:"+forecastdays[i].day.condition.icon;
        icon[i].setAttribute("src",iconSrc);

        currentStatus[i].innerHTML=forecastdays[i].day.condition.text;

      let weekdays=new Date(forecastdays[i].date)
       day[i].innerHTML=weekdays.toLocaleDateString('en-US', { weekday: 'long' }); 
        console.log(weekdays)
    }

// next days 
 for (let i=0;i<2;i++){
    maxTemp[i].innerHTML=forecastdays[i+1].day.maxtemp_c;
    smallTemp[i].innerHTML=forecastdays[i+1].day.mintemp_c;
 }
}

// search country
    findName.addEventListener("input",function(){
    country=findName.value
    getweather(country)
    console.log(findName.value)
})
