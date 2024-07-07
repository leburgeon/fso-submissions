import DetailedCountry from "./DetailedCountry"

const CountriesDisplay = ({countries}) => {
    console.log("Countries display called")
    if (countries.length > 10){
        return (
            <p>Too many matches, specify another filter</p>
        )
    }

    if (countries.length > 1) {
        return (
            <>
                {countries.map(country => {
                    return (
                        <p key={country.name.official}>{country.name.common}</p>
                    )
                })}
            </>
        )
    }

    if (countries.length === 1){
        return <DetailedCountry country={countries}/>
    }

    return null
}

export default CountriesDisplay