const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticate = require('../middleware/authMiddleware');

//listar todos os usuários
router.get('/search', userController.searchUsers);

//criar um novo usuário (não requer autenticação)
router.post('/', userController.createUser);

//obter um usuário pelo ID (não requer autenticação)
router.get('/:id', userController.getUserById);

//atualizar um usuário pelo ID (requer autenticação)
router.put('/:id', authenticate, userController.updateUser);

//deletar um usuário pelo ID (requer autenticação)
router.delete('/:id', authenticate, userController.deleteUser);

//gerar o token JWT (não requer autenticação)
router.post('/token', userController.generateToken);

module.exports = router;
