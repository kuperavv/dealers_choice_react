import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { emptyCar } from './store';

const _Cars = ({ cars, deleteCar }) => {
  return (
    <div id="cars">
      {cars.map((car, idx) => {
        return (
          <div className="car_listing" key={idx}>
            <a href={`/#${car.id}`}>
              <ul>
                <li>
                  <img
                    src={`/images/${car.image}`}
                    height="100px"
                    width="150px"
                  />
                </li>
                <li>Make: {car.make}</li>
                <li>Model: {car.model}</li>
                <li>Year: {car.year}</li>
                <li>Price: {`\$${car.price}`}</li>
              </ul>
            </a>
            <button onClick={() => deleteCar(`${car.id}`)}>X</button>
          </div>
        );
      })}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteCar: async (oldId) => {
      await axios.delete(`/api/${oldId}`);
      const cars = (await axios.get(`/api/cars`)).data;
      const id = '';
      const car = { ...emptyCar };
      dispatch({
        type: 'LOAD',
        cars,
        car,
        id,
      });
    },
  };
};

const Cars = connect((state) => state, mapDispatchToProps)(_Cars);

export default Cars;
