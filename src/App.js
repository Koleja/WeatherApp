import React, { Component } from 'react';
import './App.css';
import Place from './components/Place';
import WeatherInfo from './components/WeatherInfo';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      weatherInCity: 'test',
      headerVisible: false,
      error: null,
      isLoaded: false,
      fullWeather: {
        temperature: '',
        wind: '',
        pressure: '',
        weather: '',
      },
    }
  }

  onCityInput(place) {
    let newPlace = place;

    this.setState({
      weatherInCity: newPlace,
      headerVisible: true
    })

    this.apiCall(newPlace);
  }

  apiCall(city) {

    var apiKey = '03f879c605d001cf9f7eea837f5163fd';
    var apiBase = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&APPID=' + apiKey;

    console.log(apiBase);

    var self = this;


    fetch(apiBase, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    }).then(res => res.json())
      .then(
        (result) => {
          console.log('hejo');
          self.setState({
            isLoaded: true,
            fullWeather: {
              temperature: result.main,
              weather: result.weather[0].description,
              pressure: result.main.pressure,
              wind: result.wind.speed
            }
          });
          console.log(this.state.fullWeather);
        }
      );

  }

  componentDidMount() {

    
  }

  render() {
    return (
      <div className="App">
          
          <Place newPlace={ (a) => this.onCityInput(a) }/>
          { this.state.headerVisible &&
            <h1>Wheater in  <span>{ this.state.weatherInCity }</span></h1>
          }
          {
            this.state.isLoaded &&
            <WeatherInfo weatherToShow={this.state.fullWeather} />
          }
          
          
      </div>
    );
  }
}

export default App;
