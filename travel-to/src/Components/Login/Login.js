import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Cookies from 'js-cookie';
import {Redirect} from 'react-router-dom';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            loggedin: false
        }
    }
        
    renderRedirect = () => {
        if (Cookies.get('userToken') || this.state.loggedin) {
            return <Redirect to='/' />
        }
    }
    
    render() { 

        const handleSubmit = event => {
            event.preventDefault();
            const form = event.currentTarget;
            axios.post("https://travel-to-api.herokuapp.com/api/auth/login",{
                email: form.formGroupEmail.value,
                password: form.formGroupPassword.value
            }).then(res => {
                if(res.data.status == "success") {
                    Cookies.set("userToken", res.data.data.token, { expires: 1 });
                    this.setState({
                        logn: this.state.loggedin = true
                    });
                } 
            })
        };
        return (  
            <React.Fragment>
                {this.renderRedirect()}
                <div className="headline">Let's go for a ride!</div>
                <div className="sub-headline">But first we must get you logged in</div>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formGroupEmail">
                        <Form.Control type="email" placeholder="Enter email" />
                    </Form.Group>
                    <Form.Group controlId="formGroupPassword">
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Login
                    </Button>
                </Form>
            </React.Fragment>
        );
    }
}
 
export default Login;