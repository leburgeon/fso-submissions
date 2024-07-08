import axios from "axios"
const getWeatherForCountry = (country) => {
    const api_key = import.meta.env.VITE_SOME_KEY
    const latlngArr = country.capitalInfo.latlng
    const url =`https://api.openweathermap.org/data/3.0/onecall?lat=${latlngArr[0]}&lon=${latlngArr[1]}&appid=${api_key}&units=metric` 
    return axios.get(url).then(response => response.data)
}

export default getWeatherForCountry