import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Axios from 'axios';
import Cookies from "js-cookie";
import { toast } from 'react-toastify';
import FacebookProvider, { Login } from 'react-facebook-sdk';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            isDriver: false
        }
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
                if(this.state.isDriver) {
                    var config = {
                        headers: {'Authorization': "Bearer " + res.data.data.token}
                    };
                    Axios.get("https://travel-to-api.herokuapp.com/api/user", config).then(x => {
                    if(x.data.status === 'success') {
                        Axios.put('https://travel-to-api.herokuapp.com/api/users/'+x.data.data+'/becomeDriver', {} , config).then(() => {
                        }).catch(err => {
                            toast.error("Couldn't register you as a driver. Try again from the settings")
                        });
                    }
                    }).catch(err => {
                        toast.error("Couldn't register you at the moment, try again later!")
                    })
                
                }
            })
        };
        const changeRole = (isDriver) => {
            this.setState({
                isDriver: isDriver
            })
        }
        const socialLogin = type => {
            var config = {
                headers: { Authorization: "Bearer " + Cookies.get("userToken") }
            };
            Axios.get("https://travel-to-api.herokuapp.com/api/auth/" + type, config).then(res => {
                if (res.data.status === 'success') {
                    toast.error(res.data.message)
                }                
                if (res.data.status === 'error') {
                    toast.error(res.data.message)
                }
                console.log(res)
            }).catch(err => {
                toast.error("Social login didn't work")
            })
        }

        const handleResponse = event => {
            console.log(event)
        }

        return (  
            <React.Fragment>
                <div className="headline">Let’s get you on going</div>
                <div className="sub-headline">We’ll get you seated and on your way within 5 minutes</div>
                <Form onSubmit={handleSubmit}>
                    <div className="flex-row flex-center-center role-wrap">
                        <div className={!this.state.isDriver ? 'active' : ''} onClick={() => changeRole(false)} >Passenger</div>
                        <div className={this.state.isDriver ? 'active' : ''} onClick={() => changeRole(true)}>Driver</div>
                    </div>
                    <div className="flex-row flex-center-center">
                        <FacebookProvider appId="470652490551031">
                            <Login
                            scope="email"
                            onResponse={this.handleResponse}
                            onError={this.handleError}
                            render={({ isLoading, isWorking, onClick }) => (
                                <div>
                                    <div id="fb-root"></div>
                                    <script async defer crossorigin="anonymous" src="https://connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v5.0&appId=470652490551031&autoLogAppEvents=1"></script>
                                    <div className="fb-login-button" data-width="" data-size="large" data-button-type="login_with" data-auto-logout-link="false" data-use-continue-as="false"></div>
                                </div>
                            )}
                            />
                        </FacebookProvider>
                        <div onClick={() => socialLogin('google')}>Google</div>
                    </div>
                    <Form.Group controlId="formGroupName">
                        <Form.Control type="text" placeholder="Name" data-cy="name"/>
                    </Form.Group>
                    <Form.Group controlId="formGroupEmail">
                        <Form.Control type="email" placeholder="Enter email" data-cy="email"/>
                    </Form.Group>
                    <Form.Group controlId="formGroupPhone">
                        <Form.Control type="text" placeholder="Phone number" data-cy="phoneNumber"/>
                    </Form.Group>
                    <Form.Group controlId="formGroupPassword">
                        <Form.Control type="password" placeholder="Password" data-cy="password"/>
                    </Form.Group>
                    <Button variant="primary" type="submit" data-cy="register">
                        Register
                    </Button>
                </Form>
            </React.Fragment>
        );
    }
}
 
export default Register;