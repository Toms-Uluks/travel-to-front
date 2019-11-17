import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    
    
    render() { 
        const handleSubmit = event => {
            event.preventDefault();
            const form = event.currentTarget;
            console.log(form)
        };
        return (  
            <React.Fragment>
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