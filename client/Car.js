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

        {Object.keys(props.car).map((detail, idx) => {
          return <li key={idx}>{`${detail}: ${props.car[detail]}`}</li>;
        })}
      </ul>
    </div>
  );
};

export default Car;
