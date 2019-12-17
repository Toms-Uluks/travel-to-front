import React from 'react';
import {BrowserRouter, Route, Switch, Link, Router, Redirect} from 'react-router-dom';

import '../../css/topbar.scss'
export const Topbar = (props) => {
    return (
        <div className="topbar-wrap">
            {props.user && props.user.name ? <div>{props.user.name}</div> : <Link to="/Login" className="login" >Login</Link>}
            <div className="links-wrap">
                <Link activeclassname='is-active' to="/" >Home</Link>
                <Link activeclassname='is-active' to="/Help/Become_A_Driver">Become a driver</Link>
                <Link activeclassname='is-active' to="/Help">Help</Link>
            </div>
        </div>
    )
}