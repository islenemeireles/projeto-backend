const { Sequelize } = require('sequelize');

//configurações do banco de dados
const database = 'mydatabase'; //nome do banco de dados
const username = 'root';       //nome de usuário do MySQL
const password = 'root';       //senha do MySQL
const host = 'localhost';      //host do MySQL

const sequelize = new Sequelize(database, username, password, {
  host: host,
  dialect: 'mysql',
  port: 3306, //porta do MySQL
  logging: false, //desativa o logging SQL
  define: {
    timestamps: true, //adiciona createdAt e updatedAt por padrão
  },
});

module.exports = sequelize;
