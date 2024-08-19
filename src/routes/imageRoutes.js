const express = require('express');
const router = express.Router();
const imageController = require('../controllers/imageController');

//criar uma nova imagem
router.post('/', imageController.createImage);

//listar todas as imagens
router.get('/', imageController.getAllImages);

//obter uma imagem pelo ID
router.get('/:id', imageController.getImageById);

//atualizar uma imagem pelo ID
router.put('/:id', imageController.updateImage);

//deletar uma imagem pelo ID
router.delete('/:id', imageController.deleteImage);

module.exports = router;
