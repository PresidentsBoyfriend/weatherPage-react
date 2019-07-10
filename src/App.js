import React from 'react';
// import Info from "./components/info";
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
    temp: undefined,
    city: undefined,
    country: undefined,
    sunrise: undefined,
    pressure: undefined,
    error: undefined,
    temp_l: undefined,
    pressure_l: undefined,
    city_l: undefined,
    country_l: undefined,
  }

  getWeatherByPossition = async (e) => {
    e.preventDefault();
    const api_long_lat = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${startPos.coords.latitude}&lon=${startPos.coords.longitude}&appid=${API_KEY}&units=metric`);
    const data_lon_lat = await api_long_lat.json();
    this.setState({
      temp_l: data_lon_lat.main.temp,
      pressure_l: data_lon_lat.main.pressure,
      city_l: data_lon_lat.name,
      country_l: data_lon_lat.sys.country,
    });
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
      <div className="wrapper" onTouchStart={this.getWeatherByPossition} onPointerMove={this.getWeatherByPossition}>
        <Form 
          watherMethod={this.getWeather}
        />
        <Weather
          temp = {this.state.temp}
          city = {this.state.city} 
          country = {this.state.country} 
          sunrise = {this.state.sunrise} 
          pressure = {this.state.pressure} 
          error = {this.state.error}     
          temp_l = {this.state.temp_l}
          pressure_l = {this.state.pressure_l}  
          city_l = {this.state.city_l} 
          country_l = {this.state.country_l} 
        />
      </div>
    );
  }
}

export default App;
