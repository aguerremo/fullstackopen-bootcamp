const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert')
const Blog = require('../models/blog')


const api = supertest(app)

const initialBlogs = [
  {
    title: 'Titulo de prueba 1',
    author: 'Author 1',
    url: 'www.google.test.com',
    likes: 6
  },
  {
    title: 'Titulo de prueba 2',
    author: 'Author 2',
    url: 'www.amazon.test.com',
    likes: 6
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})

  const blog1 = new Blog(initialBlogs[0])
  await blog1.save()

  const blog2 = new Blog(initialBlogs[1])
  await blog2.save()
})

test.only('blogs added succesfully', async () => {
  const newBlog = {
    title: 'Prueba post 3',
    author: 'Author prueba 3',
    url: 'www.facebook.test.com',
    likes: 2
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

})

test.only('blogs are returned at JSON', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are two blogs', async () => {
  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, initialBlogs.length)
})

test('the first blog is about pruebas', async () => {
  const response = await api.get('/api/blogs')

  const titles = response.body.map(e => e.title)
  assert(titles.some(title => title.includes('prueba')))
})

after(async () => {
  await mongoose.connection.close()
})