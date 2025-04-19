import { useState } from "react"

const Likes = () => {

const [likes, setLikes] = useState(0)

  return(
    <div>
      {likes}
    <button>Like</button>

    </div>
  )

}

export default Likes