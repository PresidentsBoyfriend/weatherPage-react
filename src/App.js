import React from 'react';
import Form from "./components/form";
import Weather from "./components/weather";

const API_KEY = "a1a649f2d7b42c0e818e9f76a1f2b1dc";
var startPos;
var limit = 2 * 3600 * 1000; 
var localStorageInitTime = localStorage.getItem('localStorageInitTime');

class App extends React.Component {

  componentDidMount() {
    var geoOptions = {
      maximumAge: 2 * 3600 * 1000,
    }
    
    document.querySelector("#input_").value = localStorage.getItem("cityKey");
    var geoSuccess = (position) => {
      startPos = position;
    };
    var geoError = function() {
      console.log('Error occurred. Error code: ');
    };
  
    navigator.geolocation.getCurrentPosition(geoSuccess, geoError, geoOptions);
    console.log(startPos);
    setTimeout(() => {
      this.getWeatherByPossition();
    }, 0); 
  }

  state = {
    temp: undefined,
    city: undefined,
    country: undefined,
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
    
    if (localStorageInitTime === null) {
      localStorage.setItem('localStorageInitTime', +new Date());
  } else if(+new Date() - localStorageInitTime > limit) {
      localStorage.clear();
      localStorage.setItem('localStorageInitTime', +new Date());
  }

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
      console.log(data_lon_lat);
      const api_url = await fetch(`https://api.weatherbit.io/v2.0/current?&lat=${startPos.coords.latitude}&lon=${startPos.coords.longitude}&key=2f222b8baca544369b9453931db5dd89`);
      const data = await api_url.json();
      console.log(data);

      localStorage.setItem("localTemp", data_lon_lat.main.temp);
      localStorage.setItem("localPressure", data_lon_lat.main.pressure);
      localStorage.setItem("localName", data_lon_lat.name);
      localStorage.setItem("localCountry", data_lon_lat.sys.country);
      localStorage.setItem("localTempWeatherBit", data.data[0].app_temp);
      localStorage.setItem("localPressureWeatherBit", data.data[0].pres);
      localStorage.setItem("localNameWeatherBit", data.data[0].city_name);

      this.setState({
        tempByOpemWeather: data_lon_lat.main.temp,
        pressureByOpemWeather: data_lon_lat.main.pressure,
        cityByOpemWeather: data_lon_lat.name,
        countryByOpemWeather: data_lon_lat.sys.country,
        tempByWeatherbit: data.data[0].app_temp,
        pressureByWeatherbit: data.data[0].pres,
        cityByWeatherbit: data.data[0].city_name,
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
            temp: undefined,
            city: undefined,
            country: undefined,
            pressure: undefined,
            error: "Enter correct city name"
          });
        } 
        else {
          this.setState({
            temp : data.main.temp,
            city : data.name,
            country : data.sys.country,
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
          pressure: undefined,
          error: "Enter city"
        });
      }
    }
    else { 
      if (city) {
        const api_url = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
        const data = await api_url.json();
        if (data.name === undefined) {
          this.setState({
            temp: undefined,
            city: undefined,
            country: undefined,
            pressure: undefined,
            error: "Enter correct city name"
          });
        } 
        else {
          const api_url_next = await fetch(`https://api.weatherbit.io/v2.0/current?city=${data.name}&key=2f222b8baca544369b9453931db5dd89`);
          const data_next = await api_url_next.json();
          this.setState({
            temp : data_next.data[0].app_temp,
            city : data_next.data[0].city_name,
            country : undefined,
            pressure : data_next.data[0].pres,
            error : undefined
          });
        }
      }
        else {
        this.setState({
          temp: undefined,
          city: undefined,
          country: undefined,
          pressure: undefined,
          error: "Enter city"
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
          temp = {this.state.temp}
          city = {this.state.city} 
          country = {this.state.country} 
          pressure = {this.state.pressure} 
          error = {this.state.error}  
        />
        <Weather             
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
