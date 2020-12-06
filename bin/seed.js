const { Cars, CarDetails, CarImages } = require('../server/db/index');

const seed = async () => {
  try {
    const car1 = await Cars.create({});
    await CarDetails.create({ carId: car1.id });
    await CarImages.create({ carId: car1.id });
  } catch (er) {
    console.log(er);
  }
};

module.exports = seed;
