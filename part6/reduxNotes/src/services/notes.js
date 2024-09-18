import axios from 'axios'

const baseURL = 'http://localhost:3001/notes'

const getAll = async () => {
  const response  = await axios.get(baseURL)
  return response.data
}

const createNew = async (content) => {
  const noteObject = {content, important: false}
  const response = await axios.post(baseURL, noteObject)
  return response.data
}

const updateNote = async (noteObject) => {
  const response = await axios.put(`${baseURL}/${noteObject.id}`, noteObject)
  return response.data
}

export default { getAll, createNew, updateNote }