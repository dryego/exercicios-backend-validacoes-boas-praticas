const pool = require('../conexão/conexao')
const bcrypt = require('bcrypt')

const atualizarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body
    const { usuario_id } = req

    try {
        if (!nome) {
            erros.push({ mensagem: 'Nome é um campo obrigatório.' });
        }

        if (!email) {
            erros.push({ mensagem: 'Email é um campo obrigatório.' });
        }

        if (!senha) {
            erros.push({ mensagem: 'Senha é um campo obrigatório.' });
        }

        const emailExistente = await pool.query('select * from usuarios where email = $1', [email])


        if (emailExistente.rowCount > 0) {
            return res.status(400).json({ "mensagem": "O e-mail informado já está sendo utilizado por outro usuário." })
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10)

        const atualizandoUsuario = await pool.query(`
        update usuarios
        set nome = $1, email = $2, senha = $3
        where id = $4`, [nome, email, senhaCriptografada, usuario_id])

        return res.status(200).json()
    } catch (error) {
        return res.status(500).json({ "mesangem": "Erro no servidor." })
    }
}

module.exports = {
    atualizarUsuario
}