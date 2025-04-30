import { useDispatch } from 'react-redux'
import { filterAction } from '../reducers/filterReducer'

const Filter = () => {
  const dispatch = useDispatch()
  
  const handleChange = (event) =>{
    console.log(event)
      dispatch(filterAction(event.target.value))
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
        <input type="text" name="filter"
          onChange={handleChange} />
    </div>
  )
}

export default Filter