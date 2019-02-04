import React, { Component } from 'react';

export default class Place extends Component {
    constructor(props) {
        super(props)

        this.state = {
            weatherToShow: '',
        }

        
    }

    componentDidMount() {
        this.setState({
            weatherToShow: this.props.weatherToShow,
        })

        console.log(weatherToShow);
    }

    
    

    render() {
        return (
            <div>
                <p>hejo</p>
                {/* <p>temperature: {this.state.weatherToShow.temperature}</p>
                <p>wind: {this.state.weatherToShow.wind}</p>
                <p>pressure: {this.state.weatherToShow.pressure}</p>
                <p>state: {this.state.weatherToShow.weather}</p> */}
            </div>
        );
    }
}