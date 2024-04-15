const clientService = require('./client.service')
const { INELIGIBILITY_ERRORS, CO2_KG_PER_1KWH } = require('../utils/constants')

const makeCheckClientEligibilityEligibleInput = () => ({
  connectionType: 'bifasico',
  consumptionClass: 'comercial',
  taxModel: 'convencional',
  consumptionHistory: [3878, 9760, 5976, 2797, 2481, 5731, 7538, 4392, 7859, 4160, 6941, 4597],
})

const makeCheckClientEligibilityIneligibleInput = () => ({
  connectionType: 'bifasico',
  consumptionClass: 'rural',
  taxModel: 'azul',
  consumptionHistory: [100, 200, 300, 400, 500, 100, 200, 300, 400, 500, 100, 200],
})

describe('checkClientEligibility', () => {
  it('should return a list of razoesDeIneligibilidade and elegivel false if criteria is not matched', () => {
    const input = makeCheckClientEligibilityIneligibleInput()
    const sut = clientService.checkClientEligibility(input)

    expect(sut).toStrictEqual({
      elegivel: false,
      razoesDeInelegibilidade: [
        INELIGIBILITY_ERRORS.INVALID_TAX_MODEL,
        INELIGIBILITY_ERRORS.INVALID_CONSUMPTION_CLASS,
        INELIGIBILITY_ERRORS.INVALID_CONSUMPTION_RATE,
      ],
    })
  })

  it('should return the economiaAnualDeCO2 and elegivel true if client eligible criteria is matched', () => {
    const input = makeCheckClientEligibilityEligibleInput()
    const sut = clientService.checkClientEligibility(input)

    expect(sut).toStrictEqual({
      elegivel: true,
      economiaAnualDeCO2:
        CO2_KG_PER_1KWH * input.consumptionHistory.reduce((accumulator, currentValue) => accumulator + currentValue, 0),
    })
  })
})
