import React from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('app') as HTMLElement);
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
