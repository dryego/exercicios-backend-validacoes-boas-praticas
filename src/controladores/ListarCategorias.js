const knex = require("../conexão/conexao");

const listarCategorias = async (req, res) => {
    try {
        const buscarCategorias = await knex('categorias');

        return res.status(200).json(buscarCategorias);

    } catch (error) {
        return res.status(500).json({ mensagem: 'erro no servidor.' });
    }

}

module.exports = { listarCategorias };