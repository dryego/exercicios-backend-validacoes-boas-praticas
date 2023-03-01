const pool = require('../conexão/conexao');

const validarEntradas = async (nome, email, senha) => {
    const erros = [];

    if (!nome) {
        erros.push({ mensagem: 'Nome é um campo obrigatório.' });
    }

    if (!email) {
        erros.push({ mensagem: 'Email é um campo obrigatório.' });
    }

    const validarEmail = (email) => {
        const regex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

        return regex.test(email);
    }

    if (validarEmail(email) === false) {
        erros.push({ mensagem: 'Email invalido.' })
    }

    if (!senha) {
        erros.push({ mensagem: 'Senha é um campo obrigatório.' });
    }

    return erros;
}

const buscarEmail = async (email) => {

    const localizarEmail = await pool.query('select * from usuarios where email = $1', [email]);

    if (localizarEmail.rowCount > 0) {
        return localizarEmail.rows[0].email;
    }
}

const validarEntradasTransacao = async (descricao, valor, data, categoria_id, tipo) => {
    const erros = [];

    if (!descricao) {
        erros.push({ mensagem: 'Descrição é um campo obrigatório.' });
    }

    if (!valor) {
        erros.push({ mensagem: 'Valor é um campo obrigatório.' });
    }

    if (!data) {
        erros.push({ mensagem: 'Data é um campo obrigatório.' });
    }
    if (!categoria_id) {
        erros.push({ mensagem: 'Id da categoria é um campo obrigatório.' });
    }

    if (tipo.toLowerCase() !== "saida" && tipo.toLowerCase() !== "entrada") {
        erros.push({ mensagem: 'Tipo deve ser igual a ENTRADA ou SAÍDA' });
    }

    return erros;
}

const buscarTransacaoId = async (usuario, id) => {
    const detalhesTransacoes = await pool.query('select * from transacoes where usuario_id = $1', [usuario.id]);

    const buscaTransacao = detalhesTransacoes.rows.find(buscaId => buscaId.id == id);

    return buscaTransacao;
}

module.exports = {
    validarEntradas,
    buscarEmail,
    validarEntradasTransacao,
    buscarTransacaoId
};