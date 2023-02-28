const express = require('express');
const { atualizarUsuario } = require('../controladores/atualizarUsuario');
const { cadastrarTransacaoUsuario } = require('../controladores/cadastrarTransacao');
const { cadastroUsuario } = require('../controladores/cadastroUsuario');
const { detralarUsuario } = require('../controladores/detalharUsuario');
const { detalheTransacaoUsuarioLogado } = require('../controladores/detalheTransacaoUsuarioLogado');
const { excluirTransacaoUsuario } = require('../controladores/excluirTransacao');
const login = require('../controladores/fazerLogin');
const { listarCategorias } = require('../controladores/ListarCategorias');
const { listarTransacoesUsuario } = require('../controladores/listarTransacoes');
const { validadorToken } = require('../intermediarios/validandoToken');

const rotas = express.Router();

rotas.post('/usuario', cadastroUsuario);
rotas.post('/login', login)

rotas.use(validadorToken)

rotas.get('/usuario', detralarUsuario);
rotas.put('/usuario', atualizarUsuario)
rotas.get('/categoria', listarCategorias)
rotas.get('/transacao', listarTransacoesUsuario)
rotas.get('/transacao/:id', detalheTransacaoUsuarioLogado);
rotas.post('/transacao', cadastrarTransacaoUsuario)
rotas.delete('/transacao/:id', excluirTransacaoUsuario)

module.exports = rotas