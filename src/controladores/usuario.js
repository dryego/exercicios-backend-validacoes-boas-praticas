const bcrypt = require('bcrypt');
const knex = require('../conexão/conexao');
const { buscarEmail, buscarUsuario } = require('../utils/FuncoesDeValidacoes');


const cadastroUsuario = async (req, res) => {
    const { nome, email, senha } = req.body;

    try {

        if (email === await buscarEmail(email)) {
            return res.status(400).json({ mensagem: 'Já existe usuário cadastrado com o e-mail informado.' });
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10);

        const [novoUsuario] = await knex('usuarios').insert({ nome, email, senha: senhaCriptografada }).returning('*');

        const mostraUsuario = {
            id: novoUsuario.id,
            nome: novoUsuario.nome,
            email: novoUsuario.email
        };

        return res.status(201).json(mostraUsuario);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ mensagem: error.message });
    }
}

const detralarUsuario = async (req, res) => {
    try {
        if (!req.usuario) {
            return res.status(500).json({ mensagem: 'Para acessar este recurso um token de autenticação válido deve ser enviado.' });
        }

        return res.json(req.usuario);

    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno.' });
    }

}

const atualizarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body
    const { usuario } = req

    try {
        const buscar = await buscarUsuario(email);

        if (buscar !== undefined && usuario.email !== buscar.email) {
            return res.status(400).json({ mensagem: 'Já existe usuário cadastrado com o e-mail informado.' });
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10)

        const atualizandoUsuario = await knex('usuarios')
            .update({ nome, email, senha: senhaCriptografada })
            .where({ usuario_id: usuario.id })

        return res.status(204).json()
    } catch (error) {
        console.log(error);
        return res.status(500).json({ "mesangem": "Erro no servidor." })
    }
}

module.exports = {
    cadastroUsuario,
    detralarUsuario,
    atualizarUsuario
}