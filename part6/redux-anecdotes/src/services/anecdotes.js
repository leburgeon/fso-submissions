import axios from "axios";

const baseURL = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseURL)
  return response.data
}

const createNew = async (content) => {
  const anecdoteObject = {content, votes: 0}
  const response = await axios.post(baseURL, anecdoteObject)
  return response.data
}

const updateAnecdote = async (updatedAnecdote) => {
  const response = await axios.put(`${baseURL}/${updatedAnecdote.id}`, updatedAnecdote)
  return response.data
}

export default { getAll, createNew, updateAnecdote }