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
                <div className="location">
                    <p>Weather in your location : </p>
                    <p>Possition : {this.props.city_l}, {this.props.country_l}</p>
                    <p>Temp : {this.props.temp_l} °C</p>
                    <p>Pressure : {this.props.pressure_l} mmHg</p>
                </div>
            </div>
        )
    };
}

export default Weather;