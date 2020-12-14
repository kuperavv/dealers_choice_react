import React from 'react';
import { connect } from 'react-redux';

const _Car = ({ car }) => {
  return (
    <div id="car">
      <ul>
        <li>
          <img src={`/images/${car.image}`} height="200px" width="350px" />
        </li>

        {Object.keys(car).map((detail, idx) => {
          return <li key={idx}>{`${detail}: ${car[detail]}`}</li>;
        })}
      </ul>
    </div>
  );
};

const Car = connect((state) => state)(_Car);

export default Car;
