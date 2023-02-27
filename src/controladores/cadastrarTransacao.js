const pool = require('../conexão/conexao')

const cadastrarTransacaoUsuario = async (req, res) => {
    const { tipo, descricao, valor, data, categoria_id } = req.body
    const { usuario } = req
    try {
        if (!tipo || !descricao || !valor || !data || !categoria_id) {
            return res.status(400).json({ "mensagem": "Todos os campos obrigatórios devem ser informados." })
        }

        if (tipo.toLowerCase() !== "entrada" && tipo.toLowerCase() !== "saida") {
            return res.status(400).json({ "mensagem": "Tipo inválido." })
        }

        const categoria = await pool.query('select * from categorias where id = $1', [categoria_id])

        if (!categoria) {
            return res.status(404).json({ "mensagem": "Categoria inválida." })
        }

        const { rows } = await pool.query(`
        insert into transacoes
        (descricao, valor, data, categoria_id, usuario_id, tipo)
        values
        ($1, $2, $3, $4, $5, $6) returning *`, [descricao, valor, data, categoria_id, usuario.id, tipo])

        const transacao = {
            "id": rows[0].id,
            "tipo": rows[0].tipo,
            "descricao": rows[0].descricao,
            "valor": rows[0].valor,
            "data": rows[0].data,
            "usuario_id": rows[0].usuario_id,
            "categoria_id": rows[0].categoria_id,
            "categoria_nome": categoria.rows[0].descricao,
        }



        return res.status(201).json(transacao)
    } catch (error) {
        return res.status(500).json({ "mensagem": "Erro no servidor." })
    }
}

module.exports = { cadastrarTransacaoUsuario }