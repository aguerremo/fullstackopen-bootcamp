const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const likesTotal = blogs.reduce(function(sum, blog){
    return sum + blog.likes  
  }, 0)

  console.log('hola', likesTotal)
  
  return likesTotal
  
}

module.exports = {
  dummy,
  totalLikes
}