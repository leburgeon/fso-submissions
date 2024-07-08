import getWeatherForCountry from "../services/weather";
import { useEffect, useState } from "react";

const WeatherDisplay = ({country}) => {
    const [currentWeatherData, setCurrentWeatherData] = useState(null)

    useEffect(() => {
        // Fetches the weather data using the service function
        getWeatherForCountry(country).then(data => {
            setCurrentWeatherData(data.current)
        }).catch(err => {
            setCurrentWeatherData(null)
        })
    }, [])

    // If there was an error, displays could not load message
    if (!currentWeatherData){
        return (
            <h3>Could not load weather data</h3>
        )
    }

    // Constructs the src url for the weather icon
    const {weather} = currentWeatherData
    const {icon, description} = weather[0]
    const weatherIconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`

    return (
        <div>
            <h2>Current weather in {country.capital[0]}:</h2>
            <p>{description}</p>
            <p>Temperature: {currentWeatherData.temp} Celcius</p>
            <p>Wind: {currentWeatherData.wind_speed} m/s</p>
            <img src={weatherIconUrl} alt={`Icon of ${description}`}/>
        </div>
    )
}
export default WeatherDisplay