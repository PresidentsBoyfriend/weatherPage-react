import React from 'react';
import Form from "./components/form";
import Weather from "./components/weather";

const API_KEY = "a1a649f2d7b42c0e818e9f76a1f2b1dc";
var startPos, 
    limit = 2 * 3600 * 1000,
    localStorageInitTime = localStorage.getItem('localStorageInitTime'),
    language;

class App extends React.Component {
  state = {
    weatherData : {
      temp: undefined,
      city: undefined,
      country: undefined,
      pressure: undefined,
      error: undefined
    },
    openWeatherMap : {
      main : {},
      sys : {},
    },
    weatherBit : {
      data : [ {

      }],
    },
  }
  componentDidMount() {
    language = window.navigator ? (window.navigator.language ||
      window.navigator.systemLanguage ||
      window.navigator.userLanguage) : "ru";
    language = language.substr(0, 2).toLowerCase();
    document.querySelector("#input_").value = localStorage.getItem("cityKey");
    var geoSuccess = (position) => {
      startPos = position;
    };
    var geoError = function() {
      console.log('Error occurred. Error code: ');
    };
  
    navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
    setTimeout(() => {
      this.getWeatherByPossition();
    }, 0); 
  }

  getWeatherByPossition = async (e) => {
    
    if (localStorageInitTime === null) {
      localStorage.setItem('localStorageInitTime', +new Date());
    } 
    else if(+new Date() - localStorageInitTime > limit) {
      localStorage.clear();
      localStorage.setItem('localStorageInitTime', +new Date());
    }

  let parseLocalOpenWeatherMap = JSON.parse(localStorage.getItem("localOpenWeatherMap"));
  let parseLocalWeatherBit = JSON.parse(localStorage.getItem("localWeatherBit"));
  
  if (parseLocalOpenWeatherMap) {
    console.log("Loading data from localStorage");

    this.setState({
      openWeatherMap : parseLocalOpenWeatherMap,
      weatherBit : parseLocalWeatherBit,
    });
  } 
  else {
    console.log("Download data on request");
    
    const api_long_lat = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${startPos.coords.latitude}&lon=${startPos.coords.longitude}&appid=${API_KEY}&units=metric`);
    const data_lon_lat = await api_long_lat.json();
    const api_url = await fetch(`https://api.weatherbit.io/v2.0/current?&lat=${startPos.coords.latitude}&lon=${startPos.coords.longitude}&key=2f222b8baca544369b9453931db5dd89`);
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
    let select = document.querySelector("#select_").value;
    const city = e.target.elements.city.value; 
    localStorage.setItem("cityKey", city);
    if (select === "1"){
      if (city) {
        const api_url = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
        const data = await api_url.json();
        if (data.name === undefined) {
          this.setState({
            weatherData : {
              temp: undefined,
              city: undefined,
              country: undefined,
              pressure: undefined,
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
              error : undefined
            }
          });
        }
      }
        else {
        this.setState({
          weatherData : {
            temp: undefined,
            city: undefined,
            country: undefined,
            pressure: undefined,
            error: "Enter city"
          }
        });
      }
    }
    else { 
      if (city) {
        const api_url = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
        const data = await api_url.json();
        if (data.name === undefined) {
          this.setState({
            weatherData : {
              temp: undefined,
              city: undefined,
              country: undefined,
              pressure: undefined,
              error: "Enter correct city name"
            }
          });
        } 
        else {
          const api_url_next = await fetch(`https://api.weatherbit.io/v2.0/current?city=${data.name}&key=2f222b8baca544369b9453931db5dd89`);
          const data_next = await api_url_next.json();
          this.setState({
            weatherData : {
              temp : data_next.data[0].app_temp,
              city : data_next.data[0].city_name,
              country : undefined,
              pressure : data_next.data[0].pres,
              error : undefined
            }
          });
        }
      }
        else {
        this.setState({
          weatherData : {
            temp: undefined,
            city: undefined,
            country: undefined,
            pressure: undefined,
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
          weatherMethodByPossition={this.getWeatherByPossition}
          weatherData={this.state.weatherData}  
          language = {language}
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
