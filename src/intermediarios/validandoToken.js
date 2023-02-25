const pool = require('../conexão/conexao')
const jwt = require('jsonwebtoken')
const key = require('../senha')

const validadorToken = async (req, res, next) => {
    const { authorization } = req.headers

    try {

        if (!authorization) {
            return res.status(401).json({ "mensagem": "Não autorizado." })
        }

        const token = authorization.split(" ")[1]

        const { id } = jwt.verify(token, key)

        const usuario = await pool.query('select * from usuarios where id = $1', [id])

        if (usuario.rowCount < 1) {
            return res.status(401).json({ "mensagem": "Não autorizado." })
        }

        next()
    } catch (error) {
        return res.status(500).json({ "mensagem": "Erro no servidor." })
    }
}

module.exports = { validadorToken }