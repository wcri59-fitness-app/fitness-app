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
            <div id='header'><h1 className='headerText'>///CODEFIT///</h1></div>
            <Routes>
            {NewRoutes}
            </Routes>
            <div id='footer'><p className='footerText'>Created by Liam, Kurt, Jordan, Duke</p></div>
        </Provider>
    </BrowserRouter>);