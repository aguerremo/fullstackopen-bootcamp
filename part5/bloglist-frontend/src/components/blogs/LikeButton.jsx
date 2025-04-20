import blogService from "../../services/blogs"
import { useState } from "react"

const Likes = ({id, likes}) => {
  
const [newlikes, setNewLikes] = useState(likes)

  const addLike = async (event) => {

    event.preventDefault()
    try {
      setNewLikes(newlikes + 1)
      const like = await blogService.update(id, {likes: newlikes + 1})
      
    console.log('succes!', like)

    } catch (error){
      console.log('Error')
    }
  }

  return(
    <div>
             <em>Likes:</em> {newlikes} {}
    <button onClick={addLike}>❤</button>

    </div>
  )

}

export default Likes