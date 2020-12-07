const { Cars, CarImages } = require('../server/db/index');

const seed = async () => {
  try {
    const cars = await Promise.all([
      Cars.create({
        make: 'Ford',
        model: 'Mustang',
        year: '2008',
        price: '2000.00',
      }),
      Cars.create({
        make: 'Mazda',
        model: 'CX-5',
        year: '2018',
        price: '10000.00',
        image: 'mazda_cx5.jpeg',
      }),
      Cars.create({
        make: 'Honda',
        model: 'Civic',
        year: '2015',
        price: '9999.00',
        image: 'honda_civic.jpeg',
      }),
    ]);
    //await Promise.all(cars.map((car) => CarDetails.create({ carId: car.id })));
    await Promise.all(cars.map((car) => CarImages.create({ carId: car.id })));
  } catch (er) {
    console.log(er);
  }
};

module.exports = seed;
