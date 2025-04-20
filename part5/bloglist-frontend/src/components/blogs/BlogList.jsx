import Blog from "./Blog"

const BlogList = ({blogs, user, setBlogs}) => {
  

  return(
    <div>
      <h3>Blog list:</h3>
        {blogs
          .sort((a,b) => b.likes - a.likes)
          .map(blog => (
          <div key={blog.id}>
            <Blog blog={blog} setBlogs={setBlogs} user={user}/>
          </div>
  
          ))
        }
    </div>
  )
}

export default BlogList