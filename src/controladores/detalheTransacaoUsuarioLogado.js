const pool = require("../conexão/conexao")

const detalheTransacaoUsuarioLogado = async (req, res) => {
    // try {
    const id = req.usuario.id;
    console.log(id);

    if (!id) {
        return res.status(400).json({ mensagem: 'Transação não encontrada.' })
    }

    const detalhesTransacoes = await pool.query('select from transacoes where usuario_id = $1', [id]);

    return res.status(200).json({ detalhesTransacoes });
    // } catch (error) {
    //     return res.status(500).json({ mensagem: 'Erro interno.' })
    // }

}

module.exports = {
    detalheTransacaoUsuarioLogado
}