const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response, next) => {
  try{
    const blogs = await Blog.find({}).populate('user')
    response.json(blogs)
  }catch (error){
    next(error)
  }
 })

blogsRouter.get('/:id', (request, response, next) => {
  Blog.findById(request.params.id)
    .then(blog => {
      if (blog) {
        response.json(blog)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body

  const user = await User.findById(body.user)
  
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user.id
    })

    try {
      const savedBlog = await blog.save()
    
      await user.save()
      user.blogs = user.blogs.concat(savedBlog.id)
      response.json(savedBlog)

    } catch (error) {
        next(error)
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
  const body = request.body

  const blog = {
    content: body.content,
    important: body.important,
  }
try { 
  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id, 
    blog, 
    { new: true }
  )
  response.json(updatedBlog)
} catch (error) {
  next(error)
}
})

module.exports = blogsRouter