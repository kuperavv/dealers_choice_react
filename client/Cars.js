import React from 'react';

const Cars = (props) => {
  return (
    <div id="cars">
      {props.cars.map((car, idx) => {
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
            <button onClick={() => props.deleteCar(`${car.id}`)}>X</button>
          </div>
        );
      })}
    </div>
  );
};

export default Cars;
