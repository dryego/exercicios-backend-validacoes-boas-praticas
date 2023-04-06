const joi = require('joi');

const esquemaCadastroUsuario = joi.object({
    nome: joi.string().required().messages({
        'any.required': 'Nome é um campo obrigatório.',
        'string.empty': 'ocampo nome não pode esta vazio.'

    }),
    email: joi.string().email().required().messages({
        'string.email': ' O campo email não é valido.',
        'any.required': ' O campo email é obrigatório',
        'string.empty': 'O campo email não pode esta vazio.'
    }),
    senha: joi.string().min(5).required().messages({
        'any.required': ' O campo senha é obrigatório.',
        'string.min': ' Senha tem que ter no minimo 5 caracter.',
        'string.empty': 'O campo senha não pode esta vazio.'
    })
});

const esquemasValidarTansacoes = joi.object({
    tipo: joi.string().required().messages({
        'any.required': ' O campo tipo é obrigatório.',
        'string.empty': 'O campo tipo não pode esta vazio.'
    }),
    descricao: joi.string().required().messages({
        'any.required': ' O campo descrição é obrigatório.',
        'string.empty': 'O campo descricão não pode esta vazio.'
    }),
    valor: joi.number().positive().required().messages({
        'any.required': ' O campo valor é obrigatório.',
        'number.interger': 'O campo valor não e um campo valido.'
    }),
    data: joi.date().required().messages({
        'any.required': ' O campo data é obrigatório.',
        'date.greater': 'formato de data invalido.'

    }),
    categoria_id: joi.number().required().messages({
        'any.required': ' O campo categoria é obrigatório.',
        'number.interger': 'O campo valor não e um campo valido.'
    })
});

const esquemalogin = joi.object({
    email: joi.string().email().required().messages({
        'string.email': ' O campo email não é valido.',
        'any.required': ' O campo email é obrigatório',
        'string.empty': 'O campo email não pode esta vazio.'
    }),
    senha: joi.string().min(5).required().messages({
        'any.required': ' O campo senha é obrigatório.',
        'string.min': ' Senha tem que ter no minimo 5 caracter.',
        'string.empty': 'O campo senha não pode esta vazio.'
    })
});

module.exports = {
    esquemaCadastroUsuario,
    esquemasValidarTansacoes,
    esquemalogin

}