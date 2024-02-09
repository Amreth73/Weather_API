import logo from './logo.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './App.css';
import { useEffect, useState } from 'react';
const Weather=({icon,temp,city,country,lat,log,humidity,wind})=>
{
  return(
    <>
    <div className='image'>
      <img src={icon} alt='image'></img>
    </div>
    <div className='temp'>{temp}°C</div>
    <div className='location'>{city}</div>
      <div className='country'>{country}</div>
      <div className='cord'>
        <div>
          <span className='lat'>Latitude</span>
          <span>{lat}</span>
        </div>
        <div>
          <span className='log'>Longitude</span>
          <span>{log}</span>
        </div>
      </div>
        <div className='data-container'>
          <div className='element'>
            <img src='humm.png' className='icon'  height={"50px"} />
            <div className='data'>
              <div className='humidity-percent'>{humidity}%</div>
              <div className='text'>Humidity</div>
            </div>
          </div>
          <div className='element'>
            <img src='wind.png' className='icon'  height={"50px"} />
            <div className='data'>
              <div className='wind-percent'>{wind} km/h</div>
              <div className='text'>Wind Speed</div>
            </div>
          </div>
        </div>

  </>
  )
}
function App() {
  let api_key="bcdeb89f221cf57449df2bf273a4a006";
  const [icon,setIcon] =useState()
  const [temp,setTemp] =useState(0);
  const [city,setCity] =useState("");
  const [country,setCountry]=useState("");
  const [lat,setLat]=useState(0);
  const [log,setLog]=useState(0);
  const [humidity,setHumidity]=useState(0);
  const [wind,setWind]=useState(0);
  const[text,setText]=useState("Chennai");
  const [error,setError]=useState(null);

  const[cityNotFound,setCityNotFound]=useState(false);
  const [loading,setLoading]=useState(false);

  const weatherIconMap={
    "01d":"sunr.png",
    "01n":"sunr.png",
    "02d":"images.png",
    "02n":"images.png",
    "03d":"rain.png",
    "03n":"rain.png",
    "04d":"rain.png",
    "04n":"rain.png",
    "09d":"shower.webg",
    "09n":"shower.webg",
    "10d":"shower.webg",
    "10n":"shower.webg",
    "10d":"shower.webg",
    "13n":"snow.png",
    "13d":"snow.png",
  }
  const search= async ()=>
  {
    setLoading(true);
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=metric`;
    try{
      let res=await fetch(url);
      let data =await res.json();
      if(data.cod==="404")
      {
        setCityNotFound(true);
        setLoading(false);
        console.error("city not found");
      }
      setHumidity(data.main.humidity);
      setWind(data.wind.speed);
      setTemp(Math.floor(data.main.temp))
      setCity(data.name);
      setCountry(data.sys.country);
      setLat(data.coord.lat);
      setLog(data.coord.lon);

      const weatherIconCode=data.weather[0].icon;
      setIcon(weatherIconMap[weatherIconCode] ||"sunr.png");
      setCityNotFound(false); 
      setError(null);
      
    }catch(e){
      setError("An error occurred while fetching weather data.")
        console.log("An error occurred:",e.message);
    }finally{
        setLoading(false);
    }
  }
  const handleCity=(e)=>
  {
    setText(e.target.value);
  }
  const handlekey =(e)=>
  {
      if(e.key==="Enter"){
        search();
      }

  }
  useEffect(function()
  {
    search();
  },[])
  return (
    <>
    <div className='container'>
        <div className='input-container'>
          <input type="text" className='cityInput' placeholder='Search City' onChange={handleCity}  value={text} onKeyDown={handlekey}/>
        <div className='search-icon'>
          <img src='searchh.png' width={"20px"} height={"20px"} onClick={()=>{search()}}></img>
        </div>
        </div>
        {loading && <div className='loading-msg'>
          Loading...
        </div>}
        
        {error &&<div className='error-msg'>
          {error}
        </div>}
        {cityNotFound &&<div className='city-not-found'>City not found</div>}

        {!loading &&!cityNotFound &&<Weather icon={icon} temp={temp} city={city} country={country} lat={lat} log={log}
        humidity={humidity} wind={wind}/>}
        <p className='copyright'>Designed by <span>Amreth S</span></p>
    </div>
    </>
  );
}

export default App;
