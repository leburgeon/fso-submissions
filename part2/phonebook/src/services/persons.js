import axios from "axios";

const databaseUrl = "/api/persons"

// Gets all persons from the api
const getAll = () => axios.get(databaseUrl).then(response => response.data)


// Takes a person object and adds them to the server
const addPerson = (person) => {
    // Uses axios to create a post-request, eventually returning a promise that fulfulls to the number added to the server
    return axios.post(databaseUrl, person).then(response => response.data)
}

// Takes an object id and deletes from the server
const deletePerson = (id) => {
    // Uses axios delete request to delete the person from the server
    const delRequest = axios.delete(`${databaseUrl}/${id}`);
    return delRequest.then(response => response.data)
}

// Takes a person object with a known id, and updates the person on the server
const updatePerson = (updatedPerson) => {
    const updateRequest = axios.put(`${databaseUrl}/${updatedPerson.id}`, updatedPerson)
    return updateRequest.then(response => response.data)
}


export default {addPerson,deletePerson, updatePerson, getAll}