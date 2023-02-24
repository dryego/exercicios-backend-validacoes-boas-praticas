const pool = require('../conexão/conexao');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const key = require('../senha')

const login = async (req, res) => {
    const { email, senha } = req.body

    try {
        if (!email) {
            return res.status(400).json({ mensagem: 'Email é um campo obrigatório.' });
        }

        if (!senha) {
            return res.status(400).json({ mensagem: 'Senha é um campo obrigatório.' });
        }

        const localizarUsuario = await pool.query('select * from usuarios where email = $1', [email]);


        if (localizarUsuario.rowCount < 1) {
            return res.status(401).json({ "mensagem": "Usuário e/ou senha inválido(s)." })
        }

        const verificacaoSenha = await bcrypt.compare(senha, localizarUsuario.rows[0].senha)

        if (!verificacaoSenha) {
            return res.status(401).json({ "mensagem": "Usuário e/ou senha inválido(s)." })
        }

        const token = jwt.sign({ eu: localizarUsuario.rows[0].id }, key, { expiresIn: '8h' })

        const { senha: _, ...usuario } = localizarUsuario.rows[0]

        return res.status(200).json({ usuario, token })
    } catch (error) {
        return res.status(500).json({ mensagem: "Error no servidor." })
    }
}

module.exports = login