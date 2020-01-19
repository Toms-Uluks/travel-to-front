import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Switch, Link, Router, Redirect} from 'react-router-dom';
import Cookies from 'js-cookie';

import AuthPage from './Components/Login/AuthPage'
import ActivateUser from './Components/User/ActivateUser';
import Landing from './Components/Landing';
import Trips from './Components/Trip/Trips';
import Axios from 'axios';
import { connect } from 'react-redux'
import {setUser} from './modules/actions';
import Singletrip from './Components/Trip/SingleTrip';
import Conversation from './Components/Conversation/Conversation';
import Conversationlist from './Components/Conversation/Conversationlist';
import Addtrip from './Components/Trip/Addtrip';
import Usersettings from './Components/User/Usersettings';
import Triphistory from './Components/Trip/Triphistory';
import { ToastContainer, toast } from 'react-toastify';
import connection from './Lib/socket';
import 'react-toastify/dist/ReactToastify.css';

const App = ({ dispatch }) => {
    

    if(Cookies.get('userToken')) {
      var config = {
        headers: {'Authorization': "Bearer " + Cookies.get('userToken')}
      };
      Axios.get("https://travel-to-api.herokuapp.com/api/user", config).then((res, err) => {
        if(res.data.status === 'success') {
          dispatch(setUser(res.data.data))
          connection.connect(Cookies.get('userToken'));
          connection.subscribeToNotification(`notification:${res.data.data.id}`, handleMessageAdd)
          //toast("You've got a new message")
        } else if (res.data.status === 'error') {
          toast.error(res.data.message)
        }
      }).catch(err => {
        toast.error("something went wrong!")
      })

    }
    
    const handleMessageAdd = message => {
      const { type, data } = message;
      console.log(message)
        // you could handle various types here, like deleting or editing a message
        switch (type) {
            case 'notification:newNotification':
                toast(data.message)
            break;
            default:
        }
       
    };

    
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
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css"></link>
          <link href="/your-path-to-fontawesome/css/fontawesome.css" rel="stylesheet"></link>
          <link href="/your-path-to-fontawesome/css/brands.css" rel="stylesheet"></link>
          <BrowserRouter>
            <Switch>
              <Route path='/login' component={AuthPage} exact/>
              <Route path='/' component={Landing} exact/>
              <Route path='/trips/:tripDetails' component={Trips} exact/>
              <Route path='/trips' component={Trips} exact/>
              <PrivateRoute path='/trip/:tripID' component={Singletrip} exact/>
              <Route path='/activate_user/:userToken' component={ActivateUser}/>
              <PrivateRoute path='/add_trip' component={Addtrip} exact/>
              <PrivateRoute path='/conversations/:id' component={Conversation}/>
              <PrivateRoute path='/conversations/' component={Conversationlist}/>
              <PrivateRoute path='/settings/' component={Usersettings}/>
              <PrivateRoute path='/trip_history/' component={Triphistory}/>
            </Switch>
          </BrowserRouter>
          <ToastContainer />
      </div>
  );
}

export default connect()(App);
