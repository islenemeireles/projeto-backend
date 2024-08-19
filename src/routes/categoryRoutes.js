const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const authenticate = require('../middleware/authMiddleware');

//buscar todas as categorias com filtros e paginação
router.get('/search', categoryController.getCategories);

//obter uma categoria pelo ID
router.get('/:id', categoryController.getCategoryById);

//criar uma nova categoria
router.post('/', authenticate, categoryController.createCategory);

//atualizar uma categoria
router.put('/:id', authenticate, categoryController.updateCategory);

//deletar uma categoria
router.delete('/:id', authenticate, categoryController.deleteCategory);

module.exports = router;
