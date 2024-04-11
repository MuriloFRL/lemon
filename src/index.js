const express = require('express')
const app = express()

require('dotenv').config()

const port = process.env.PORT

app.listen(port, () => {
  return console.log(`server running at port ${port}`)
})
