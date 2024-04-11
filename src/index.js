const express = require('express')
const app = express()

require('dotenv').config()

const port = process.env.PORT

app.listen(port, () => {
  // eslint-disable-next-line no-undef
  return console.log(`server running at port ${port}`)
})
