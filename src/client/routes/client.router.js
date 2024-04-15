const express = require('express')
const router = express.Router()
const { registerClientEligibility } = require('../controllers/client.controller')
const schema = require('../schemas/client-eligibility-input.schema')

router.post('/eligibility', async (req, res) => {
  const { error } = schema.validate(req.body)

  if (error) {
    return res.status(400).json(error)
  }

  const result = await registerClientEligibility(req.body)

  res.status(200)
  res.json(result)

  return res.end()
})

module.exports = router
