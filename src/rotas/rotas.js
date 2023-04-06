const express = require('express');

const { cadastroUsuario, detralarUsuario, atualizarUsuario } = require('../controladores/usuario');
const { listarTransacoesUsuario,
    extrato,
    detalheTransacaoUsuarioLogado,
    cadastrarTransacaoUsuario,
    editarTransacao,
    excluirTransacaoUsuario } = require('../controladores/trasacoes');
const { login } = require('../controladores/fazerLogin');
const { validadorToken } = require('../intermediarios/validandoToken');
const { listarCategorias } = require('../controladores/ListarCategorias');
const { validarEsquemas } = require('../intermediarios/validarEsquemas');
const { esquemaCadastroUsuario, esquemasValidarTansacoes, esquemalogin } = require('../esquemas/validacoes');

const rotas = express.Router();

rotas.post('/usuario', validarEsquemas(esquemaCadastroUsuario), cadastroUsuario);
rotas.post('/login', validarEsquemas(esquemalogin), login)

rotas.use(validadorToken)

rotas.get('/usuario', detralarUsuario);
rotas.put('/usuario', validarEsquemas(esquemaCadastroUsuario), atualizarUsuario);
rotas.get('/categoria', listarCategorias)
rotas.get('/transacao', listarTransacoesUsuario)
rotas.get('/transacao/extrato', extrato);
rotas.get('/transacao/:id', detalheTransacaoUsuarioLogado);
rotas.post('/transacao', validarEsquemas(esquemasValidarTansacoes), cadastrarTransacaoUsuario)
rotas.put('/transacao/:id', validarEsquemas(esquemasValidarTansacoes), editarTransacao);
rotas.delete('/transacao/:id', excluirTransacaoUsuario)


module.exports = rotas