import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import 'react-alice-carousel/lib/alice-carousel.css';
import Context from './Context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(


  <BrowserRouter>
    <Context>
      <App />
    </Context>
  </BrowserRouter>

);
