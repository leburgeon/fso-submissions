import axios from "axios";

const retrieveAllCountries = () => {
    const allCountriesUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'
    const countriesRequest = axios.get(allCountriesUrl)
    return countriesRequest.then(response => response.data)
}

export default {retrieveAllCountries}