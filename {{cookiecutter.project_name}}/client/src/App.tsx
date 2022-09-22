import React, { useEffect, useState } from 'react';

const App = () => {
    const [apiHealth, setApiHealth] = useState<string>('unhealthy');

    useEffect(() => {
        fetch('http://localhost:8080/healthcheck')
            .then((res) => res.json())
            .then((payload) => setApiHealth(payload.message));
    }, []);

    return (
        <main>
            <h1>Hello, world!</h1>
            <p>API health: {apiHealth}</p>
        </main>
    );
};

export default App;
