import React from 'react';
// import Sidebar from './Sidebar';
// import AllAlbums from './AllAlbums';
// import SingleAlbum from './SingleAlbum';
import axios from 'axios';

export default class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      cars: [],
    };
    //this.selectAlbum = this.selectAlbum.bind(this);
  }
  async componentDidMount() {
    const cars = (await axios.get(`/api/cars`)).data;
    this.setState({ cars: cars });
  }
  // selectAlbum(albumId) {
  //   console.log(albumId);
  //   this.setState({ selectedAlbum: albumId });
  // }

  render() {
    return (
      <div id="main" className="">
        <ul>
          {this.state.cars.map((car) => {
            return <li>{`${car.make} ${car.model} ${car.image}`}</li>;
          })}
        </ul>
      </div>
    );
  }
}
