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
            <div>
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
                    <div>
                        <p>Temperature: {this.state.weatherData.temperature} °C</p>
                        <p>Overall: {this.state.weatherData.weather}</p>
                        <p>Wind: {this.state.weatherData.wind} m/s</p>
                        <p>Pressure: {this.state.weatherData.pressure} hPa</p>
                    </div>
                }
            </div>
        );
    }
}