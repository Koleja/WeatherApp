import React, { Component } from 'react';

export default class TabInfo extends Component {
    constructor(props) {
        super(props)

        this.state = {
            forecastData: [],
        }
    }

    componentDidMount() {
        this.setState({
            forecastData: this.props.forecastToShow,
        })
    }   

    render () {
        return (
            <div>
                {
                    Object.keys(this.state.forecastData).map((keyName, i) => (
                        <p key={i}>{keyName}: {this.state.forecastData[keyName]}</p>
                    ))
                }
            </div>
        );
    }
}