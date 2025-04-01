const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title:{
    type: String,
    required: [true, 'Title required'],
    minLength: 1
  },
  author: {
    type: String,
    required: [true, 'Author required'],
    minLength: 1
  },
  url:{
    type: String,
    required: [true, 'URL required'],
    minLength: 1
  },
  likes:{
    type: Number,
    required: [true, 'Likes required']
  }
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema)
