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
import {
  weatherAPIBase,
  getImagePath,
  getCurrentPositionPromise,
  apiKey,
  cityAPIBase,
} from "./utils/helper";

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
        <h5 className="weatherTemp">{data?.celcius}°C</h5>
        <h6 className="weatherCity">{data?.name}</h6>
        <h10 className="weatherDesc">{data?.desc}</h10>
      </div>
    );
  }
}

function Weather() {
  const navigate = useNavigate();
  const { cityName } = useParams();
  const [data, setData] = useState({});

  const getWeatherDetails = async (cityName) => {
    let apiURL = "";

    if (!cityName) {
      const position = await getCurrentPositionPromise();
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const cityApiRes = await axios.get(
        `${cityAPIBase}?latitude=${lat}&longitude=${lon}&localityLanguage=en`,
      );
      apiURL = `${weatherAPIBase}${cityApiRes.data.city}&APPID=${apiKey}`;
    } else {
      apiURL = `${weatherAPIBase}${cityName}&APPID=${apiKey}`;
    }

    try {
      const res = await axios.get(apiURL);
      const weather = res.data.weather[0].main;
      const image = getImagePath(weather);
      const celcius = (res.data.main.temp - 273.15).toFixed(2);
      const name = res.data.name;
      const desc = res.data.weather[0].description;
      const humidity = Math.round(res.data.main.humidity ?? 0);
      const speed = Math.round(res.data.wind.speed ?? 0);
      setData({ ...data, celcius, image, name, desc, humidity, speed });
    } catch (err) {
      if (err.response.status === 404) {
        navigate("/?error=City not found");
      } else {
        navigate("/?error=Something went wrong. " + err.response.statusText);
      }
    }
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
          <img className="weatherIcon" alt={data.desc} src={data.image} />

          {GetWeatherInfoComponent(data)}

          <Divider
            style={{
              borderColor: "lightgrey",
              margin: 0,
              marginTop: "0px",
              marginBottom: "5px",
            }}
          />

          <div className="details container">
            <div className="col">
              <img
                src="https://cdn.iconscout.com/icon/premium/png-256-thumb/humidity-1405137-1187424.png"
                alt="Humidity icon"
              />
              <div className="humidity">
                <p>{data.humidity}</p>
                <p>Humidity</p>
              </div>
            </div>

            <Divider
              style={{ borderColor: "lightgrey", margin: 0, height: "40px" }}
              type="vertical"
            />

            <div className="col">
              <img
                src="https://cdn1.iconfinder.com/data/icons/hawcons/32/700211-icon-43-wind-512.png"
                alt="Wind speed icon"
              />
              <div className="wind">
                <p>{data.speed} Km/h</p>
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
