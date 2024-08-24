import axios from 'axios'
const baseUrl = '/api/blogs'

console.log("token set to null")
let token = null

const setToken = userToken => {
  console.log('token set to usertoken', userToken)
  token = userToken
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async blogToCreate => {
  // config object for seding with the axios post request
  const config = {
    headers : {
      Authorization : `Bearer ${token}`
    }
  }

  const response = await axios.post(baseUrl, blogToCreate, config)
  return response.data
}

const update = async blogToUpdate => {

  const response = await axios.put(`${baseUrl}/${blogToUpdate.id}`, blogToUpdate)

  return response.data
}

export default { getAll, setToken, create, update}