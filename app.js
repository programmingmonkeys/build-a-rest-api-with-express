const express = require('express')
const app = express()
const mongoose = require('mongoose')
const logger = require('morgan')
const routes = require('./routes')

app.use(logger('dev'))
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/qa', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', (err) => console.error('connection error:', err))

db.once('open', () => console.log('db connection successful'))

app.use('/questions', routes)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// Error Handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500)
  res.json({
    error: {
      message: err.message,
    },
  })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Express server is listening on port: ${PORT}`))
