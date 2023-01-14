import React, {useState} from 'react';
import './App.css';
import axios from 'axios';



function App() {
  const [data,setData] = useState({});
  const [location,setLocation] = useState('')

   const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=42cb420232a7688408f09731774d2cbc`
  
   const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      })
      setLocation('')
    }
   }


  return (
    <div className="app">
      <div className='search'>
        <input
        value={location}
        onChange={event => setLocation(event.target.value)}
        onKeyPress={searchLocation}
        placeholder='Escribe una locacion'
        >
        </input>
      </div>
      <div className='container'>
        <div className='top'>
          <div className='locacion'>
            <p>{data.name}</p>
          </div>
          <div className='temp'>
            {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
          </div>
          <div className='descripcion'>
            {data.weather ? <p className='bold'>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {data.name != undefined && 
        <div className='bottom'>
        <div className='sensacion'>
          {data.main ? <p className='bold'>{data.main.feels_like.toFixed()} °C</p> : null}
          <p>Sensacion termica</p>
        </div>
        <div className='humedad'>
          {data.main ? <p className='bold'>{data.main.humidity} %</p> : null}
          <p>Humedad</p>
        </div>
        <div className='viento'>
          {data.wind ? <p className='bold'>{data.wind.speed.toFixed()} MPH</p> : null}
          <p>Velocidad del viento</p>
        </div>
      </div>
        }

        

      </div>
    </div>
  );
}

export default App;
