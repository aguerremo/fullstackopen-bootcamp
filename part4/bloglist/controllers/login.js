const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const loginRouter = require('express').Router()
const User = require('../models/User')

loginRouter.post('/', async (request, response) => {
  const { body } = request
  const { username, password} = body

  const user = await User.findOne({ username })

  const passwordCorrect = user === null
  ? false
  : await bcrypt.compare(password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid user or password'
    })
  }

  const userForToken = {
    id: user._id, //Probr con .id
    username: user.username
  }

  const token = jwt.sign(userForToken, process.env.SECRET) 

  response.send({
    name: user.name,
    username: user.username,
    token,
    id: user._id,
  })
})

module.exports = loginRouter