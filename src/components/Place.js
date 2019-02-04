import React, { Component } from 'react';

export default class Place extends Component {
    constructor(props) {
        super(props)

        this.state = {
            newPlace: ''
        }
    }

    pickedPlace(e) {
        let place = e.target.value;
        this.setState({
            pickedPlace: place
        })

        
    }

    checkWeather() {
        this.props.newPlace(this.state.pickedPlace)
    }

    render () {
        return (
            <div>
                <label htmlFor="place">Where you want to check weather?</label>
                <input id="place" type="text" value={ this.state.place } onChange={ (e) => this.pickedPlace(e) }></input>
                <button onClick={ () => this.checkWeather() }>Let's check!</button>
            </div>
        );
    }
}