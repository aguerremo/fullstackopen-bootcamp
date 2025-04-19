import likeService from "../../services/likes"
import blogService from "../../services/blogs"
import { useState } from "react"

const Likes = ({id, likes}) => {
  
const [newlikes, setNewLikes] = useState(likes)

  const addLike = async (event) => {

    event.preventDefault()
    try {
      setNewLikes(newlikes + 1)
      const like = await likeService.update(id, {likes: newlikes + 1})
      
    console.log('succes!', like)

    setDoneMessage(blog.title + ' by '+ blog.author +' created succesfully' )

    } catch (error){
      console.log('Error')
    }
  }

  return(
    <div>
      {newlikes}
    <button onClick={addLike}>Like</button>

    </div>
  )

}

export default Likes