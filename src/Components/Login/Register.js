import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Axios from 'axios';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        const handleSubmit = event => {
            event.preventDefault();
            const form = event.currentTarget;
            Axios.post("https://travel-to-api.herokuapp.com/api/auth/register",{
                email: form.formGroupEmail.value,
                password: form.formGroupPassword.value,
                name: form.formGroupName.value,
                phone_number: form.formGroupPhone.value
            }).then(res => {
            })
        };
        return (  
            <React.Fragment>
                <div className="headline">Let’s get you on going</div>
                <div className="sub-headline">We’ll get you seated and on your way within 5 minutes</div>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formGroupName">
                        <Form.Control type="text" placeholder="Name" />
                    </Form.Group>
                    <Form.Group controlId="formGroupEmail">
                        <Form.Control type="email" placeholder="Enter email" />
                    </Form.Group>
                    <Form.Group controlId="formGroupPhone">
                        <Form.Control type="text" placeholder="Phone number" />
                    </Form.Group>
                    <Form.Group controlId="formGroupPassword">
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Register
                    </Button>
                </Form>
            </React.Fragment>
        );
    }
}
 
export default Register;