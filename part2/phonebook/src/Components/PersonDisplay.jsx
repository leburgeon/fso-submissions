const PersonDisplay = (props) => {
    const {persons} = props
    return(
        <>
            {persons.map(person => <p key={person.name}>{person.name} {person.number}</p>)}
        </>
    )
}

export default PersonDisplay