import { useState, useEffect } from "react";
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    if (!name) {
      setCountry(null)
      return
    }
    axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
      .then(response => {
        console.log("API response:", response.data)
        setCountry({
          found: true,
          data: response.data
        })
        console.log("Country data:", response.data)
        console.log('country 1:', country)
      })
      .catch(() => {
        setCountry({
          found: false
        })
      })
  }, [name])

  return country
}

export { useField, useCountry }