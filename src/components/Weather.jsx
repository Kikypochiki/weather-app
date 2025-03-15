import React, {useRef, useEffect, useState} from 'react'
import './Weather.css'
import search_icon from '../assets/magnifying-glass.png'
import sun from '../assets/sun.png'
import humidity_icon from '../assets/humidity.png'
import wind_icon from '../assets/windy.png'
import moon from '../assets/moon.png'
import cloudy from '../assets/cloudy-day.png'
import cloudy_night from '../assets/cloudy-night.png'
import cloud from '../assets/cloud.png'
import clouds from '../assets/clouds.png'
import shower from '../assets/shower.png'
import sunny_rain from '../assets/sunnyrain.png'


const Weather = () => {

  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState(false);
  const allIcons = {
    "01d": sun,
    "01n": moon,
    "02d": cloudy,
    "02n": cloudy_night,
    "03d": cloud,
    "03n": cloud,
    "04d": clouds,
    "04n": clouds,
    "09d": shower,
    "09n": shower,
    "10d": sunny_rain,
    "10n": sunny_rain,
  }

  const search = async (city)=>{
    if(city === ""){
      alert("Please enter a city");
      return;
    }
    try{
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;

      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      const icon = data.weather && data.weather[0] ? allIcons[data.weather[0].icon] : sun;
      setWeatherData({
        humidity: data.main.humidity,
        wind: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon

      });
    }
    catch(err){
      console.log(err)
    } 
  }
  useEffect(()=>{
    search("Tagbilaran");
  }, [])
  return (
    <div className='weather'>
        <div className='search-bar'>
            <input ref={inputRef}type='text' placeholder='Enter Location'/>
            <img src={search_icon} onClick={()=>search(inputRef.current.value)}/>
        </div>
        <img src={weatherData.icon} className='weather-icon' />
        <p className='temperature'>{weatherData.temperature}°C</p>
        <p className='location'>{weatherData.location}</p>
        <div className='weather-details'>
          <div className='col'>
            <img src={humidity_icon} />
            <div>
              <p>{weatherData.humidity}%</p>
              <span>Humidity</span>
              </div>
          </div>
          <div className='col'>
            <img src={wind_icon} />
            <div>
              <p>{weatherData.wind} Km/h</p>
              <span>Wind Speed</span>
              </div>
          </div>
        </div>
    </div>
  )
}

export default Weather
