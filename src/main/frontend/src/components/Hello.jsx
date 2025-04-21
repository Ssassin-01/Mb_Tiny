import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Hello() {
    const [message, setMessage] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8080/api/hello')
            .then(response => setMessage(response.data))
            .catch(error => console.error('Error:', error));
    }, []);

    return (
        <div>
            <p>{message}</p>
        </div>
    );
}
