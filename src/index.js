import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App.js';
import { BrowserRouter, Routes } from 'react-router-dom';
import './styles/styles.css';
import store from './store.js';
import { Provider } from 'react-redux';
import NewRoutes from './routes.js';
const root = ReactDOM.createRoot(
    document.getElementById('root')
);




root.render(  
    <BrowserRouter>
        <Provider store={store}>
            <Routes>
            {NewRoutes}
            </Routes>
        </Provider>
    </BrowserRouter>);