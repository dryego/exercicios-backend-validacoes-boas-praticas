const express = require('express');
const { cadastroUsuario } = require('../controladores/cadastroUsuario');
const login = require('../controladores/fazerLogin');

const rotas = express.Router();

rotas.post('/usuario', cadastroUsuario);
rotas.post('/login', login)

module.exports = rotas