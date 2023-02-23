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

module.exports = {
    validarEntradas,
    buscarEmail
};