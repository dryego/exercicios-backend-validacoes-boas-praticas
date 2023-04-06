const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const knex = require('../conexão/conexao');
const { buscarUsuario } = require('../utils/FuncoesDeValidacoes');

const login = async (req, res) => {
    const { email, senha } = req.body

    try {

        const localizarUsuario = await buscarUsuario(email);

        if (localizarUsuario === undefined) {
            return res.status(401).json({ "mensagem": "Usuário e/ou senha inválido(s)." })
        }

        const verificacaoSenha = await bcrypt.compare(senha, localizarUsuario.senha)

        if (!verificacaoSenha) {
            return res.status(401).json({ "mensagem": "Usuário e/ou senha inválido(s)." })
        }

        const token = jwt.sign({ id: localizarUsuario.id }, process.env.SENHA_TOKEN, { expiresIn: '8h' })

        const { senha: _, ...usuario } = localizarUsuario

        return res.status(200).json({ usuario, token })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ mensagem: error.message });
    }
}

module.exports = {
    login
}