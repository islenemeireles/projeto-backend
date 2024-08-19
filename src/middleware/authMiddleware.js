const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/jwtConfig');

const authenticate = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(400).json({ error: 'Token não fornecido' });
  }

  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) {
      return res.status(400).json({ error: 'Token inválido' });
    }
    req.user = decoded; //adiciona o usuário decodificado ao objeto req
    next();
  });
};

module.exports = authenticate;
