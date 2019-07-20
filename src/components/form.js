import React from "react";

class Form extends React.Component {
    render() {
        return (
            <div>
                { this.props.language !== "ru" &&
                <div className="btnSection  ">
                    <form  onSubmit={this.props.watherMethod}>
                        <input id="input_" type="text" name="city" placeholder="City"/>
                        <select id="select_">
                            <option value="1">OpenWeatherMap</option>
                            <option value="2">WeatherBit</option>
                        </select>
                        <div>
                            <button  >Get weather</button>
                        </div>
                    </form>
                    { this.props.weatherData.city && 
                    <div className="byString">
                        <p>City : {this.props.weatherData.city}, {this.props.weatherData.country}</p>
                        <p>Temp : {this.props.weatherData.temp} °C</p>
                        <p>Pressure : {this.props.weatherData.pressure} mmHg</p>
                    </div>
                    }
                    <p>{this.props.error}</p> 
                </div>
                }
                { this.props.language === "ru" &&
                <div className="btnSection  ">
                    <form  onSubmit={this.props.watherMethod}>
                        <input id="input_" type="text" name="city" placeholder="Город"/>
                        <select id="select_">
                            <option value="1">OpenWeatherMap</option>
                            <option value="2">WeatherBit</option>
                        </select>
                        <div>
                            <button  >Узнать погоду</button>
                        </div>
                    </form>
                    { this.props.weatherData.city && 
                    <div className="byString">
                        <p>Город : {this.props.weatherData.city}, {this.props.weatherData.country}</p>
                        <p>Температура : {this.props.weatherData.temp} °C</p>
                        <p>Давление : {this.props.weatherData.pressure} мм. рт. ст.</p>
                    </div>
                    }
                    <p>{this.props.error}</p> 
                </div>
                }
            </div>
        );
    }
}

export default Form;