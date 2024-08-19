const express = require('express');
const sequelize = require('./config/connection');
const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');
const imageRoutes = require('./routes/imageRoutes');
const optionRoutes = require('./routes/optionRoutes');
const productCategoryRoutes = require('./routes/productCategoryRoutes');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
app.use(bodyParser.json());
app.use(express.json());
app.post('/token', (req, res) => {
  //gera o token (não precisa de autenticação)
});
app.use('/v1/user', userRoutes);
app.use('/v1/category', categoryRoutes);
app.use('/v1/product', productRoutes);
app.use('/v1/image', imageRoutes);
app.use('/v1/option', optionRoutes);
app.use('/v1/product-category', productCategoryRoutes);

const syncDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
    await sequelize.sync(); // sincroniza os models com o banco de dados
    console.log('Modelos sincronizados com o banco de dados.');
  } catch (error) {
    console.error('Não foi possível conectar ao banco de dados:', error);
  }
};

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
  syncDatabase();
});