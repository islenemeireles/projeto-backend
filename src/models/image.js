const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const Product = require('./product'); //importa o model de produto

const Image = sequelize.define('Image', {
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
  enabled: {
    type: DataTypes.BOOLEAN,
    defaultValue: true, //correção: deve ser true/false
  },
  path: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: { //nova coluna adicionada
    type: DataTypes.STRING, //tipo de dados VARCHAR no MySQL
    allowNull: true, 
  },
}, {
  timestamps: true, //cria as colunas createdAt e updatedAt
});

//definindo associações
Product.hasMany(Image, {
  foreignKey: 'product_id',
  as: 'images',
});
Image.belongsTo(Product, {
  foreignKey: 'product_id',
  as: 'product',
});

module.exports = Image;
