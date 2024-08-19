const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwtConfig');

const userController = {
  //criar um novo usuário
  async createUser(req, res) {
    try {
      const { firstname, surname, email, password, confirmPassword } = req.body;

      if (!firstname || !surname || !email || !password) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
      }

      if (password !== confirmPassword) {
        return res.status(400).json({ error: 'As senhas não coincidem' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({ firstname, surname, email, password: hashedPassword });
      res.status(201).json(user);
    } catch (error) {
      console.error('Erro de validação:', error);
      res.status(400).json({ error: error.errors.map(e => e.message) });
    }
  },

  //obter um usuário pelo ID
  async getUserById(req, res) {
    try {
      const user = await User.findByPk(req.params.id);
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ error: 'Usuário não encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  //atualizar um usuário pelo ID
  async updateUser(req, res) {
    try {
      const { firstname, surname, email } = req.body;
      const userId = req.params.id;

      if (!firstname || !surname || !email) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
      }

      const user = await User.findByPk(userId);

      if (user) {
        user.firstname = firstname || user.firstname;
        user.surname = surname || user.surname;
        user.email = email || user.email;

        await user.save();

        res.status(204).send();
      } else {
        res.status(404).json({ error: 'Usuário não encontrado' });
      }
    } catch (error) {
      console.error('Erro ao atualizar o usuário:', error);
      res.status(400).json({ error: error.message });
    }
  },

  //deletar um usuário pelo ID
  async deleteUser(req, res) {
    try {
      const userId = req.params.id;

      const user = await User.findByPk(userId);

      if (user) {
        await user.destroy();
        res.status(204).send();
      } else {
        res.status(404).json({ error: 'Usuário não encontrado' });
      }
    } catch (error) {
      console.error('Erro ao deletar o usuário:', error);
      res.status(500).json({ error: error.message });
    }
  },

  //gerar o token JWT
  async generateToken(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ error: 'Email e senha são obrigatórios' });
      }

      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(400).json({ error: 'Usuário não encontrado' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: 'Senha incorreta' });
      }

      const token = jwt.sign({ id: user.id, email: user.email }, jwtConfig.jwtSecret, { expiresIn: jwtConfig.expiresIn });

      res.status(200).json({ token });
    } catch (error) {
      console.error('Erro ao gerar o token:', error);
      res.status(400).json({ error: 'Erro ao gerar o token' });
    }
  },

  //listar todos os usuários
  async searchUsers(req, res) {
    try {
      const users = await User.findAll();
      res.status(200).json(users);
    } catch (error) {
      console.error('Erro ao listar usuários:', error);
      res.status(500).json({ error: 'Erro ao listar usuários' });
    }
  }
};

module.exports = userController;
