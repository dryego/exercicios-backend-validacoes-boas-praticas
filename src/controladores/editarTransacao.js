const pool = require("../conexão/conexao");
const { validarEntradasTransacao, buscarTransacaoId } = require("./FuncoesDeValidacoes");

const editarTransacao = async (req, res) => {
    const { id } = req.params;
    const { descricao, valor, data, categoria_id, tipo } = req.body;
    const { usuario } = req

    try {
        const transacao = await buscarTransacaoId(usuario, id);

        if (transacao === undefined) {
            return res.status(400).json({ mensagem: 'Transação não encontrada' });
        }

        const validarBody = await validarEntradasTransacao(descricao, valor, data, categoria_id, tipo);

        if (validarBody.length > 0) {

            return res.status(400).json(validarBody);

        }

        const buscarCategoria = await pool.query('select descricao from categorias where id = $1', [categoria_id]);

        if (buscarCategoria.rowCount < 1) {
            return res.status(401).json({ mensagem: 'Categoria invalida' });
        }

        const atualizarTransacao = await pool.query(
            'update transacoes set descricao = $1, valor = $2, data = $3, categoria_id = $4, tipo = $5 where id = $6',
            [descricao, valor, data, categoria_id, tipo, transacao.id]);

        return res.status(201).json();

    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro no servidor.' });
    }
}

module.exports = {
    editarTransacao
}