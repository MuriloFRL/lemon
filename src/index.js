const express = require('express')
const app = express()
const clientRoutes = require('./client/routes/client.router')
const swagger = require('swagger-ui-express')
const swaggerJson = require('./docs/swagger.json')

require('dotenv').config()

const port = process.env.PORT || 8080
const apiVersion = process.env.API_VERSION || 'v1'
const apiBasePath = `/api/${apiVersion}`

app.use(express.json())
app.use(`${apiBasePath}/client`, clientRoutes)
app.use(apiBasePath, swagger.serve, swagger.setup(swaggerJson))

app.listen(port, () => console.log(`server running at port ${port}`))
