import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.js';
import { BrowserRouter } from 'react-router-dom';
import './styles/styles.css'

const root = ReactDOM.createRoot(
    document.getElementById('root')
);

root.render(  
    <BrowserRouter>
        <App />
    </BrowserRouter>);