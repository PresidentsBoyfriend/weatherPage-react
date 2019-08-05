import React from "react";

const Weather = (props) => {
    if (props.openWeatherMap) {
        return (
            <div>
                {props.language === "ru" ? 
                <div className="location">
                <p className="textWeatherTittle">Погода вашего местоположения: </p>
                <div>              
                    <p className="textWeather"> OpenWeatherMap погода </p>          
                    <p>Ваше местоположение : {props.openWeatherMap.name}, {props.openWeatherMap.sys.country}</p>
                    <p>Температура : {props.openWeatherMap.main.temp} °C</p>
                    <p>Давление : {props.openWeatherMap.main.pressure} мм. рт. ст.</p>
                </div>
                <div>
                    <p className="textWeather"> Weatherbit погода </p>
                    <p>Ваше местоположение : {props.weatherBit.data[0].city_name}</p>
                    <p>Температура : {props.weatherBit.data[0].app_temp} °C</p>
                    <p>Давление : {props.weatherBit.data[0].pres} мм. рт. ст.</p>
                </div>
                </div> : <div className="location">
                    <p className="textWeatherTittle">Weather in your location : </p>
                    <div>              
                        <p className="textWeather"> OpenWeatherMap source </p>          
                        <p>Possition (region) : {props.openWeatherMap.name}, {props.openWeatherMap.sys.country}</p>
                        <p>Temp : {props.openWeatherMap.main.temp} °C</p>
                        <p>Pressure : {props.openWeatherMap.main.pressure} mmHg</p>
                    </div>
                    <div>
                        <p className="textWeather"> Weatherbit source </p>
                        <p>Possition : {props.weatherBit.data[0].city_name}</p>
                        <p>Temp : {props.weatherBit.data[0].app_temp} °C</p>
                        <p>Pressure : {props.weatherBit.data[0].pres} mmHg</p>
                    </div>
                </div>
                }
            </div>
        )
    }   else {
            return <div>Loading...</div>
        }
    };
export default Weather