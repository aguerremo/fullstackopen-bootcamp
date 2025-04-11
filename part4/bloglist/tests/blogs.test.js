const { test, after, beforeEach } = require('node:test')
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

test('blogs updated succesfully', async () => {
  const blogs = await api.get('/api/blogs') 
  const updateBlog = blogs.body[0] 
  
  console.log('Blog to update: ', updateBlog)

  updateBlog = {...Blog,
    likes: 10
  }
  
  console.log('Blog updated: ', updateBlog)

    console.log('Blog before update: ', blogs.body[0])

  await api 
  .put(`/api/blogs/${updateBlog.id}`)
  .send(updateBlog)
    .expect(204)

    const blogsUpdate = await api.get('/api/blogs')
      console.log('Blogs despues de borrar el blog: ', blogsUpdate.body)
    assert.strictEqual(blogsUpdate.body.length, blogs.body.length - 1)

})

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



test('blogs have id property instead of _id', async () => {
  const response = await api.get('/api/blogs')

 response.body.forEach(blog =>{
  assert.ok(blog.id)
 })
})



test('blogs are returned at JSON', async () => {
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