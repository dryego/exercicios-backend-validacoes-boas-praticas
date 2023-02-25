const express = require('express');
const { cadastroUsuario } = require('../controladores/cadastroUsuario');
const login = require('../controladores/fazerLogin');
const { validadorToken } = require('../intermediarios/validandoToken');

const rotas = express.Router();

rotas.post('/usuario', cadastroUsuario);
rotas.post('/login', login)

rotas.use(validadorToken)

module.exports = rotas