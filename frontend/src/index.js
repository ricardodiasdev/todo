import React from 'react';
import ReactDOM from 'react-dom/client';
import Path from './routes';

import { ToastContainer} from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Path />
    <ToastContainer autoClose={2000}/> 
  </React.StrictMode>
);

