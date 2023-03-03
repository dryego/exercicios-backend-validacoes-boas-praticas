const { object } = require("yup");
const pool = require("../conexão/conexao");

const extrato = async (req, res) => {
    const { usuario } = req;

    try {

        const totalEntrada = await pool.query(
            'select sum(valor) from transacoes where usuario_id = $1 and tipo = $2',
            [usuario.id, 'entrada']);

        const totalSaida = await pool.query(
            'select sum(valor) from transacoes where usuario_id = $1 and tipo = $2',
            [usuario.id, 'saida']);

        return res.status(200).json({
            entrada: Number(Object.values(totalEntrada.rows[0])),
            saida: Number(Object.values(totalSaida.rows[0]))
        });

    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro no servidor.' });
    }
}


module.exports = {
    extrato
}