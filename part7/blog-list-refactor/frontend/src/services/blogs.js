import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (userToken) => {
  token = userToken
}

const getAuthConfig = () => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (blogToCreate) => {
  // config object for seding with the axios post request

  const response = await axios.post(baseUrl, blogToCreate, getAuthConfig())
  console.log(response.data)
  return response.data
}

const update = async (blogToUpdate) => {
  const response = await axios.put(
    `${baseUrl}/${blogToUpdate.id}`,
    blogToUpdate,
  )
  return response.data
}

const deleteBlog = async (blogID) => {
  return await axios.delete(`${baseUrl}/${blogID}`, getAuthConfig())
}

const comment = async (blogId, comment) => {
  const commentData = { comment }
  const response = await axios.post(`${baseUrl}/${blogId}/comments`, commentData)
  return response
}

export default { getAll, setToken, create, update, deleteBlog, comment }
