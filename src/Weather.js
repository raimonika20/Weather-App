import React, { useEffect, useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from 'react-router-dom';
import Home from './Home';
import 'antd/dist/reset.css'
import { Divider } from 'antd';

import axios from 'axios';

import './style.css';

function Weather() {

  const apiKey = "ae6992475e03f32c2e010eaa1f9b4250"
  const [inputCity, setInputCity] = useState({
    celcius: 10,
    name: 'london',
    humidity: 10,
    speed: 2
  })
  const [data, setData] = useState({})

  const getWeatherDetails = (cityName) => {
    if (!cityName) return
    const apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&APPID=" + apiKey
    axios.get(apiURL).then((res) => {

      console.log(res.data)
      setData({ ...data, celcius: res.data.main.temp, name: res.data.name, humidity: res.data.main.humidity, speed: res.data.wind.speed })

    }).catch((err) => {
      console.log("err", err)
    })
  }



  const handleSearch = () => {
    getWeatherDetails()
  }


  useEffect(() => {
    getWeatherDetails('London')
  }, [])



  return (



    <div className='container'>



      <div className='weatherUpdate'>
        <h6 className='headingUpdate'>Weather app</h6>
        <Divider style={{ borderColor: "lightgrey", margin: 0 }} />
        <div className='col-md-12 text-center mt-3'>

          <img className='weatherIcon'
            src="https://cdn.icon-icons.com/icons2/2505/PNG/512/sunny_weather_icon_150663.png" />

          <h5 className='weatherTemp'>{((data.celcius) - 273.15).toFixed(2)}°C</h5>
          <h6 className='weatherCity'>{data?.name}</h6>

          <Divider style={{ borderColor: "lightgrey", margin: 0 }} />

          <div className='details'>
            <div className='col'>
              <img src="https://cdn.iconscout.com/icon/premium/png-256-thumb/humidity-1405137-1187424.png" alt='' />
              <div className='humidity'>
                <p>{Math.round(data.humidity)}</p>
                <p>Humidity</p>
              </div>
            </div>

            <Divider style={{ borderColor: "lightgrey", margin: 0 }} type='vertical' />

            <div className='col'>
              <img src="https://cdn1.iconfinder.com/data/icons/hawcons/32/700211-icon-43-wind-512.png" alt='' />
              <div className='wind'>
                <p>{Math.round(data.speed)} Km/h</p>
                <p>Wind</p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Weather
