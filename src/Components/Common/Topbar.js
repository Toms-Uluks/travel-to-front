import React, { Component } from 'react';
import {BrowserRouter, Route, Switch, Link, Router, Redirect} from 'react-router-dom';
import burger from '../../Assets/burger.png'
import '../../css/common.scss'
import Cookies from 'js-cookie';
import user from '../../Assets/img/user.png'
import Axios from 'axios';
import {Animated} from "react-animated-css";
import { toast } from 'react-toastify';

class Topbar extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            openSidebar: false
        }
    }
    setSidebar(){
        this.setState({
            openSidebar: !this.state.openSidebar
        })
    } 
    logOut() {
        Cookies.remove('userToken');
        window.location.reload();
    }
    becomeADriver() {
        
        var config = {
            headers: {'Authorization': "Bearer " + Cookies.get('userToken')}
        };
        Axios.put('https://travel-to-api.herokuapp.com/api/users/'+this.props.user.id+'/becomeDriver', {} , config).then((res, err) => {
            //console.log(res)
        }).catch(err => {
            toast.error("something went wrong!")
        });
    }
    render() {
        return (
            <React.Fragment>
                <div className="topbar-wrap">
                    {this.props.user && this.props.user.name ? <div><img onClick={() => this.setSidebar()} className="burger-icon" src={burger} /></div> : <Link to="/Login" className="login" data-cy="loginLink">Login</Link>}
                    
                    {this.props.extraInfo && this.props.extraInfo.trip ? 
                        <div className="flex-row flex-center-center">
                            <div className="convo-headline">{this.props.extraInfo.trip.from + ' - ' +  this.props.extraInfo.trip.to}</div>
                            <div className={this.props.extraInfo.tripRequest.status}></div>
                            <div className="trip-status">{this.props.extraInfo.tripRequest.status}</div>
                        </div> 
                    : null}

                    <div className="links-wrap">
                        <Link activeclassname='is-active' to="/" >Home</Link>
                        {this.props.user.role == "driver" ?  <Link to="/add_trip">Add a ride</Link> : <a onClick={() => {this.becomeADriver()}}>Become a driver</a>}
                        <Link activeclassname='is-active' to="/Help">Help</Link>
                    </div>
                </div>

                <Animated animateOnMount={false}  isVisible={this.state.openSidebar} animationIn="slideInLeft" animationOut="slideOutLeft" className="sidebar">
                    <div>
                        <img src={this.props.user.profile_img ? this.props.user.profile_img : user }></img>
                        <span>{ this.props.user.name}</span>
                    </div>
                    <Link to="/settings">Account Settings</Link>
                    <Link to="/terms">Terms Of Use</Link>
                    <Link to="/trip_history">Trip History</Link>
                    <Link to="/conversations">Conversations</Link>
                    <a onClick={() => {this.logOut()}}>Log Out</a>
                </Animated>

            </React.Fragment>
        )
    }
}
export default Topbar
 