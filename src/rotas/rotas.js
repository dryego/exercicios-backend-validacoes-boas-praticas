const express = require('express');
const { atualizarUsuario } = require('../controladores/atualizarUsuario');
const { cadastroUsuario } = require('../controladores/cadastroUsuario');
const { detralarUsuario } = require('../controladores/detalharUsuario');
const login = require('../controladores/fazerLogin');
const { listarCategorias } = require('../controladores/ListarCategorias');
const { validadorToken } = require('../intermediarios/validandoToken');

const rotas = express.Router();

rotas.post('/usuario', cadastroUsuario);
rotas.post('/login', login)

rotas.use(validadorToken)

rotas.get('/usuario', detralarUsuario);
rotas.put('/usuario', atualizarUsuario)
rotas.get('/categoria', listarCategorias)

module.exports = rotas