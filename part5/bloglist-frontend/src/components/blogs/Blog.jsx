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

  return (
    <div style={blogStyle}>
      {blog.title} 
   <Togglable buttonToShow={'more info'} buttonToHide={'close'}>
       Author: {blog.author} 
    <br />
       URL: {blog.url}
    <br />
       Likes: {blog.likes}
       
    </Togglable>
    <Likes/>
    </div>
    )
}

  

export default Blog