import axios from "axios";
const baseUrl = "/api/blogs";

console.log("token set to null");
let token = null;

const setToken = (userToken) => {
  console.log("token set to usertoken", userToken);
  token = userToken;
};

const getAuthConfig = () => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (blogToCreate) => {
  // config object for seding with the axios post request

  const response = await axios.post(baseUrl, blogToCreate, getAuthConfig());
  console.log(response.data);
  return response.data;
};

const update = async (blogToUpdate) => {
  const response = await axios.put(
    `${baseUrl}/${blogToUpdate.id}`,
    blogToUpdate,
  );
  return response.data;
};

const deleteBlog = async (blogID) => {
  return await axios.delete(`${baseUrl}/${blogID}`, getAuthConfig());
};

export default { getAll, setToken, create, update, deleteBlog };
