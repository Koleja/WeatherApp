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
                        <div className="c-weather__extra">
                            <p>day</p>
                            <p>date</p>
                            <p>Wind: {this.state.weatherData.wind} m/s</p>
                        </div>
                        <div className="c-weather__overall">
                            {this.state.weatherData.weather}
                        </div>
                        <div className="c-weather__main">
                            <div className="c-weather__main--small">
                                {this.state.weatherData.tempMin},
                                {this.state.weatherData.tempMax}
                            </div>
                            {this.state.weatherData.temperature} °C
                        </div>
                    </div>
                }
            </div>
        );
    }
}