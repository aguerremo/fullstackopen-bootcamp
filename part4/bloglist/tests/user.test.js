const bcrypt = require('bcrypt')
const User = require('../models/User')
const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const assert = require('node:assert')
const {describe, beforeEach, test, after} = require('node:test')

const api = supertest(app)

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('pswd', 10)
    const user = new User({ username: 'testUser', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersInDb = async () => {
      const users = await User.find({})
      return users.map(u => u.toJSON())
    }
    const usersAtStart = await usersInDb()

    console.log(usersAtStart)

    const newUser = {
      username: 'aguerremo',
      name: 'Alfonso Guerrero',
      password: 'tryTest@1',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    assert(usernames.includes(newUser.username))
  })
})

after(async () => {
  await mongoose.connection.close()
})