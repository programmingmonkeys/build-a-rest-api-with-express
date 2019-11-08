const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000

const jsonCheck = (req, res, next) => {
  if (req.body) {
    console.log(`the sky is, ${req.body.color}`)
  } else {
    console.log(null)
  }
  next()
}

app.use(jsonCheck)

app.use(express.json())

app.use(jsonCheck)

app.listen(PORT, console.log(`express listening on port: ${PORT}`))
