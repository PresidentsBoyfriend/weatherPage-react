import React from "react";
import Form from "../pages/form";
import Weather from "../components/weather";
import * as key from "../api/api";
import { weatherMapFetch, weatherBitFetch } from "../services";

class App extends React.Component {
  constructor() {
    super();

    this.language = "ru";
  }

  state = {
    weatherData: {
      temp: "",
      city: "",
      country: "",
      pressure: "",
      error: ""
    },
    openWeatherMap: "",
    weatherBit: "",
    startPos: {},
    options: [
      {
        name: "Select…",
        value: null
      },
      {
        name: "Open weather map",
        value: "a"
      },
      {
        name: "Weather bit",
        value: "b"
      }
    ],
    value: ""
  };

  componentDidMount() {
    let language = window.navigator
      ? window.navigator.language ||
        window.navigator.systemLanguage ||
        window.navigator.userLanguage
      : "ru";

    this.language = language.substr(0, 2).toLowerCase();

    let geoSuccess = position => {
      this.setState({
        startPos: position
      });
    };

    navigator.geolocation.getCurrentPosition(geoSuccess);
    setTimeout(() => {
      this.getWeatherByPossition();
    }, 0);
  }

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  getWeatherByPossition = async e => {
    let localStorageInitTime = localStorage.getItem("localStorageInitTime"),
      limit = 3600 * 60 * 2;
    if (localStorageInitTime === null) {
      localStorage.setItem("localStorageInitTime", +new Date());
    } else if (+new Date() - localStorageInitTime > +limit) {
      localStorage.clear();
      localStorage.setItem("localStorageInitTime", +new Date());
    }

    const {latitude, longitude} = this.state.startPos;

    this.setState({
      openWeatherMap:
        JSON.parse(localStorage.getItem("localOpenWeatherMap")) ||
        weatherMapFetch(latitude, longitude),
      weatherBit:
        JSON.parse(localStorage.getItem("localWeatherBit")) ||
        weatherBitFetch(latitude, longitude)
    });
  };

  getDataOpenWeatherMap = async city => {
    const api_url = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key.API_KEY_OPEN_WEATHER_MAP}&units=metric`
    );
    const data = await api_url.json();

    this.setState({
      weatherData: {
        temp: data.main.temp,
        city: data.name,
        country: data.sys.country,
        pressure: data.main.pressure
      }
    });
  };

  getDataWeatherBit = async city => {
    const api_url_next = await fetch(
      `https://api.weatherbit.io/v2.0/current?city=${city}&key=${key.API_KEY_WEATHER_BIT}`
    );
    const data_next = await api_url_next.json();

    this.setState({
      weatherData: {
        temp: data_next.data[0].app_temp,
        city: data_next.data[0].city_name,
        pressure: data_next.data[0].pres
      }
    });
  };

  getDataError = async reason => {
    this.setState({
      weatherData: {
        error: reason
      }
    });
  };

  getWeather = async e => {
    e.preventDefault();
    let reason;
    const city = e.target.elements.city.value,
      value = this.state.value;
    if (city) {
      const api_url = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key.API_KEY_OPEN_WEATHER_MAP}&units=metric`
      );
      const data = await api_url.json();

      let willDataTrue = new Promise(function(resolve, reject) {
        if (data.name === undefined) {
          reason = new Error("Enter correct city name");
          reject(reason);
        } else resolve(data);
      });

      let checkData = () => {
        willDataTrue
          .then(data => {
            if (value === "a") {
              this.getDataOpenWeatherMap(data.name);
            } else if (value === "b") {
              this.getDataWeatherBit(data.name);
            }
          })
          .catch(() => {
            this.getDataError(reason);
          });
      };
      checkData();
    }
  };

  render() {
    const {
      options,
      value,
      weatherData,
      openWeatherMap,
      weatherBit
    } = this.state;
    return (
      <div className="wrapper">
        <Form
          options={options}
          value={value}
          watherMethod={this.getWeather}
          weatherData={weatherData}
          language={this.language}
          handleChange={this.handleChange}
        />
        <Weather
          openWeatherMap={openWeatherMap}
          weatherBit={weatherBit}
          language={this.language}
        />
      </div>
    );
  }
}

export default App;
