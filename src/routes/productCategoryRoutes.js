const express = require('express');
const router = express.Router();
const productCategoryController = require('../controllers/productCategoryController');

//criar uma nova associação entre produto e categoria
router.post('/', productCategoryController.createProductCategory);

//listar todas as associações entre produtos e categorias
router.get('/', productCategoryController.getProductCategories);

//obter uma associação específica pelo ID
router.get('/:product_id/:category_id', productCategoryController.getProductCategoryById);

//deletar uma associação entre produto e categoria
router.delete('/:product_id/:category_id', productCategoryController.deleteProductCategory);

module.exports = router;
