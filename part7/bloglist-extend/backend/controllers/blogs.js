const blogsRouter = require('express').Router()
const Blog = require('../models/Blog')
const User = require('../models/User')
const jwt = require('jsonwebtoken')


blogsRouter.get('/', async (request, response, next) => {
  try{
    const blogs = await Blog.find({}).populate('user')
    response.json(blogs)
  }catch (error){
    next(error)
  }
 })

blogsRouter.get('/:id', async (request, response, next) => {
  const blog = await Blog.findById(request.params.id)
  try{
    if (blog) {
      response.json(blog)
    } else {
      response.status(404).end()
    }
  } catch (error) {
    next (error)
  }     
})

const getTokenFrom = request => {
  console.log('Funciona 1')
  const authorization = request.get('authorization')
  console.log('Funciona 2', authorization)
    if(authorization && authorization.startsWith('Bearer ')){
      console.log('Funciona 3')
      return authorization.replace('Bearer ', '') 
    }
    console.log('Funciona 3.1')
    return null
  
}

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body

  const token = getTokenFrom(request)

  let decodedToken

  try {
    decodedToken = jwt.verify(token, process.env.SECRET)
  } catch {}
  
  if (!token || !decodedToken.id) {

    return response.status(401).json({ error: 'token invalid'})
  } else {

    const user = await User.findById(decodedToken.id)
  
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user.id
    })

    try {
      const savedBlog = await blog.save()
      user.blogs = user.blogs.concat(savedBlog.id)
      await user.save()
      response.json(savedBlog)

    } catch (error) {
        next(error)
    }


  }
  
})


blogsRouter.delete('/:id', async (request, response, next) => {
  
  try {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()

  }catch (error) { 
    next(error)
  }
    
})

blogsRouter.put('/:id', async (request, response, next) => {
try { 
  const blog = await Blog.findById(request.params.id)
  blog.likes += 1

  const updatedBlog = await blog.save()
  response.json(updatedBlog)
  
} catch (error) {
  next(error)
}
})

blogsRouter.post('/:id/comments', async (request, response, next) => {
  const { id } = request.params
  const { comment } = request.body
  
  try {
    const blog = await Blog.findById(id)
    if (!blog) {
      return response.status(404).json({ error: 'Blog not found' })
    }

    blog.comments = blog.comments.concat(comment)
    const updatedBlog = await blog.save()

    response.status(201).json(updatedBlog)
  } catch (error) {
    next(error)
  }
})

module.exports = blogsRouter