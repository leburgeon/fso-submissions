const Filter = ({searchValue, handleSearch}) => {
    return (
        <div>
            Filter shown with a: <input value={searchValue} onChange={handleSearch}/>
        </div>
    )
}

export default Filter