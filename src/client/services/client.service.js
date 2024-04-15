const {
  CO2_KG_PER_1KWH,
  VALID_TAX_MODEL,
  VALID_CONSUMPTION_CLASS,
  MINIMUM_CONSUMPTION_BY_CONNECTION_TYPE,
  INELIGIBILITY_ERRORS,
} = require('../utils/constants')

const checkClientEligibility = (clientData) => {
  const { consumptionHistory } = clientData

  const validateClientEligibilityCriteria = _validateClientEligibility(clientData)
  const clientEligible = validateClientEligibilityCriteria.length === 0

  if (!clientEligible) {
    return {
      elegivel: clientEligible,
      razoesDeInelegibilidade: validateClientEligibilityCriteria,
    }
  }

  return {
    elegivel: clientEligible,
    economiaAnualDeCO2: _calculateCO2Emission(
      consumptionHistory.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
    ),
  }
}

const _validateClientEligibility = (clientData) => {
  const ineligibilityReasons = []
  const isValidTaxModel = _validateClientTaxModel(clientData.taxModel)
  const isValidConsumptionClass = _validateClientConsumptionClass(clientData.consumptionClass)
  const isValidConsumptionRate = _validateClientAverageConsumption(
    clientData.consumptionHistory,
    clientData.connectionType
  )

  if (!isValidTaxModel) {
    ineligibilityReasons.push(INELIGIBILITY_ERRORS.INVALID_TAX_MODEL)
  }

  if (!isValidConsumptionClass) {
    ineligibilityReasons.push(INELIGIBILITY_ERRORS.INVALID_CONSUMPTION_CLASS)
  }

  if (!isValidConsumptionRate) {
    ineligibilityReasons.push(INELIGIBILITY_ERRORS.INVALID_CONSUMPTION_RATE)
  }

  return ineligibilityReasons
}

const _validateClientTaxModel = (clientTaxModel) =>
  VALID_TAX_MODEL.find((validTaxModel) => validTaxModel === clientTaxModel)

const _validateClientConsumptionClass = (clientConsumptionClass) =>
  VALID_CONSUMPTION_CLASS.find((validConsumptionClass) => validConsumptionClass === clientConsumptionClass)

const _validateClientAverageConsumption = (clientConsumptionHistory, clientConnectionType) => {
  const minimumConsumptionByConnectionType = _getMinimumValidConsumptionByClientConnection(clientConnectionType)
  const averageYearlyConsumption = _getClientAverageConsumption(clientConsumptionHistory)

  return averageYearlyConsumption >= minimumConsumptionByConnectionType
}

const _getClientAverageConsumption = (clientConsumptionHistory) => {
  let periodConsumption = 0

  clientConsumptionHistory.forEach((month) => (periodConsumption += month))

  return periodConsumption / clientConsumptionHistory.length
}

const _getMinimumValidConsumptionByClientConnection = (clientConnectionType) =>
  MINIMUM_CONSUMPTION_BY_CONNECTION_TYPE[clientConnectionType]

const _calculateCO2Emission = (kWh) => CO2_KG_PER_1KWH * kWh

module.exports = {
  checkClientEligibility,
}
