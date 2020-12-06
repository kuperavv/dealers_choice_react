const router = require('express').Router();
const { Cars, CarDetails, CarImages } = require('../db/index');
// connect your API routes here!

router.get('/cars', async (req, res, next) => {
  try {
    const cars = await Cars.findAll({});
    res.send(cars);
  } catch (er) {
    console.log(er);
    next(er);
  }
});

router.get('/cars/:carid', async (req, res, next) => {
  try {
    const car = await Cars.findAll({
      include: [CarDetails, CarImages],
      where: {
        id: req.params.carid,
      },
    });
    res.send(car);
  } catch (er) {
    console.log(er);
    next(er);
  }
});

module.exports = router;
