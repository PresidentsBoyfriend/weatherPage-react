import React from "react";

class Form extends React.Component {
    render() {
        return (
            <form  onSubmit={this.props.watherMethod}>
                <input type="text" name="city" placeholder="City"/>
                <button  >Get weather</button>
                <button onTouchStart={this.props.weatherMethodByPossition} onClick={this.props.weatherMethodByPossition}>Get weather your possition</button>
            </form>
        );
    }
}

export default Form;