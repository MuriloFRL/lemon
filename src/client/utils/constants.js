const VALID_CONSUMPTION_CLASS = ['comercial', 'residencial', 'industrial']
const VALID_TAX_MODEL = ['convencional', 'branca']
const MINIMUM_CONSUMPTION_BY_CONNECTION_TYPE = { monofasico: 400, bifasico: 500, trifasico: 750 }
const CO2_KG_PER_1KWH = 0.084
const INELIGIBILITY_ERRORS = {
  INVALID_CONSUMPTION_RATE: 'Consumo muito baixo para tipo de conexão',
  INVALID_CONSUMPTION_CLASS: 'Classe de consumo não aceita',
  INVALID_TAX_MODEL: 'Modalidade tarifária não aceita',
}

module.exports = {
  VALID_CONSUMPTION_CLASS,
  VALID_TAX_MODEL,
  MINIMUM_CONSUMPTION_BY_CONNECTION_TYPE,
  CO2_KG_PER_1KWH,
  INELIGIBILITY_ERRORS,
}
