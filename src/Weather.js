import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { FiLoader } from "react-icons/fi";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from "react-router-dom";
import "antd/dist/reset.css";
import { Divider } from "antd";
import axios from "axios";
import "./style.css";

function getCurrentPositionPromise(options) {
  return new Promise((resolve, reject) =>
    navigator.geolocation.getCurrentPosition(resolve, reject, options),
  );
}

function GetWeatherInfoComponent(data) {
  if (!data?.name) {
    return (
      <div className="weatherInfo">
        <h5 className="weatherTemp">
          <FiLoader className="loader" />
        </h5>
        <h6 className="weatherCity">Loading...</h6>
      </div>
    );
  } else {
    return (
      <div className="weatherInfo">
        <h5 className="weatherTemp">{(data.celcius - 273.15).toFixed(2)}°C</h5>
        <h6 className="weatherCity">{data?.name}</h6>
      </div>
    );
  }
}

function Weather() {
  const navigate = useNavigate();
  const { cityName } = useParams();
  const weatherAPIBase = "https://api.openweathermap.org/data/2.5/weather?q=";
  const cityAPIBase =
    "https://api.bigdatacloud.net/data/reverse-geocode-client";
  const apiKey = "ae6992475e03f32c2e010eaa1f9b4250";
  const [data, setData] = useState({});
  const getWeatherDetails = async (cityName) => {
    let apiURL = "";

    if (!cityName) {
      const position = await getCurrentPositionPromise();
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const city = await axios.get(
        `${cityAPIBase}?latitude=${lat}&longitude=${lon}&localityLanguage=en`,
      );
      apiURL = `${weatherAPIBase}${city.data.city}&APPID=${apiKey}`;
    } else {
      apiURL = `${weatherAPIBase}${cityName}&APPID=${apiKey}`;
    }

    // await sleep(1000 * 30);
    axios
      .get(apiURL)
      .then((res) => {
        setData({
          ...data,
          celcius: res.data.main.temp,
          name: res.data.name,
          humidity: res.data.main.humidity,
          speed: res.data.wind.speed,
        });
      })
      .catch((err) => {
        console.error("err", err);
      });
  };

  useEffect(() => {
    getWeatherDetails(cityName);
  }, [cityName]);

  return (
    <div className="container">
      <div className="weatherUpdate">
        <h6 className="headingUpdate">
          <FaArrowLeft
            onClick={() => navigate("/")}
            style={{ marginRight: "5px" }}
          />
          Weather app
        </h6>
        <Divider style={{ borderColor: "lightgrey", margin: 0 }} />
        <div className="col-md-12 text-center mt-3">
          <img
            className="weatherIcon"
            src="https://cdn.icon-icons.com/icons2/2505/PNG/512/sunny_weather_icon_150663.png"
          />

          {GetWeatherInfoComponent(data)}

          <Divider
            style={{
              borderColor: "lightgrey",
              margin: 0,
              marginTop: "10px",
              marginBottom: "15px",
            }}
          />

          <div className="details container">
            <div className="col">
              <img
                src="https://cdn.iconscout.com/icon/premium/png-256-thumb/humidity-1405137-1187424.png"
                alt=""
              />
              <div className="humidity">
                <p>{Math.round(data.humidity)}</p>
                <p>Humidity</p>
              </div>
            </div>

            <Divider
              style={{ borderColor: "lightgrey", margin: 0 }}
              type="vertical"
            />

            <div className="col">
              <img
                src="https://cdn1.iconfinder.com/data/icons/hawcons/32/700211-icon-43-wind-512.png"
                alt=""
              />
              <div className="wind">
                <p>{Math.round(data.speed)} Km/h</p>
                <p>Wind</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Weather;
