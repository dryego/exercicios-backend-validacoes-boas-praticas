const validarEsquemas = joiEsquema => async (req, res, next) => {
    try {
        await joiEsquema.validateAsync(req.body);

        next();

    } catch (error) {
        return res.status(404).json({ mensagem: error.message });
    }
}

module.exports = {
    validarEsquemas
}