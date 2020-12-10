import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'semantic-ui-css/semantic.min.css'
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import App from './App';



ReactDOM.render(
   <BrowserRouter>
         <App props = {window} />
   </BrowserRouter>,
  document.getElementById('root')
);


serviceWorker.unregister();
