const pool = require("../conexão/conexao");

const listarCategorias = async (req, res) => {
    try {
        const buscarCategorias = await pool.query('select * from categorias');

        return res.status(200).json(buscarCategorias.rows);

    } catch (error) {
        return res.status(500).json({ mensagem: 'erro no servidor.' });
    }

}

module.exports = { listarCategorias };