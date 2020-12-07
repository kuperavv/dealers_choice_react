const db = require('../db');
const { STRING, TEXT } = db.Sequelize;

const Cars = db.define(
  'cars',
  {
    make: {
      type: STRING,
      allowNull: false,
      defaultValue: 'Ford',
    },
    model: {
      type: STRING,
      allowNull: false,
      defaultValue: 'Mustang',
    },
    year: {
      type: STRING,
      allowNull: false,
      defaultValue: '2008',
    },
    price: {
      type: STRING,
      allowNull: false,
      defaultValue: '1000.00',
    },
    image: {
      type: TEXT,
      defaultValue: 'default.jpeg',
      allowNull: false,
    },
  },
  { timestamps: false }
);

module.exports = Cars;
