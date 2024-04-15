const Joi = require('joi')

module.exports = Joi.object({
  numeroDoDocumento: Joi.alternatives().try(
    Joi.string().pattern(new RegExp('^\\d{11}$')).label('CPF'),
    Joi.string().pattern(new RegExp('^\\d{14}$')).label('CNPJ')
  ),
  tipoDeConexao: Joi.string().valid('monofasico', 'bifasico', 'trifasico ').required(),
  classeDeConsumo: Joi.string().valid('comercial', 'residencial', 'industrial', 'rural', 'poderPublico').required(),
  modalidadeTarifaria: Joi.string().valid('branca', 'azul', 'verde', 'convencional').required(),
  historicoDeConsumo: Joi.array().items(Joi.number()).min(3).max(12).required(),
})
