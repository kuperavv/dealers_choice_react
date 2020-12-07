import React from 'react';
import Cars from './Cars';
import Car from './Car';
import Header from './Header';
import Upload from './Upload';
import axios from 'axios';

export default class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      cars: [],
      id: '',
      car: {},
    };
    this.updateCars = this.updateCars.bind(this);
    this.deleteCar = this.deleteCar.bind(this);
  }
  async componentDidMount() {
    window.addEventListener('hashchange', async () => {
      const carId = window.location.hash.slice(1);
      const car = (await axios.get(`/api/cars/${carId}`)).data[0];
      this.setState({ id: carId, car: car });
    });
    const carId = window.location.hash.slice(1);
    const car = (await axios.get(`/api/cars/${carId}`)).data[0];
    const cars = (await axios.get(`/api/cars`)).data;
    this.setState({ cars: cars, id: carId, car: car });
  }

  async updateCars() {
    const cars = (await axios.get(`/api/cars`)).data;
    this.setState({ cars: cars });
  }

  async deleteCar(carId) {
    await axios.delete(`/api/${carId}`);
    await this.updateCars();
  }

  render() {
    return (
      <div id="main">
        <Header />
        {this.state.id !== '' ? (
          <Car car={this.state.car} />
        ) : (
          <Cars cars={this.state.cars} deleteCar={this.deleteCar} />
        )}
        <div id="upload_container">
          {/* {this.state.id !== '' ? '' : <Upload updateCars={this.updateCars} />} */}
          <Upload updateCars={this.updateCars} />
        </div>
      </div>
    );
  }
}
