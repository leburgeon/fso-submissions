import axios from "axios"
const getWeatherForCountry = (country) => {
    const api_key = import.meta.env.VITE_SOME_KEY
    const latlngArr = country.capitalInfo.latlng
    axios.get
}

export default getWeatherForCountry