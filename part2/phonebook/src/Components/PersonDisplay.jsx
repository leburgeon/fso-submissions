const PersonDisplay = ({persons, deletePerson}) => {
    return(
        <>
            {persons.map(person => <p key={person.name}>{person.name} {person.number}
                <button onClick={() => {
                    deletePerson(person)
                }}>delete</button>
            </p>)}
        </>
    )
}

export default PersonDisplay