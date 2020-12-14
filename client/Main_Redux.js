import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Header from './Header';
import { emptyCar } from './store';
import Cars from './Cars_Redux';
import Car from './Car_Redux';
import Uploader from './Uploader_Redux';

class _App extends Component {
  async componentDidMount() {
    window.addEventListener('hashchange', async () => {
      const id = window.location.hash.slice(1);
      let car;
      if (id === '') {
        car = emptyCar;
      } else {
        car = (await axios.get(`/api/cars/${id}`)).data;
      }
      this.props.mount(car, id);
    });
    const id = window.location.hash.slice(1);
    let car;
    if (id === '') {
      car = emptyCar;
    } else {
      car = (await axios.get(`/api/cars/${id}`)).data;
    }
    this.props.mount(car, id);
  }
  render() {
    console.log(this.props);
    return (
      <div id="main">
        <Header />
        {this.props.id !== '' ? <Car /> : <Cars />}
        <div id="upload_container">
          <Uploader />
        </div>
      </div>
    );
  }
}

const App = connect(
  (state) => state,
  (dispatch) => {
    return {
      mount: async (car, id) => {
        const cars = (await axios.get(`/api/cars`)).data;
        dispatch({
          type: 'LOAD',
          cars,
          car,
          id,
        });
      },
    };
  }
)(_App);

export default App;
