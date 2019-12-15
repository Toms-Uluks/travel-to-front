import React, { Component } from 'react';
import Login from './Login';
import Register from './Register';

import '../../css/Auth.scss';

class AuthPage extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            activeForm: 'login'
        }
    }
    changeFormState(active) {
        this.setState({
            activeForm: active
        })
    }
    render() { 
        return (  
            <div className="form-wrap">
                <div className={this.state.activeForm == 'login' ? "active-form form" : "form"}>
                    {this.state.activeForm == 'login' ? 
                    <div>
                        <Login></Login> 
                        <p>Not a user? <div onClick={() => this.changeFormState('register')}>Register</div></p>
                    </div>
                    : null}
                </div>
                <div className={this.state.activeForm == 'register' ? "active-form form" : "form"}>
                    {this.state.activeForm == 'register' ? 
                    <div>
                        <Register></Register> 
                        <p>Already a user? <div onClick={() => this.changeFormState('login')}>Login</div></p>
                    </div>
                    : null}
                </div>
            </div>
        );
    }
}
 
export default AuthPage;