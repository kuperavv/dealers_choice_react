import React from 'react';

const Car = (props) => {
  return (
    <div id="car">
      {console.log(props)}
      <ul>
        <li>
          <img
            src={`/images/${props.car.image}`}
            height="200px"
            width="350px"
          />
        </li>

        <li>Make: {props.car.make}</li>
        <li>Model: {props.car.model}</li>
        <li>Year: {props.car.year}</li>
        <li>Price: {`\$${props.car.price}`}</li>
        {Object.keys(props.car.cardetails[0]).map((detail, idx) => {
          return (
            <li key={idx}>{`${detail}: ${props.car.cardetails[0][detail]}`}</li>
          );
        })}
      </ul>
    </div>
  );
};

export default Car;
