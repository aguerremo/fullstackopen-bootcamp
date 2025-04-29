const Filter = () => {


  const handleChange = (event) =>{
    console.log(event)
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
        <input type="text" name="filter"
          onChange={() => handleChange('ALL')} />
    </div>
  )
}

export default Filter