const clientController = require('./client.controller')
const clientService = require('../services/client.service')

jest.mock('../services/client.service')

const makeRegisterClientEligibilityInput = () => ({
  numeroDoDocumento: '14041737706',
  tipoDeConexao: 'bifasico',
  classeDeConsumo: 'comercial',
  modalidadeTarifaria: 'convencional',
  historicoDeConsumo: [3878, 9760, 5976, 2797, 2481, 5731, 7538, 4392, 7859, 4160, 6941, 4597],
})

describe('clientController', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })
  it('should call checkClientEligibility with the correct values', async () => {
    const input = makeRegisterClientEligibilityInput()
    const spy = jest.spyOn(clientService, 'checkClientEligibility')

    await clientController.registerClientEligibility(input)

    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith({
      connectionType: input.tipoDeConexao,
      consumptionClass: input.classeDeConsumo,
      taxModel: input.modalidadeTarifaria,
      consumptionHistory: input.historicoDeConsumo,
    })
  })

  it('should return the error message if checkClientEligibility throws', async () => {
    const error = new Error('CLIENT_SERVICE_ERROR')
    const input = makeRegisterClientEligibilityInput()

    jest.spyOn(clientService, 'checkClientEligibility').mockRejectedValueOnce(error)

    const sut = clientController.registerClientEligibility(input)

    await expect(sut).resolves.toStrictEqual(error.message)
  })

  it('should return the client eligibility', async () => {
    const input = makeRegisterClientEligibilityInput()
    const output = {
      elegivel: true,
      economiaAnualDeCO2: 5553.24,
    }

    jest.spyOn(clientService, 'checkClientEligibility').mockReturnValueOnce(output)

    const sut = await clientController.registerClientEligibility(input)

    await expect(sut).toStrictEqual(output)
  })
})
