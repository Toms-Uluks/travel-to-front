import React from 'react';
import {BrowserRouter, Route, Switch, Link, Router, Redirect} from 'react-router-dom';

import '../../css/topbar.scss'
export const Topbar = (props) => {

    return (
        <div className="topbar-wrap">
            <Link className="login" to="/Login" >Login</Link>
        </div>
    )
}