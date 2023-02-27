const pool = require('../conexão/conexao')

const excluirTransacaoUsuario = async (req, res) => {
    const { id } = req.params
    const { usuario } = req

    try {
        const encontrandoTransacao = await pool.query(`select * from transacoes where id = $1`, [id])

        if (encontrandoTransacao.rowCount < 1) {
            return res.status(404).json({ "mensagem": "Transação não encontrada." })
        }

        if (encontrandoTransacao.rows[0].usuario_id !== usuario.id) {
            return res.status(400).json({ "mensagem": "Transação não encontrada." })
        }

        const deletandoTransacao = await pool.query(`
        delete
        from transacoes
        where id = $1`, [id])

        return res.status(200).json()
    } catch (error) {
        return res.status(500).json({ "mensagem": "Erro no servidor." })
    }
}

module.exports = { excluirTransacaoUsuario }