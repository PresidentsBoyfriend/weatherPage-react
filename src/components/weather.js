import React from "react";


class Weather extends React.Component {
    render() {
        return (
            <div >
                { this.props.city && 
                <div className="byString">
                    <p>City : {this.props.city}, {this.props.country}</p>
                    <p>Temp : {this.props.temp} °C</p>
                    <p>Sunrise : {this.props.sunrise}</p>
                    <p>Pressure : {this.props.pressure} mmHg</p>
                </div>
                }
                <p>{this.props.error}</p>
                { this.props.activ && 
                <div className="location">
                    <p className="textWeatherTittle">Weather in your location : </p>
                    <div>              
                        <p className="textWeather"> OpenWeatherMap source </p>          
                        <p>Possition : {this.props.cityByOpemWeather}, {this.props.countryByOpemWeather}</p>
                        <p>Temp : {this.props.tempByOpemWeather} °C</p>
                        <p>Pressure : {this.props.pressureByOpemWeather} mmHg</p>
                    </div>
                    <div>
                        <p className="textWeather"> Weatherbit source </p>
                        <p>Possition : {this.props.cityByWeatherbit}</p>
                        <p>Temp : {this.props.tempByWeatherbit} °C</p>
                        <p>Pressure : {this.props.pressureByWeatherbit} mmHg</p>
                    </div>
                </div>
                }
            </div>
        )
    };
}

export default Weather;