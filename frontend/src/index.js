import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './views/Home';
import Task from './views/Task';

import { ToastContainer} from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Task />
    <ToastContainer autoClose={2000}/> 
  </React.StrictMode>
);

