const express = require('express');
const router = express.Router();
const optionController = require('../controllers/optionController');

//criar uma nova opção
router.post('/', optionController.createOption);

//listar todas as opções
router.get('/', optionController.getAllOptions);

//obter uma opção pelo ID
router.get('/:id', optionController.getOptionById);

//atualizar uma opção pelo ID
router.put('/:id', optionController.updateOption);

//deletar uma opção pelo ID
router.delete('/:id', optionController.deleteOption);

module.exports = router;
