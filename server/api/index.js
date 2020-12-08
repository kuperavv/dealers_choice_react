const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const { Cars, CarImages } = require('../db/index');

const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (!/image\/\.*/.test(file.mimetype)) {
      return cb(null, false, new Error('wrong file type'));
    }
    cb(null, true);
  },
});

router.post('/uploadCar', upload.single('image'), async (req, res, next) => {
  const file = req.file;
  if (!file) {
    const error = new Error('Please upload a file');
    error.httpStatusCode = 400;
    return next(error);
  }
  const car = await Cars.create({
    make: req.body.make,
    model: req.body.model,
    year: req.body.year,
    price: req.body.price,
    image: file.filename,
    description: req.body.description,
    engine: req.body.engine,
    drive: req.body.drive,
    feature1: req.body.feature1,
  });
  await CarImages.create({ carId: car.id });
  return res.sendStatus(201).end();
});

router.put(
  '/updateCar/:carId',
  upload.single('image'),
  async (req, res, next) => {
    const file = req.file;

    const car = (
      await Cars.findAll({
        where: {
          id: req.params.carId * 1,
        },
        include: [CarImages],
      })
    )[0];

    if (file) {
      fs.unlinkSync(
        path.join(__dirname, '..', '..', 'public', 'images', car.image)
      );
      car.image = file.filename;
    }

    car.make = req.body.make;
    car.model = req.body.model;
    car.year = req.body.year;
    car.price = req.body.price;
    car.description = req.body.description;
    car.engine = req.body.engine;
    car.drive = req.body.drive;
    car.feature1 = req.body.feature1;
    await car.save();
    return res.send(car);
  }
);

// app.post('/uploadCarImages', upload.array('car'), (req, res, next) => {
//   const files = req.files;
//   if (!files) {
//     const error = new Error('Please upload a file');
//     error.httpStatusCode = 400;
//     return next(error);
//   }
//   res.status(201).redirect('/');
// });

// connect your API routes here!

router.get('/cars', async (req, res, next) => {
  try {
    const cars = await Cars.findAll({
      order: ['id'],
    });
    res.send(cars);
  } catch (er) {
    console.log(er);
    next(er);
  }
});

router.get('/cars/:carid', async (req, res, next) => {
  try {
    let car = (
      await Cars.findAll({
        include: [
          {
            model: CarImages,
            attributes: {
              exclude: ['carId', 'id'],
            },
          },
        ],
        where: {
          id: req.params.carid,
        },
      })
    )[0];

    res.send(car);
  } catch (er) {
    console.log(er);
    next(er);
  }
});

router.delete('/:carid', async (req, res, next) => {
  try {
    const image = await Cars.findAll({
      where: {
        id: req.params.carid,
      },
      attributes: ['image'],
    });
    const imageName = image[0].dataValues.image;
    fs.unlinkSync(
      path.join(__dirname, '..', '..', 'public', 'images', imageName)
    );
    await CarImages.destroy({
      where: {
        carId: req.params.carid,
      },
    });
    await Cars.destroy({
      where: {
        id: req.params.carid,
      },
    });
    res.sendStatus(204).end();
  } catch (er) {
    console.log(er);
    next(er);
  }
});

module.exports = router;
