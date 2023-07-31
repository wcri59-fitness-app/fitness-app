import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App.js';
import { BrowserRouter } from 'react-router-dom';
import './styles/styles.css';
import store from './store.js';
import WorkoutCard from './components/WorkoutCard.js';
const root = ReactDOM.createRoot(
    document.getElementById('root')
);

root.render(  
    <BrowserRouter store={store}>
        <WorkoutCard />
    </BrowserRouter>);