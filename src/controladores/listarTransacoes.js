const pool = require('../conexão/conexao')

const listarTransacoesUsuario = async (req, res) => {
    const { usuario } = req

    try {
        const { rows } = await pool.query('select * from transacoes where usuario_id = $1', [usuario.id])

        const { rows: categoria } = await pool.query('select * from categorias where id = $1', [rows[0].categoria_id])

        const transacoes = []

        for (const transacao of rows) {
            transacoes.push(
                {
                    "id": transacao.id,
                    "tipo": transacao.tipo,
                    "descricao": transacao.descricao,
                    "valor": transacao.valor,
                    "data": transacao.data,
                    "usuario_id": transacao.usuario_id,
                    "categoria_id": transacao.categoria_id,
                    "categoria_nome": categoria[0].descricao
                })
        }


        return res.status(200).json(transacoes)
    } catch (error) {
        return res.status(500).json({ "mensagem": "Erro no servidor." })
    }

}

module.exports = { listarTransacoesUsuario }