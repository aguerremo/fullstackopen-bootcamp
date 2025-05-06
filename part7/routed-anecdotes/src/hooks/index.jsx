import { useState } from 'react'


export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const zero = () => {
    setValue('')
  }

  return {
    props:{
    type,
    value,
    onChange
    },

    zero
  }
}

