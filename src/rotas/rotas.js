const express = require('express');
const { cadastroUsuario } = require('../controladores.js/cadastroUsuario');

const rotas = express.Router();

rotas.post('/usuario', cadastroUsuario);

module.exports = rotas