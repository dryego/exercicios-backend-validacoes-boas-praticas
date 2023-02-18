const cadastroUsuario = (req, res) => {
    const { nome, email, senha } = req.body;

    //função de validação nome e email;
    // função para validar senha;

    res.status(200).json({ mensagem: 'teste ok.' });
};

module.exports = {
    cadastroUsuario
}