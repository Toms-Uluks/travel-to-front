import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (  
            <React.Fragment>
                <Form>
                <Form.Group controlId="formGroupEmail">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Name" />
                </Form.Group>
                <Form.Group controlId="formGroupEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>
                <Form.Group controlId="formGroupEmail">
                    <Form.Label>Phone number</Form.Label>
                    <Form.Control type="text" placeholder="Phone number" />
                </Form.Group>
                <Form.Group controlId="formGroupPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                </Form>
            </React.Fragment>
        );
    }
}
 
export default Register;