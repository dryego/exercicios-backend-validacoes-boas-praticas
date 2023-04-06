const knex = require('../conexão/conexao');

const buscarEmail = async (email) => {

    const localizarEmail = await knex('usuarios').where({ email }).first();

    return localizarEmail.email;

}

const buscarUsuario = async (email) => {
    return await knex('usuarios').where({ email }).first();
}


const buscarTransacaoId = async (usuario, id) => {
    const detalhesTransacoes = await knex('transacoes').where({ usuario_id: usuario.id }).returning('*'); // pool.query('select * from transacoes where usuario_id = $1', [usuario.id]);

    const buscaTransacao = detalhesTransacoes.find(buscaId => buscaId.id == id);

    return buscaTransacao;
}

const buscarTransacao = async (usuario) => {
    return await knex('transacoes').where({ usuario_id: usuario.id }).returning('*');
}

const buscarCategoria = async (categoria_id) => {
    await knex('categorias').where({ id: categoria_id }).first()
}

module.exports = {
    buscarEmail,
    buscarTransacaoId,
    buscarUsuario,
    buscarTransacao,
    buscarCategoria
};