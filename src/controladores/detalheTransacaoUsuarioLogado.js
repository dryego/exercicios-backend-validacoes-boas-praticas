const pool = require("../conexão/conexao")

const detalheTransacaoUsuarioLogado = async (req, res) => {
    const { id } = req.params;
    const { usuario } = req

    try {

        const detalhesTransacoes = await pool.query('select * from transacoes where usuario_id = $1', [usuario.id]);

        const buscaTransacao = detalhesTransacoes.rows.find(buscaId => buscaId.id == id);

        if (buscaTransacao === undefined) {
            return res.status(400).json({ mensagem: 'Transação não encontrada' });
        }

        const buscarCategoria = await pool.query('select descricao from categorias where id = $1', [buscaTransacao.categoria_id])

        return res.status(200).json({
            "id": buscaTransacao.id,
            "tipo": buscaTransacao.tipo,
            "descricao": buscaTransacao.descricao,
            "valor": buscaTransacao.valor,
            "data": buscaTransacao.data,
            "usuario_id": buscaTransacao.usuario_id,
            "categoria_id": buscaTransacao.categoria_id,
            "categoria_nome": buscarCategoria.rows[0].descricao
        });


    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno.' })
    }


}

module.exports = {
    detalheTransacaoUsuarioLogado
}