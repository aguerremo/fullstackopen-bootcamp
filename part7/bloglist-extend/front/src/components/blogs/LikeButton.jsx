import blogService from '../../services/blogs'
import { useState } from 'react'

const Likes = ({ id, likes, addLike }) => {
  const [newlikes, setNewLikes] = useState(likes)

  const handleClick = async (event) => {
    event.preventDefault()
    setNewLikes(newlikes + 1)
    if (addLike) {
      addLike()
    } else {
      const like = await blogService.update(id, { likes: newlikes + 1 })
      console.log('succes!', like)
    }
  }

  return (
    <div>
      <em>Likes:</em> {newlikes} {}
      <button onClick={handleClick}>❤</button>
    </div>
  )
}

export default Likes
