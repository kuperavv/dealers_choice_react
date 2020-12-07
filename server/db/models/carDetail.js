const db = require('../db');
const { STRING, TEXT } = db.Sequelize;

const CarDetails = db.define(
  'cardetails',
  {
    description: {
      type: TEXT,
      defaultValue: 'This is a nice car',
    },
    engine: {
      type: STRING,
      defaultValue: 'V8',
    },
    drive: {
      type: STRING,
      defaultValue: 'RWD',
    },
    feature1: {
      type: STRING,
      defaultValue: 'None',
    },
  },
  { timestamps: false }
);

module.exports = CarDetails;
