const pool = require("../conexão/conexao")

const detalheTransacaoUsuarioLogado = async (req, res) => {
    const { id } = req.params;
    const { usuario } = req

    try {

        const detalhesTransacoes = await pool.query('select * from transacoes where usuario_id = $1', [usuario.id]);

        const buscaIdTransacao = detalhesTransacoes.rows.find(busca => busca.id == id)

        // const buscarIdCategoria = detalhesTransacoes.rows.find(busca => busca.categoria_id);

        if (buscaIdTransacao === undefined) {
            return res.status(400).json({ mensagem: 'Transação não encontrada' });
        }

        return res.status(200).json(buscaIdTransacao);

    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno.' })
    }

}

module.exports = {
    detalheTransacaoUsuarioLogado
}