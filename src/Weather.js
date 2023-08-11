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
        <h10 className="weatherDesc">{data?.desc}</h10>
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
      const cityApiRes = await axios.get(
        `${cityAPIBase}?latitude=${lat}&longitude=${lon}&localityLanguage=en`,
      );
      apiURL = `${weatherAPIBase}${cityApiRes.data.city}&APPID=${apiKey}`;
    } else {
      apiURL = `${weatherAPIBase}${cityName}&APPID=${apiKey}`;
    }

    axios
      .get(apiURL)
      .then((res) => {
        let imagePath = "";
        if (res.data.weather[0].main === "Clouds") {
          imagePath =
            "https://cdn.pixabay.com/photo/2013/04/01/09/22/clouds-98536_960_720.png";
        } else if (res.data.weather[0].main === "Clear") {
          imagePath =
            "https://cdn.icon-icons.com/icons2/2505/PNG/512/sunny_weather_icon_150663.png";
        } else if (res.data.weather[0].main === "Rain") {
          imagePath =
            "https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather07-1024.png";
        } else if (res.data.weather[0].main === "Drizzle") {
          imagePath =
            "https://cdn2.iconfinder.com/data/icons/weather-blue-filled-color/300/21947858Untitled-3-512.png";
        } else {
          imagePath =
            "https://cdn.icon-icons.com/icons2/2505/PNG/512/sunny_weather_icon_150663.png";
        }
        setData({
          ...data,
          celcius: res.data.main.temp,
          name: res.data.name,
          desc: res.data.weather[0].description,
          humidity: res.data.main.humidity,
          speed: res.data.wind.speed,
          image: imagePath,
        });
      })
      .catch((err) => {
        if (err.response.status === 404) {
          navigate("/?error=City not found");
        } else {
          navigate("/?error=Something went wrong. " + err.response.statusText);
        }
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
          <img className="weatherIcon" src={data.image} />

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
                alt=""
              />
              <div className="humidity">
                <p>{Math.round(data.humidity)}</p>
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
