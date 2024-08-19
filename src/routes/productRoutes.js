const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authMiddleware');
const productController = require('../controllers/productController');

//obter uma lista de produtos
router.get('/search', productController.getProducts);

//obter informações do produto pelo ID
router.get('/:id', productController.getProductById);

//criar um produto
router.post('/', authenticate, productController.createProduct);

//atualizar um produto
router.put('/:id', authenticate, productController.updateProduct);

//deletar um produto pelo ID
router.delete('/:id', authenticate, productController.deleteProduct);

module.exports = router;
