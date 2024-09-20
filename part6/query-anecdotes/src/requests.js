import axios from "axios";

const baseURL = 'http://localhost:3001/anecdotes'

export const getAnecdotes = async () => {
  const res = await axios.get(baseURL);
  return res.data;
}

export const addAnecdote = async (anecdoteObject) => {
  const res = await axios.post(baseURL, anecdoteObject)
  return res.data
}

export const updateAnecdote = async (updatedAnecdote) => {
  const res = await axios.put(`${baseURL}/${updatedAnecdote.id}`, updatedAnecdote)
  return res.data
}