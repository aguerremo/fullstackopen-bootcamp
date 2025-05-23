const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const blogsRouter = require('./controllers/blogs')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

mongoose.set('strictQuery', false)

logger.info('strictQuery', false)

mongoose.connect(config.MONGO_DB_URI).then(() => {
  logger.info('connected to MongoDB')
})
.catch((error) => {
  logger.error('error connecting to MongoDB:', error.message)
})

app.use(express.static('app.js'))
app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/blogs', blogsRouter)
app.use('/api/login', loginRouter)
app.use('/api/users', usersRouter)

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
  
}


app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app