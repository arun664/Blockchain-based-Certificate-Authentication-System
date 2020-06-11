import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';
import App from './App';
import Certificate from './screens/Certificate';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.render(
    <BrowserRouter>
    <Switch>

      <Route path='/' exact render={props => <App {...props}/>}/>
      <Route path='/Certificate' exact component={Certificate}/>
      <Redirect to='/' />
    </Switch>
    </BrowserRouter>,
  document.getElementById('root')
);
