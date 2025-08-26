// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Get the root div from public/index.html
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the main App component
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

