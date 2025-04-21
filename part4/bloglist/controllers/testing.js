const testingRouter = require('express').Router()
const Blog = require('../models/Blog')
const User = require('../models/User')

testingRouter.post('/reset', async (request, response) => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  response.status(204).end()
})

testingRouter.get('/', async (request, response, next) => {
  try{
    const blogs = await Blog.find({}).populate('user')
    response.json(blogs)
  }catch (error){
    next(error)
  }
 })

 testingRouter.post('/', async (request, response, next) => {
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


module.exports = testingRouter