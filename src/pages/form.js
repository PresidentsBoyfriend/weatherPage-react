import React from "react";

class Form extends React.Component {
    
    render() {
        return (
            <div>
                { this.props.language !== "ru" ?
                <div className="btnSection  ">
                    <form  onSubmit={this.props.watherMethod}>
                        <input id="input_" type="text" name="city" placeholder="City" onChange={this.props.setItem}/>
                        <select id="select_" onChange={this.props.handleChange} value={this.props.value}>
                        {this.props.options.map(item => (
                                <option key={item.value} value={item.value}>
                                {item.name}
                                </option>
                            ))}
                        </select>
                        <div>
                            <button>Get weather</button>
                        </div>
                    </form> 
                    
                    { this.props.weatherData.city ? 
                    <div className="byString">
                        <p>City : {this.props.weatherData.city}, {this.props.weatherData.country}</p>
                        <p>Temp : {this.props.weatherData.temp} °C</p>
                        <p>Pressure : {this.props.weatherData.pressure} mmHg</p>
                    </div> : null
                    }  
                    <p>{this.props.weatherData.error}</p> 
                </div> : null
                }
                { this.props.language === "ru" ?
                <div className="btnSection  ">
                    <form  onSubmit={this.props.watherMethod}>
                        <input id="input_" type="text" name="city" placeholder="Город"/>
                        <select id="select_" onChange={this.props.handleChange} value={this.props.value}>
                        {this.props.options.map(item => (
                                <option key={item.value} value={item.value}>
                                {item.name}
                                </option>
                            ))}
                        </select>
                        <div>
                            <button  >Узнать погоду</button>
                        </div>
                    </form>
                    { this.props.weatherData.city ? 
                    <div className="byString">
                        <p>Город : {this.props.weatherData.city}, {this.props.weatherData.country}</p>
                        <p>Температура : {this.props.weatherData.temp} °C</p>
                        <p>Давление : {this.props.weatherData.pressure} мм. рт. ст.</p>
                    </div> : null
                    }
                    <p>{this.props.weatherData.error}</p> 
                </div> : null                   
                }
            </div>
        );
    }
}

export default Form;