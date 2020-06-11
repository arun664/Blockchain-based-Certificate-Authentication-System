import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom'; 
import App from './App';
import Register from './screens/Register';
import Activate from './screens/Activate';
import Login from './screens/Login';
import Private from './screens/Private.jsx';
import PrivateProfile from './screens/PrivateProfile.jsx';
import Admin from './screens/Admin.jsx';
import ForgetPassword from './screens/ForgetPassword';
import ResetPassword from './screens/ResetPassword';
import Certificate from './screens/Certificate';

import PrivateRoute from './Routes/PrivateRoute';
import AdminRoute from './Routes/AdminRoute';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.render(
    <BrowserRouter>
    <Switch>
      <Route path='/' exact render={props => <App {...props}/>}/>
      <Route path='/register' exact render={props => <Register {...props}/>}/>
      <Route path='/login' exact render={props => <Login {...props}/>}/>
      <Route path='/users/password/forget' exact render={props => <ForgetPassword {...props}/>}/>
      <Route path='/users/activate/:token' exact render={props => <Activate {...props}/>}/>
      <Route path='/users/password/reset/:token' exact render={props => <ResetPassword {...props}/>}/>
      <PrivateRoute path="/private/" exact component={Private} />
      <PrivateRoute path="/private/profile" exact component={PrivateProfile} />
      <PrivateRoute path="/private/certificate" exact component={Certificate} />
      <AdminRoute path="/admin" exact component={Admin} />
      <Redirect to='/' />
    </Switch>
    </BrowserRouter>,
  document.getElementById('root')
);