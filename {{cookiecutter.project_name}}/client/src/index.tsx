import React from 'react';
import * as ReactDOM from 'react-dom/client';

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('app') as HTMLElement);
root.render(
    <React.StrictMode>
        <h1>Hello, world</h1>
    </React.StrictMode>
);
