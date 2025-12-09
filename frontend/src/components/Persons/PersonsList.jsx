import { useState, useEffect } from "react";

const PersonsList = () => {
    const [persons, setPersons] = useState([]);
    const [error, setError] = useState(null);

    const handleDelete = (id) => {
        fetch(`http://localhost:3000/persons/${id}`, {
            method: 'DELETE'
        }).then(() => {
            setPersons(persons.filter(person => person._id !== id));
        });
    };

    useEffect(() => {
        fetch('http://localhost:3000/persons')
            .then(response => response.json())
            .then(data => setPersons(data))
            .catch(error => {
                console.error('Error fetching persons:', error);
                setError(error);
            });
    }, []);

    if (error) {
        return <p>Error fetching persons: {error.message}</p>;
    }

    return (
        <div>
            <h2>Persons List</h2>
            <a href="/persons/create">Create Person</a>
            {persons.length === 0 ? (
                <p>No persons found.</p>
            ) : (
                <ul>
                    {persons.map(person => (
                        <li key={person._id}>
                            {person.name} {person.surname}
                            <a href={`/persons/${person._id}`}> View</a>
                            <a href={`/persons/create/${person._id}`}> Edit</a>
                            <button onClick={() => handleDelete(person._id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default PersonsList;