const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const Product = require('./product'); //importa o model de produto

const Option = sequelize.define('Option', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  product_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Product,
      key: 'id'
    },
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  shape: {
    type: DataTypes.ENUM('square', 'circle'),
    defaultValue: 'square',
  },
  radius: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  type: {
    type: DataTypes.ENUM('text', 'color'),
    defaultValue: 'text',
  },
  values: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  timestamps: true, //cria as colunas createdAt e updatedAt
});

//associações
Product.hasMany(Option, {
  foreignKey: 'product_id',
  as: 'options',
});
Option.belongsTo(Product, {
  foreignKey: 'product_id',
  as: 'product',
});

module.exports = Option;
