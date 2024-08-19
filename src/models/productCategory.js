const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const Product = require('./product'); //importa o model de produto
const Category = require('./category'); //importa o model de categoria

const ProductCategory = sequelize.define('ProductCategory', {
  product_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Product,
      key: 'id',
    },
    allowNull: false,
  },
  category_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Category,
      key: 'id',
    },
    allowNull: false,
  }
}, {
  timestamps: false, //nao cria createdAt e updatedAt para a tabela de junção
});

Product.belongsToMany(Category, { through: ProductCategory });
Category.belongsToMany(Product, { through: ProductCategory });

module.exports = ProductCategory;
