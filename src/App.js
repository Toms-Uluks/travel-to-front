import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Switch, Link, Router, Redirect} from 'react-router-dom';
import Cookies from 'js-cookie';

import AuthPage from './Components/Login/AuthPage'
import Home from './Components/Home';
import ActivateUser from './Components/ActivateUser';
import Landing from './Components/Landing';
import Trips from './Components/Trips';
import Axios from 'axios';
import { connect } from 'react-redux'
import {setUser} from './modules/actions';
import Singletrip from './Components/SingleTrip';
import Conversation from './Components/Conversation';
import Conversationlist from './Components/Conversationlist';
import Addtrip from './Components/Addtrip';
import Usersettings from './Components/Usersettings';
import Triphistory from './Components/Triphistory';

const App = ({ dispatch }) => {
    if(Cookies.get('userToken')) {
      var config = {
        headers: {'Authorization': "Bearer " + Cookies.get('userToken')}
      };
      Axios.get("https://travel-to-api.herokuapp.com/api/user", config).then(res => {
        if(res.data.status === 'success') {
          dispatch(setUser(res.data.data))
        }
      })
    }
    const PrivateRoute = ({ component: Component, ...rest }) => (
      <Route {...rest} render={(props) => (
        Cookies.get('userToken') 
          ? <Component {...props} />
          : <Redirect to='/login' />
      )} />
      
    )
    return (
      <div className="App">
          <link href="https://fonts.googleapis.com/css?family=Crimson+Text|Work+Sans&display=swap" rel="stylesheet"></link>
          <BrowserRouter>
            <Switch>
              <Route path='/login' component={AuthPage} exact/>
              <Route path='/' component={Landing} exact/>
              <Route path='/add_trip' component={Addtrip} exact/>
              <Route path='/trips/:tripDetails' component={Trips} exact/>
              <Route path='/trips' component={Trips} exact/>
              <PrivateRoute path='/trip/:tripID' component={Singletrip} exact/>
              <Route path='/activate_user/:userToken' component={ActivateUser}/>
              <PrivateRoute path='/conversations/:id' component={Conversation}/>
              <PrivateRoute path='/conversations/' component={Conversationlist}/>
              <PrivateRoute path='/settings/' component={Usersettings}/>
              <PrivateRoute path='/trip_history/' component={Triphistory}/>
            </Switch>
          </BrowserRouter>
      </div>
  );
}

export default connect()(App);
