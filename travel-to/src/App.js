import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Switch, Link, Router, Redirect} from 'react-router-dom';
import Cookies from 'js-cookie';

import AuthPage from './Components/Login/AuthPage'
import Home from './Components/Home';
import ActivateUser from './Components/ActivateUser';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    Cookies.get('userToken') 
      ? <Component {...props} />
      : <Redirect to='/login' />
  )} />
)

function App() {
  return (
    <div className="App">
        <link href="https://fonts.googleapis.com/css?family=Crimson+Text|Work+Sans&display=swap" rel="stylesheet"></link>
        <BrowserRouter>
          <Switch>
            <Route path='/login' component={AuthPage} exact/>
            <PrivateRoute path='/' component={Home} exact/>
            <Route path='/activate_user/:userToken' component={ActivateUser}/>
          </Switch>
        </BrowserRouter>
    </div>
  );
}

export default App;
