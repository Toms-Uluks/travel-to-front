import React, { Component } from 'react';
import {BrowserRouter, Route, Switch, Link, Router, Redirect} from 'react-router-dom';
import burger from '../../Assets/burger.png'
import '../../css/common.scss'
import Cookies from 'js-cookie';

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
    logOut(evt) {
        Cookies.remove('userToken');
        window.location.reload();
    }
    render() {
        return (
            <React.Fragment>
                <div className="topbar-wrap">
                    {this.props.user && this.props.user.name ? <div><img onClick={() => this.setSidebar()} className="burger-icon" src={burger} />{this.props.user.name}</div> : <Link to="/Login" className="login" >Login</Link>}
                    <div className="links-wrap">
                        <Link activeclassname='is-active' to="/" >Home</Link>
                        <Link activeclassname='is-active' to="/Help/Become_A_Driver">Become a driver</Link>
                        <Link activeclassname='is-active' to="/Help">Help</Link>
                    </div>
                </div>
                {this.state.openSidebar ? (
                    <div className="sidebar">
                        <Link to="/settings">Account Settings</Link>
                        <Link to="/terms">Terms Of Use</Link>
                        <Link to="/ride_history">Ride History</Link>
                        <Link to="/conversations">Conversations</Link>
                        <Link onClick={() => {this.logOut()}}>Log Out</Link>
                    </div>
                ) : null}
            </React.Fragment>
        )
    }
}
export default Topbar
 