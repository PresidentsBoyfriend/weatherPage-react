import React from 'react';
import {value, Form} from "../components/form";
import {Weather} from "../components/weather";

const API_KEY_OPEN_WEATHER_MAP = process.env.REACT_APP_API_KEY_OPEN_WEATHER_MAP,
      API_KEY_WEATHER_BIT = process.env.REACT_APP_API_KEY_WEATHER_BIT;

let localStorageInitTime = localStorage.getItem('localStorageInitTime'),
    language;

class App extends React.Component {
  state = {
    weatherData : {
      temp: '',
      city: '',
      country: '',
      pressure: '',
      error: ''
    },
    openWeatherMap : {
      main : {},
      sys : {},
    },
    weatherBit : {
      data : [{}],
    },
    startPos : {},
  }

  componentDidMount() {
    language = window.navigator ? (window.navigator.language ||
      window.navigator.systemLanguage ||
      window.navigator.userLanguage) : "ru";
    language = language.substr(0, 2).toLowerCase();

    let geoSuccess = (position) => {
      this.setState({
        startPos : position
      })
    };
  
    navigator.geolocation.getCurrentPosition(geoSuccess);
    setTimeout(() => {
      this.getWeatherByPossition();
    }, 0); 
  }

  getWeatherByPossition = async (e) => {
    
    if (localStorageInitTime === null) {
      localStorage.setItem('localStorageInitTime', +new Date());
    } 
    else if(+new Date() - localStorageInitTime > 3600) {
      localStorage.clear();
      localStorage.setItem('localStorageInitTime', +new Date());
    }
  
  if (JSON.parse(localStorage.getItem("localOpenWeatherMap"))) {
    console.log("Loading data from localStorage");

    this.setState({
      openWeatherMap : JSON.parse(localStorage.getItem("localOpenWeatherMap")),
      weatherBit : JSON.parse(localStorage.getItem("localWeatherBit")),
    });
  } 
  else {
    console.log("Download data on request");
    const api_long_lat = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${this.state.startPos.coords.latitude}&lon=${this.state.startPos.coords.longitude}&appid=${API_KEY_OPEN_WEATHER_MAP}&units=metric`);
    const data_lon_lat = await api_long_lat.json();
    const api_url = await fetch(`https://api.weatherbit.io/v2.0/current?&lat=${this.state.startPos.coords.latitude}&lon=${this.state.startPos.coords.longitude}&key=${API_KEY_WEATHER_BIT}`);
    const data = await api_url.json();

    localStorage.setItem("localOpenWeatherMap", JSON.stringify(data_lon_lat));
    localStorage.setItem("localWeatherBit", JSON.stringify(data));

    this.setState({
      openWeatherMap : data_lon_lat,
      weatherBit : data,
    });
  }
}

  getWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value; 
    localStorage.setItem("cityKey", city);
    if (value === "1"){
      if (city) {
        const api_url = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY_OPEN_WEATHER_MAP}&units=metric`);
        const data = await api_url.json();
        if (data.name === undefined) {
          this.setState({
            weatherData : {
              error: "Enter correct city name"
            }
          });
        } 
        else {
          this.setState({
            weatherData : {
              temp : data.main.temp,
              city : data.name,
              country : data.sys.country,
              pressure : data.main.pressure,
            }
          });
        }
      }
        else {
        this.setState({
          weatherData : {
            error: "Enter city"
          }
        });
      }
    }
    else { 
      if (city) {
        const api_url = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY_OPEN_WEATHER_MAP}&units=metric`);
        const data = await api_url.json();
        if (data.name === undefined) {
          this.setState({
            weatherData : {
              error: "Enter correct city name"
            }
          });
        } 
        else {
          const api_url_next = await fetch(`https://api.weatherbit.io/v2.0/current?city=${data.name}&key=${API_KEY_WEATHER_BIT}`);
          const data_next = await api_url_next.json();
          this.setState({
            weatherData : {
              temp : data_next.data[0].app_temp,
              city : data_next.data[0].city_name,
              pressure : data_next.data[0].pres,
            }
          });
        }
      }
        else {
        this.setState({
          weatherData : {
            error: "Enter city"
          }
        });
      }
    }
  }

  render () {
    return (
      <div className="wrapper">
        <Form 
          watherMethod={this.getWeather}
          weatherData={this.state.weatherData}  
          language = {language}
          select = {this.state.select}
        />
        <Weather             
          openWeatherMap = {this.state.openWeatherMap} 
          weatherBit = {this.state.weatherBit}
          language = {language}
        />
      </div>
    );
  }
}

export default App;
