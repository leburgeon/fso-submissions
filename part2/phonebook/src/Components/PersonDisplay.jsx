const PersonDisplay = ({persons, deletePerson}) => {
    
    return(
        <>
            {persons.map(person => {
                return (
                    <p key={person.name}>
                        {person.name} {person.number}
                        <button onClick={() => deletePerson(person)}>delete</button>
                    </p>
                )
            })}
        </>
    )
}

export default PersonDisplay