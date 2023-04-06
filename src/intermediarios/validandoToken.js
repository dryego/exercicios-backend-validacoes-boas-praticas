const jwt = require('jsonwebtoken')
const knex = require('../conexão/conexao')

const validadorToken = async (req, res, next) => {
    const { authorization } = req.headers

    try {

        if (!authorization) {
            return res.status(401).json({ "mensagem": "Não autorizado." })
        }

        const token = authorization.split(" ")[1]

        const { id } = jwt.verify(token, process.env.SENHA_TOKEN)

        const usuario = await knex('usuarios').where({ id }).first();

        if (usuario === undefined) {
            return res.status(401).json({ "mensagem": "Não autorizado." })
        }

        req.usuario = usuario

        next()
    } catch (error) {
        return res.status(500).json({ "mensagem": error.message })
    }
}

module.exports = {
    validadorToken

}