const knex = require('../conexão/conexao')
const { buscarTransacaoId, buscarTransacao, buscarCategoria } = require('../utils/FuncoesDeValidacoes')

const listarTransacoesUsuario = async (req, res) => {
    const { usuario } = req
    const { filtro } = req.query

    try {

        const filtrado = []

        const transacoesUsuario = await buscarTransacao(usuario);

        const transacoes = []

        for (const transacao of transacoesUsuario) {
            const categoria = await knex('categorias').where({ id: transacao.categoria_id }).first();
            transacoes.push(
                {
                    "id": transacao.id,
                    "tipo": transacao.tipo,
                    "descricao": transacao.descricao,
                    "valor": transacao.valor,
                    "data": transacao.data,
                    "usuario_id": transacao.usuario_id,
                    "categoria_id": transacao.categoria_id,
                    "categoria_nome": categoria.descricao
                })
        }
        if (filtro) {
            for (const categoria of filtro) {
                for (const transacao of transacoes) {
                    if (transacao.categoria_nome.toLowerCase() === categoria.toLowerCase()) {
                        filtrado.push(transacao)
                    }
                }
            }

            return res.status(200).json(filtrado)
        }


        return res.status(200).json(transacoes);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ "mensagem": error.message })
    }

}

const detalheTransacaoUsuarioLogado = async (req, res) => {
    const { id } = req.params;
    const { usuario } = req

    try {

        const buscaTransacao = await buscarTransacaoId(usuario, id);

        if (buscaTransacao === undefined) {
            return res.status(400).json({ mensagem: 'Transação não encontrada' });
        }

        const buscarCategoria = await knex('categorias').where({ id: buscaTransacao.categoria_id }).first(); //pool.query('select descricao from categorias where id = $1', [buscaTransacao.categoria_id])

        return res.status(200).json({
            "id": buscaTransacao.id,
            "tipo": buscaTransacao.tipo,
            "descricao": buscaTransacao.descricao,
            "valor": buscaTransacao.valor,
            "data": buscaTransacao.data,
            "usuario_id": buscaTransacao.usuario_id,
            "categoria_id": buscaTransacao.categoria_id,
            "categoria_nome": buscarCategoria.descricao
        });


    } catch (error) {
        console.log(error);
        return res.status(500).json({ mensagem: 'Erro interno.' })
    }


}

const cadastrarTransacaoUsuario = async (req, res) => {
    const { tipo, descricao, valor, data, categoria_id } = req.body
    const { usuario } = req
    try {

        if (tipo.toLowerCase() !== "entrada" && tipo.toLowerCase() !== "saida") {
            return res.status(400).json({ "mensagem": "Tipo inválido." })
        }

        const categoria = await buscarCategoria(categoria_id);

        if (!categoria) {
            return res.status(404).json({ "mensagem": "Categoria inválida." })
        }

        const [novaTransacao] = await knex('transacoes')
            .insert({ descricao, valor, data, categoria_id, usuario_id: usuario.id, tipo }).returning('*');

        const transacao = {
            "id": novaTransacao.id,
            "tipo": novaTransacao.tipo,
            "descricao": novaTransacao.descricao,
            "valor": novaTransacao.valor,
            "data": novaTransacao.data,
            "usuario_id": novaTransacao.usuario_id,
            "categoria_id": novaTransacao.categoria_id,
            "categoria_nome": categoria.descricao
        }


        return res.status(201).json(transacao)
    } catch (error) {
        console.log(error);
        return res.status(500).json({ "mensagem": "Erro no servidor." })
    }
}

const editarTransacao = async (req, res) => {
    const { id } = req.params;
    const { descricao, valor, data, categoria_id, tipo } = req.body;
    const { usuario } = req

    try {
        const transacao = await buscarTransacaoId(usuario, id);

        if (transacao === undefined) {
            return res.status(400).json({ mensagem: 'Transação não encontrada' });
        }

        const buscarCategoria = await buscarCategoria(categoria_id);

        if (buscarCategoria === undefined) {
            return res.status(401).json({ mensagem: 'Categoria invalida' });
        }

        const atualizarTransacao = await knex('transacoes')
            .update({ descricao, valor, data, categoria_id, tipo })
            .where({ id: transacao.id });;

        return res.status(201).json();

    } catch (error) {
        console.log(error);
        return res.status(500).json({ mensagem: error.message });
    }
}

const extrato = async (req, res) => {
    const { usuario } = req;

    try {

        const totalEntrada = await knex('transacoes')
            .select(knex.raw('SUM(valor)'))
            .where('tipo', '=', 'entrada').first();

        const totalSaida = await knex('transacoes')
            .select(knex.raw('SUM(valor)'))
            .where('tipo', '=', 'saida').first();


        return res.status(200).json({
            entrada: Number(Object.values(totalEntrada)),
            saida: Number(Object.values(totalSaida))
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ mensagem: 'Erro no servidor.' });
    }
}

const excluirTransacaoUsuario = async (req, res) => {
    const { id } = req.params
    const { usuario } = req

    try {
        const encontrandoTransacao = await buscarTransacaoId(usuario, id);

        if (encontrandoTransacao === undefined || encontrandoTransacao.usuario_id !== usuario.id) {
            return res.status(404).json({ "mensagem": "Transação não encontrada." });
        }

        const deletandoTransacao = await knex('transacoes').delete().where({ id });

        return res.status(200).json();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ "mensagem": "Erro no servidor." });
    }
}

module.exports = {
    listarTransacoesUsuario,
    detalheTransacaoUsuarioLogado,
    cadastrarTransacaoUsuario,
    editarTransacao,
    extrato,
    excluirTransacaoUsuario
}