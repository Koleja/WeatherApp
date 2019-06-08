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
    e.target.classList.add('picked')
  }

  checkWeather(e) {
    e.preventDefault();
    this.props.newPlace(this.state.pickedPlace, false)
  }

  render () {
    return (
      <div className="c-place">
        <form>
          <div className="c-place__wrapper">
            <label className="c-place__label" htmlFor="place">Where you want to check the weather?</label>
            <input className="c-place__input" id="place" type="text" placeholder="Type here..." value={ this.state.place } onChange={ (e) => this.pickedPlace(e) }></input>
          </div>
          <button onClick={ (e) => this.checkWeather(e) }>Let's check!</button>
        </form>
      </div>
    );
  }
}