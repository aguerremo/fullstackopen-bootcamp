import { useState, useEffect } from 'react'
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

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])


const getAll = async () => {
  const response = await axios.get(baseUrl)
  setResources(response.data)
  return response.data
}

const create = async newObject => {
  const response = await axios.post(baseUrl, newObject)
  setResources(resources.concat(response.data))
  return response.data
}

const update = async (id, newObject) => {
  const response = await axios.put(`${ baseUrl }/${id}`, newObject)
  setResources(resources.concat(response.data))
  return response.data
}

  useEffect(() => {
    getAll()
  }, [baseUrl])

  const service = {
    create,
    update
  }

  return [
    resources, service
  ]

}

export { useField, useResource
}