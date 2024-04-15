const { checkClientEligibility } = require('../services/client.service')

const registerClientEligibility = async (clientData) => {
  try {
    return await checkClientEligibility({
      connectionType: clientData.tipoDeConexao,
      consumptionClass: clientData.classeDeConsumo,
      taxModel: clientData.modalidadeTarifaria,
      consumptionHistory: clientData.historicoDeConsumo,
    })
  } catch (error) {
    console.log(
      JSON.stringify({
        path: 'clientController :: registerClientEligibility',
        message: error.message,
      })
    )

    return error.message
  }
}

module.exports = {
  registerClientEligibility,
}
