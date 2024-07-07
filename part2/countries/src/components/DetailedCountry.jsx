const DetailedCountry = ({country}) => {
    console.log(country)
    const {name, capital, area, languages, flags} = country[0]
    return (
        <div>
            <h1>{name.common}</h1>
            <p>Capital: {capital[0]}</p>
            <p>Area: {area}</p>
            <h3>Languages:</h3>
            <ul>
                {Object.values(languages).map(lan => {
                    return <li key={lan}>{lan}</li>
                })}
            </ul>
            <img src={flags.png} alt={flags.alt}/>
        </div>
    )
}

export default DetailedCountry