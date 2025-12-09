import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
    

const PersonDetail = () => {
    const { id } = useParams();
    const [person, setPerson] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:3000/persons/${id}`)
            .then(response => response.json())
            .then(data => setPerson(data))
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
            <h2>Person Detail</h2>
            {!person ? (
                <p>No person found.</p>
            ) : (
                <ul>
                    <li>
                        {person.name} {person.surname} - {person.birthdate}
                    </li>
                </ul>
            )}
        </div>
    );
};

export default PersonDetail;