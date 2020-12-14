import React from 'react';
import Cars from './Cars';
import Car from './Car';
import Header from './Header';
import Uploader from './Uploader';
import axios from 'axios';
import { emptyCar } from './store';
import store from './store';

export default class Main extends React.Component {
  constructor() {
    super();
    this.state = store.getState();
    this.updateCars = this.updateCars.bind(this);
    this.deleteCar = this.deleteCar.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  async componentDidMount() {
    window.addEventListener('hashchange', async () => {
      const carId = window.location.hash.slice(1);
      let car;
      if (carId === '') {
        car = emptyCar;
      } else {
        car = (await axios.get(`/api/cars/${carId}`)).data;
      }
      this.setState({ id: carId, car: { ...car }, tempCar: { ...car } });
    });
    const carId = window.location.hash.slice(1);
    let car;
    if (carId === '') {
      car = emptyCar;
    } else {
      car = (await axios.get(`/api/cars/${carId}`)).data;
    }
    const cars = (await axios.get(`/api/cars`)).data;
    this.setState({
      cars: cars,
      id: carId,
      car: { ...car },
      tempCar: { ...car },
    });
  }

  async updateCars() {
    const cars = (await axios.get(`/api/cars`)).data;
    this.setState({ cars: cars });
  }

  async deleteCar(carId) {
    try {
      await axios.delete(`/api/${carId}`);
      await this.updateCars();
    } catch (er) {
      alert('Unable to delete');
    }
  }

  async onFormSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', this.state.tempCar.image);
    formData.append('make', this.state.tempCar.make);
    formData.append('model', this.state.tempCar.model);
    formData.append('year', this.state.tempCar.year);
    formData.append('price', this.state.tempCar.price);
    formData.append('engine', this.state.tempCar.engine);
    formData.append('drive', this.state.tempCar.drive);
    formData.append('feature1', this.state.tempCar.feature1);
    formData.append('description', this.state.tempCar.description);

    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    if (this.state.id === '') {
      try {
        await axios.post('/api/uploadCar', formData, config);
        this.updateCars();
        this.setState({ car: emptyCar, tempCar: emptyCar });
        this.setState({ reset: Math.random().toString(36) });
      } catch (er) {
        alert('Unable to update');
      }
    } else {
      try {
        const car = (
          await axios.put(`/api/updateCar/${this.state.id}`, formData, config)
        ).data;
        this.updateCars();
        this.setState({ car: { ...car }, tempCar: { ...car } });
      } catch (er) {
        alert('Unable to update');
      }
    }
  }

  onChange(e) {
    const car = this.state.tempCar;
    car.image = e.target.files[0];
    this.setState({
      tempCar: car,
    });
  }
  onChangeText(e) {
    const car = this.state.tempCar;
    car[e.target.name] = e.target.value;
    this.setState({
      tempCar: car,
    });
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
          <Uploader
            car={this.state.tempCar}
            onChange={this.onChange}
            onChangeText={this.onChangeText}
            onFormSubmit={this.onFormSubmit}
            reset={this.state.reset}
          />
        </div>
      </div>
    );
  }
}
