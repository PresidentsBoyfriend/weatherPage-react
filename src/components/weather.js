import React from "react";


class Weather extends React.Component {
    render() {
        return (
            <div >
                { this.props.language !== "ru" && 
                <div className="location">
                    <p className="textWeatherTittle">Weather in your location : </p>
                    <div>              
                        <p className="textWeather"> OpenWeatherMap source </p>          
                        <p>Possition (region) : {this.props.openWeatherMap.name}, {this.props.openWeatherMap.sys.country}</p>
                        <p>Temp : {this.props.openWeatherMap.main.temp} °C</p>
                        <p>Pressure : {this.props.openWeatherMap.main.pressure} mmHg</p>
                    </div>
                    <div>
                        <p className="textWeather"> Weatherbit source </p>
                        <p>Possition : {this.props.weatherBit.data[0].city_name}</p>
                        <p>Temp : {this.props.weatherBit.data[0].app_temp} °C</p>
                        <p>Pressure : {this.props.weatherBit.data[0].pres} mmHg</p>
                    </div>
                </div>
                }
                { this.props.language === "ru" && 
                <div className="location">
                    <p className="textWeatherTittle">Погода вашего местоположения: </p>
                    <div>              
                        <p className="textWeather"> OpenWeatherMap погода </p>          
                        <p>Ваше местоположение : {this.props.openWeatherMap.name}, {this.props.openWeatherMap.sys.country}</p>
                        <p>Температура : {this.props.openWeatherMap.main.temp} °C</p>
                        <p>Давление : {this.props.openWeatherMap.main.pressure} мм. рт. ст.</p>
                    </div>
                    <div>
                        <p className="textWeather"> Weatherbit погода </p>
                        <p>Ваше местоположение : {this.props.weatherBit.data[0].city_name}</p>
                        <p>Температура : {this.props.weatherBit.data[0].app_temp} °C</p>
                        <p>Давление : {this.props.weatherBit.data[0].pres} мм. рт. ст.</p>
                    </div>
                </div>
                }
            </div>
        )
    };
}
export {Weather};