import React, { Component } from 'react';

export default class WeatherInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            weatherData: [],
        }
    }

    componentDidMount() {
        this.setState({
            weatherData: this.props.weatherToShow,
        })
    }


    render() {
        return (
            <div className="c-weather">
                {
                    /* this.props.dataComing &&
                    <div>
                        {
                            Object.keys(this.state.weatherData).map((keyName, i) => (
                                <p key={i}>{keyName}: {this.state.weatherData[keyName]}</p>
                            ))
                        }
                    </div> */
                }
                {
                    this.props.dataComing &&
                    <div className="c-weather__container">
                        <p className="c-weather__item">Temperature: 
                            <span className="c-weather__item-data"> {this.state.weatherData.temperature} °C</span></p>
                        <p className="c-weather__item">Overall: 
                            <span className="c-weather__item-data"> {this.state.weatherData.weather}</span></p>
                        <p className="c-weather__item">Wind: 
                            <span className="c-weather__item-data"> {this.state.weatherData.wind} m/s</span></p>
                        <p className="c-weather__item">Pressure: 
                            <span className="c-weather__item-data"> {this.state.weatherData.pressure} hPa</span></p>
                    </div>
                }
            </div>
        );
    }
}