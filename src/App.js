import React, { Component } from 'react';
import './styles/App.scss';
import Place from './components/Place';
import WeatherInfo from './components/WeatherInfo';
import TabInfo from './components/TabInfo';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      weatherInCity: 'test',
      headerVisible: false,
      error: null,
      isLoaded: false,
      clickedTab: '',
      tomorrow: this.createDate(1),
      dayAfterTomorrow: this.createDate(2),
      secondDayAfterTomorrow: this.createDate(3),
      fullWeather: {
        temperature: '',
        wind: '',
        pressure: '',
        weather: '',
      },
      forecastTomorrow: {
        temperature: '',
        wind: '',
        pressure: '',
        weather: ''
      },
      forecastDayAfterTomorrow: {
        temperature: '',
        wind: '',
        pressure: '',
        weather: ''
      },
      forecastSecondDayAfterTomorrow: {
        temperature: '',
        wind: '',
        pressure: '',
        weather: ''
      }
    }
  }

  onCityInput(place, bool) {
    let newPlace = place;

    this.setState({
      weatherInCity: newPlace,
      headerVisible: true,
      isLoaded: bool
    })

    this.apiCallWeather(newPlace);
    this.apiCallForecast(newPlace);
  }

  createDate(amount = 0) {

    var today = new Date();
    var dd = today.getDate() + amount;
    var mm = today.getMonth() + 1; 
    var yyyy = today.getFullYear();
    //var defoultTime = ' 12:00:00'

    if (dd < 10) {
      dd = '0' + dd;
    }
    
    if (mm < 10) {
      mm = '0' + mm;
    }

    var newDate = yyyy + '-' + mm + '-' + dd; 

    return newDate
  }

  getForecast(forDay, apiEl, dayForecast) {

    forDay += ' 12:00:00'

    if (apiEl.dt_txt === forDay) {
      dayForecast.temperature = this.KtoC(apiEl.main.temp);
      dayForecast.pressure = apiEl.main.pressure;
      dayForecast.weather = apiEl.weather[0].description;
      dayForecast.wind = apiEl.wind.speed;

      console.log(forDay + ': ' + dayForecast);
    }
    
  }

  apiCallWeather(city) {

    var apiKey = '03f879c605d001cf9f7eea837f5163fd';
    var apiBase = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&APPID=' + apiKey;

    var self = this;


    fetch(apiBase, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    }).then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          self.setState({
            
            fullWeather: {
              temperature: self.KtoC(result.main.temp),
              weather: result.weather[0].description,
              pressure: result.main.pressure,
              wind: result.wind.speed
            },
            isLoaded: true,
          });
        }
      );
  }

  apiCallForecast(city) {
    var apiKey = '03f879c605d001cf9f7eea837f5163fd';
    var apiBase = 'http://api.openweathermap.org/data/2.5/forecast?q=' + city + '&APPID=' + apiKey;

    var self = this;

    fetch(apiBase, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    }).then(res => res.json())
      .then(
        (result) => {
          var forecast = result.list;

          forecast.forEach(function(el) {
            self.getForecast(self.state.tomorrow, el, self.state.forecastTomorrow)
            self.getForecast(self.state.dayAfterTomorrow, el, self.state.forecastDayAfterTomorrow) 
            self.getForecast(self.state.secondDayAfterTomorrow, el, self.state.forecastSecondDayAfterTomorrow) 
          });
          self.setState({
            isLoaded: true,
          });
        }
      );
  }

  KtoC(temp) {
    var newTemp = temp -273;
    newTemp = Math.floor(newTemp);
    return newTemp
  }

  onClickedTab(e) {
    var tab = e.target;

    this.setState({
      clickedTab: tab.id
    })
  }

  componentDidMount() {

    
  }

  render() {
    return (
      <div className="m-main">
        <div className="m-main__conatiner">
          <Place newPlace={ (a) => this.onCityInput(a) }/>
          { 
            this.state.headerVisible &&
            <h1>Wheater in  <span className="m-main__city">{ this.state.weatherInCity }</span></h1>
          }
          {
            this.state.isLoaded &&
            <WeatherInfo dataComing={this.state.isLoaded} weatherToShow={this.state.fullWeather} />
          }
          { this.state.isLoaded &&
            <div className="tab">
              <p>Check also:</p>
              <nav className="tab__nav">
                <div className="tab__nav-item js-tab" onClick={this.onClickedTab.bind(this)} id={this.state.tomorrow}>Weather on<br /> {this.state.tomorrow}</div>
                <div className="tab__nav-item js-tab" onClick={(e) => this.onClickedTab(e)} id={this.state.dayAfterTomorrow}>Weather on<br /> {this.state.dayAfterTomorrow}</div>
                <div className="tab__nav-item js-tab" onClick={(e) => this.onClickedTab(e)} id={this.state.secondDayAfterTomorrow}>Weather on<br /> {this.state.secondDayAfterTomorrow}</div>
              </nav>
              <div className="tab__content">
                { 
                  this.state.clickedTab === this.state.tomorrow &&
                  <div className="tab__content-item" name={this.state.tomorrow}>
                    <TabInfo forecastToShow={this.state.forecastTomorrow}/>
                  </div>
                }
                { 
                  this.state.clickedTab === this.state.dayAfterTomorrow &&
                  <div className="tab__content-item" name={this.state.dayAfterTomorrow}>
                    <TabInfo forecastToShow={this.state.forecastDayAfterTomorrow}/>
                  </div>
                }
                { 
                  this.state.clickedTab === this.state.secondDayAfterTomorrow &&
                  <div className="tab__content-item" name={this.state.secondDayAfterTomorrow}>
                    <TabInfo forecastToShow={this.state.forecastSecondDayAfterTomorrow}/>
                  </div>
                }
              </div>
            </div>
          }
        </div>
      </div>
    );
  }
}

export default App;
