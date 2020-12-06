const db = require('./db');
const Cars = require('./models/cars');
const CarDetails = require('./models/carDetail');
const CarImages = require('./models/carImages');

CarDetails.belongsTo(Cars);
Cars.hasMany(CarDetails);
CarImages.belongsTo(Cars);
Cars.hasMany(CarImages);

module.exports = { db, Cars, CarDetails, CarImages };
