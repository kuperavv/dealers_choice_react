const db = require('../db');
const { TEXT } = db.Sequelize;

const CarImages = db.define(
  'carImages',
  {
    image: {
      type: TEXT,
      defaultValue: 'default.jpeg',
      allowNull: false,
    },
  },
  { timestamps: false }
);

module.exports = CarImages;
