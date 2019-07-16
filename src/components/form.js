import React from "react";

class Form extends React.Component {
    render() {
        return (
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
                { this.props.city && 
                <div className="byString">
                    <p>City : {this.props.city}, {this.props.country}</p>
                    <p>Temp : {this.props.temp} °C</p>
                    <p>Pressure : {this.props.pressure} mmHg</p>
                </div>
                }
                <p>{this.props.error}</p> 
            </div>
        );
    }
}

export default Form;