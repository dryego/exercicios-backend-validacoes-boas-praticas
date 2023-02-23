const bcrypt = require('bcrypt');
const pool = require('../conexão/conexao');
const { validarEntradas, buscarEmail } = require('./FuncoesDeValidacoes');


const cadastroUsuario = async (req, res) => {
    const { nome, email, senha } = req.body;

    try {

        const validarBody = await validarEntradas(nome, email, senha);

        console.log(await validarEntradas(nome, email, senha));

        if (validarBody.length > 0) {

            return res.status(400).json(await validarEntradas(nome, email, senha));

        }

        if (email === await buscarEmail(email)) {
            return res.status(400).json({ mensagem: 'Já existe usuário cadastrado com o e-mail informado.' });
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10);

        const novoUsuario = await pool.query('insert into usuarios (nome, email, senha) values ($1, $2, $3) returning *',
            [nome, email, senhaCriptografada]);

        const mostraUsuario = {
            id: novoUsuario.rows[0].id,
            nome: novoUsuario.rows[0].nome,
            email: novoUsuario.rows[0].email
        };

        return res.status(201).json(mostraUsuario);

    } catch (error) {
        return res.status(500).json({ mensagem: 'erro interno.' })
    }
};

module.exports = {
    cadastroUsuario
}