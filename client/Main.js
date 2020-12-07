import React from 'react';
import Cars from './Cars';
import Car from './Car';
import Header from './Header';
import Uploader from './Uploader';
import axios from 'axios';

const emptyCar = {
  id: '',
  image: '',
  make: '',
  model: '',
  price: '',
  year: '',
  carImages: [],
  description: '',
  engine: '',
  drive: '',
  feature1: '',
};

export default class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      cars: [],
      id: '',
      car: {},
      reset: '',
    };
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
      this.setState({ id: carId, car: car });
    });
    const carId = window.location.hash.slice(1);
    let car;
    if (carId === '') {
      car = emptyCar;
    } else {
      car = (await axios.get(`/api/cars/${carId}`)).data;
    }
    const cars = (await axios.get(`/api/cars`)).data;
    console.log(car);
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

  async onFormSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', this.state.car.image);
    formData.append('make', this.state.car.make);
    formData.append('model', this.state.car.model);
    formData.append('year', this.state.car.year);
    formData.append('price', this.state.car.price);
    formData.append('engine', this.state.car.engine);
    formData.append('drive', this.state.car.drive);
    formData.append('feature1', this.state.car.feature1);
    formData.append('description', this.state.car.description);

    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    await axios
      .post('/api/uploadCarImage', formData, config)
      .then((response) => {})
      .catch((error) => {});
    this.updateCars();
    this.setState({ car: emptyCar });
    this.setState({ reset: Math.random().toString(36) });
  }

  onChange(e) {
    const car = this.state.car;
    car.image = e.target.files[0];
    console.log(car.image);
    this.setState({
      car: car,
    });
  }
  onChangeText(e) {
    const car = this.state.car;
    car[e.target.name] = e.target.value;
    this.setState({
      car: car,
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
          {/* {this.state.id !== '' ? '' : <Upload updateCars={this.updateCars} />} */}
          {/* <Upload car={this.state.car} updateCars={this.updateCars} /> */}
          <Uploader
            car={this.state.car}
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
