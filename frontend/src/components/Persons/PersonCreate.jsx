import { useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const PersonCreate = () => {
    const form = useRef();
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            fetch(`${process.env.API_URL}/persons/${id}`)
                .then(response => response.json())
                .then(data => {
                    form.current.name.value = data.name;
                    form.current.surname.value = data.surname;
                    form.current.birthdate.value = data.birthdate.split('T')[0];
                    form.current.isTeacher.checked = data.isTeacher;
                });
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        const newPerson = {
            name: form.current.name.value,
            surname: form.current.surname.value,
            birthdate: form.current.birthdate.value,
            isTeacher: form.current.isTeacher.checked
        };

        let url =  id ? `${process.env.API_URL}/persons/${id}` : `${process.env.API_URL}/persons`;
        let method =  id ? 'PUT' : 'POST';
        
        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newPerson)
        }).then(() => {
            navigate('/');
        });
    };

    return (
        <div>
            <h2>Create Person</h2>
            <form ref={form} onSubmit={handleSubmit}>
                <input name="name" type="text" placeholder="Name" /><br />
                <input name="surname" type="text" placeholder="Surname" /><br />
                <input name="birthdate" type="date" placeholder="Birthdate" /><br />
                <input name="isTeacher" type="checkbox"/> Is teacher<br />
                <button type="submit">Create</button>
            </form>
        </div>
    );
}

export default PersonCreate;