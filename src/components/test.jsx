import React, { useState } from 'react';
import { ref, set, push } from 'firebase/database';
import db from "../../server/database/firebase.js";

const TestComponent = () => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Create a reference to the 'users' node in the database
            const usersRef = ref(db, 'users');
            // Push a new entry to the users node
            const newUserRef = push(usersRef);

            await set(newUserRef, {
                name: name,
                age: age
            });

            console.log('User added with ID: ', newUserRef.key);
        } catch (e) {
            console.error('Error adding user: ', e);
        }
    };

    return (
        <div>
            <h1>Add User</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                />
                <button type="submit">Add User</button>
            </form>
        </div>
    );
};

export default TestComponent;
