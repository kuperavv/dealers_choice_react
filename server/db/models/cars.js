const db = require('../db');
const { STRING, INTEGER, DECIMAL, TEXT } = db.Sequelize;

const Cars = db.define('cars', {
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
    type: INTEGER,
    allowNull: false,
    defaultValue: '2008',
  },
  price: {
    type: DECIMAL(10, 2),
    allowNull: false,
    defaultValue: '1000.00',
  },
  image: {
    type: TEXT,
    defaultValue: 'default.jpeg',
    allowNull: false,
  },
});

module.exports = Cars;
