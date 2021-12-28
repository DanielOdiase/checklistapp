import React,{useState,useEffect} from 'react'
import "./WeatherSection.css"
function WeatherSection({listselected}) {
    var today = new Date();
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
     let day = weekday[today.getDay()];
     const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
      let monthname = month[today.getMonth()];
      var date = monthname +(today.getMonth()+1)+'|'+today.getDate(); 
   
    const[weatherName,setWeatherName]=useState([])
   const[namestate,setNameState]=useState([])
   const[weatherState,setWeatherState]=useState([])
   const[feelState,setFeelState]=useState([])
  
   useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
        fetch(`https://fcc-weather-api.glitch.me//api/current?lat=${position.coords.latitude}&lon=${position.coords.longitude}`)
    .then(res=> {
        if(!res.ok){
            throw Error ("Weather data not available")
        }
        return res.json()
    })
    .then(data=>{
     setWeatherName(data.name)
     setNameState(data.weather[0].description)
     setWeatherState(data.main.temp) 
     setFeelState(data.main)
    })
    .catch(err=>console.error(err))
    });
    
   }, [])
 
    return (
        <div className="box">
 <h3 className="location">{weatherName}</h3>
 <p><span className="spanside">{weatherState}°C</span> </p>
 <h3 className="date">{day}|{date}</h3>
<p> {namestate}</p>
<div className="weather-temp">
   
   <p> Feels-Like:{feelState.feels_like}°C</p>
   <p>24hr-high:{feelState.temp_max}°C </p> 
   <p>24-hr low:{feelState.temp_min}°C</p>
   </div>
   </div>
    )
}

export default WeatherSection
