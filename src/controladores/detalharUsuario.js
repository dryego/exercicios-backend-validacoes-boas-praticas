const detralarUsuario = async (req, res) => {
    try {
        if (!req.usuario) {
            return res.status(500).json({ mensagem: 'Para acessar este recurso um token de autenticação válido deve ser enviado.' });
        }

        return res.json(req.usuario);

    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno.' });
    }

}

module.exports = {
    detralarUsuario
}