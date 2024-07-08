import { useEffect, useState } from "react"
import DetailedCountry from "./DetailedCountry"

const CountriesDisplay = ({countries}) => {
    const [countriesToDisplay, setCountriesToDisplay] = useState([]);

    // Updates the countries to display when the countries prop changes
    useEffect(() => {
        setCountriesToDisplay(countries)
    },[countries])

    // Function for toggling the display attribute for a country in the to display state
    const toggleDisplay = (countryOfficialName) => {
        setCountriesToDisplay(countriesToDisplay.map(country =>{
            return country.name.official === countryOfficialName
                ? {...country, showDetail : !country.showDetail} : country
        }))
    }
    if (countriesToDisplay.length > 10){
        return (
            <p>Too many matches, specify another filter</p>
        )
    }

    //Either check for showDetailed attribute, using a piece of state to toggle results, or shortcut by changing search value
    if (countriesToDisplay.length > 1) {
        return (
            <>
                {countriesToDisplay.map(country => {
                    if (country.showDetail){
                        return (
                            <div key={country.name.official}>
                                <DetailedCountry country={country}/><button onClick={() => {
                                    toggleDisplay(country.name.official)
                                }}>hide</button>
                            </div>
                        )
                    } else {
                        return <p key={country.name.official}>{country.name.common}<button onClick={() => {
                            toggleDisplay(country.name.official)
                        }}>show</button></p>
                    }
                })}
            </>
        )
    }

    if (countries.length === 1){
        return <DetailedCountry country={countries[0]}/>
    }

    return null
}

export default CountriesDisplay