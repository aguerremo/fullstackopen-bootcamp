import Togglable from "../Togglable"
import Likes from "./LikeButton"


const Blog = ({ blog }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  }
 
  const blogToShow = () => {
    return (
      <div>
    Author: {blog.author} 
    <br />
       URL: {blog.url}
    <br />
       Likes: {blog.likes}
      </div>
    )


  }

  return (
    <div style={blogStyle}>
      {blog.title} 
   <Togglable buttonToShow={'more info'} buttonToHide={'close'}>
      {blogToShow()}
    </Togglable>
    <Likes id={blog.id} likes={blog.likes}/>
    </div>
    )
}

  

export default Blog