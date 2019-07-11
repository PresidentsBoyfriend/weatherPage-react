import React from 'react';
import Form from "./components/form";
import Weather from "./components/weather";

const API_KEY = "a1a649f2d7b42c0e818e9f76a1f2b1dc";
var startPos;
window.onload = function() {
    var geoOptions = {
      maximumAge: 2 * 60 * 60 * 1000,
    }
    var geoSuccess = (position) => {
      startPos = position;
    };
    var geoError = function() {
      console.log('Error occurred. Error code: ');
    };
  
    navigator.geolocation.getCurrentPosition(geoSuccess, geoError, geoOptions);
  };



class App extends React.Component {

  state = {
    activ : undefined,
    temp: undefined,
    city: undefined,
    country: undefined,
    sunrise: undefined,
    pressure: undefined,
    error: undefined,
    tempByOpemWeather: undefined,
    pressureByOpemWeather: undefined,
    cityByOpemWeather: undefined,
    countryByOpemWeather: undefined,
    tempByWeatherbit: undefined,
    pressureByWeatherbit: undefined,
    cityByWeatherbit: undefined,
  }

  getWeatherByPossition = async (e) => {
    e.preventDefault();

    var localTemp = localStorage.getItem("localTemp"),
        localPressure = localStorage.getItem("localPressure"),
        localName = localStorage.getItem("localName"),
        localCountry = localStorage.getItem("localCountry"),
        localTempWeatherBit = localStorage.getItem("localTempWeatherBit"),
        localPressureWeatherBit = localStorage.getItem("localPressureWeatherBit"),
        localNameWeatherBit = localStorage.getItem("localNameWeatherBit");

    if (localTemp) {
      console.log("Loading data from localStorage");
      this.setState({
        activ : true,
        tempByOpemWeather: localTemp,
        pressureByOpemWeather: localPressure,
        cityByOpemWeather: localName,
        countryByOpemWeather: localCountry,
        tempByWeatherbit: localTempWeatherBit,
        pressureByWeatherbit: localPressureWeatherBit,
        cityByWeatherbit: localNameWeatherBit,
      });
    } 
    else {
      console.log("Download data on request");
      const api_long_lat = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${startPos.coords.latitude}&lon=${startPos.coords.longitude}&appid=${API_KEY}&units=metric`);
      const data_lon_lat = await api_long_lat.json();
      
      const api_url = await fetch(`https://api.weatherbit.io/v2.0/current?city=${data_lon_lat.name}&key=30d26896a62440848146a8226f2b10f3`);
      const data = await api_url.json();

      localStorage.setItem("localTemp", data_lon_lat.main.temp);
      localStorage.setItem("localPressure", data_lon_lat.main.pressure);
      localStorage.setItem("localName", data_lon_lat.name);
      localStorage.setItem("localCountry", data_lon_lat.sys.country);
      localStorage.setItem("localTempWeatherBit", data.data[0].app_temp);
      localStorage.setItem("localPressureWeatherBit", data.data[0].pres);
      localStorage.setItem("localNameWeatherBit", data.data[0].city_name);
      this.setState({
        activ : true,
        tempByOpemWeather: data_lon_lat.main.temp,
        pressureByOpemWeather: data_lon_lat.main.pressure,
        cityByOpemWeather: data_lon_lat.name,
        countryByOpemWeather: data_lon_lat.sys.country,
        tempByWeatherbit: data.data[0].app_temp,
        pressureByWeatherbit: data.data[0].pres,
        cityByWeatherbit: data.data[0].city_name,
      });
      setInterval(() => {
        localStorage.clear();
      }, 2 * 60 * 60 * 1000);
    }
  }

  getWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value; 

    if (city) {
      const api_url = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
      const data = await api_url.json();
      if (data.name === undefined) {
        this.setState({
          temp: undefined,
          city: undefined,
          country: undefined,
          sunrise: undefined,
          pressure: undefined,
          error: "Enter correct city name"
        });
      } 
      else {
        let sunrise = data.sys.sunrise;
        let date = new Date();
        date.setTime(sunrise);
        let sunrise_date = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

        this.setState({
          temp : data.main.temp,
          city : data.name,
          country : data.sys.country,
          sunrise : sunrise_date,
          pressure : data.main.pressure,
          error : undefined
        });
      }
    }
      else {
      this.setState({
        temp: undefined,
        city: undefined,
        country: undefined,
        sunrise: undefined,
        pressure: undefined,
        error: "Enter city"
      });
    }
    
  }

  render () {
    return (
      <div className="wrapper">
        <Form 
          watherMethod={this.getWeather}
          weatherMethodByPossition={this.getWeatherByPossition}
        />
        <Weather
          activ = {this.state.activ}
          temp = {this.state.temp}
          city = {this.state.city} 
          country = {this.state.country} 
          sunrise = {this.state.sunrise} 
          pressure = {this.state.pressure} 
          error = {this.state.error}     
          tempByOpemWeather = {this.state.tempByOpemWeather}
          pressureByOpemWeather = {this.state.pressureByOpemWeather}  
          cityByOpemWeather = {this.state.cityByOpemWeather} 
          countryByOpemWeather = {this.state.countryByOpemWeather} 
          tempByWeatherbit = {this.state.tempByWeatherbit}
          pressureByWeatherbit = {this.state.pressureByWeatherbit}  
          cityByWeatherbit = {this.state.cityByWeatherbit} 
        />
      </div>
    );
  }
}

export default App;
