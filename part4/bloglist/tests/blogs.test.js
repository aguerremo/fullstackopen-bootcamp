const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert')
const Blog = require('../models/blog')
const { title } = require('node:process')

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


describe('Add a blog', () => {
  test('blogs added succesfully', async () => {
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

    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, initialBlogs.length + 1)
  })
})

describe('Update a blog', () => {
  test('blogs updated succesfully', async () => {
    const blogs = await api.get('/api/blogs') 
    const blogToUpdate = blogs.body[0]
  
    console.log('Blog to update: ', blogToUpdate)

    blogToUpdate.likes = 10
  
    console.log('Blog updated: ', blogToUpdate)

    console.log('Blog after update 1: ', blogs.body)

    await api 
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogToUpdate)
      .expect(200)

    
    console.log('Blogs after update 2: ', blogs.body)
    assert.strictEqual(blogs.body[0], blogToUpdate )

  })
})

describe('Delete a blog', () => {
  test('blogs deleted succesfully', async () => {
    const blogs = await api.get('/api/blogs') 
    const deleteBlog = blogs.body[0] 

      console.log('Blogs before delete the blog: ', blogs.body)
      console.log('Blog to delete: ', deleteBlog)

    await api 
    .delete(`/api/blogs/${deleteBlog.id}`)
      .expect(204) 

      const blogsUpdate = await api.get('/api/blogs')
        console.log('Blogs after delete the blog: ', blogsUpdate.body)
      assert.strictEqual(blogsUpdate.body.length, blogs.body.length - 1)

  })
})

describe('Blog have id property', () => {
  test('blogs have id property instead of _id', async () => {
    const response = await api.get('/api/blogs')

    response.body.forEach(blog =>{
      assert.ok(blog.id)
    })
  })
})

describe('Blog at JSON', () => {
  test('blogs are returned at JSON', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
})

describe('Number of blogs', () => {
  test('there are two blogs', async () => {
    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, initialBlogs.length)
  })
})

describe('Content of first blog', () => {
  test('the first blog is about pruebas', async () => {
    const response = await api.get('/api/blogs')

    const titles = response.body.map(e => e.title)
    assert(titles.some(title => title.includes('prueba')))
  })
})

after(async () => {
  await mongoose.connection.close()
})