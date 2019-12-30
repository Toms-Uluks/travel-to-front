import React, { Component } from 'react';
import { connect } from 'react-redux';
import Topbar from './Common/Topbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Axios from 'axios';
import Cookies from 'js-cookie';
import '../css/Settings.scss'
const mapStateToProps = (state) => {
    return state.user
}

class Usersettings extends Component {
    constructor(props) {
        super(props);
        this.state = {  
        }
    }
    render() { 
        const handleSubmit = event => {
            event.preventDefault();
            const form = event.currentTarget;
            const updatedUser = {
                email: form.formGroupEmail.value,
                phone_number: form.formGroupPhone.value,
                name: form.formGroupName.value,
                description: form.formGroupBio.value,
                profile_img: ''
            }
            var config = {
                headers: {'Authorization': "Bearer " + Cookies.get('userToken')}
            };
            Axios.put('https://travel-to-api.herokuapp.com/api/user', updatedUser, config).then((res) => {
                console.log(res)
            });
        }

        const handlePasswordChange = event => {
            event.preventDefault();
            const form = event.currentTarget;
            var config = {
                headers: {'Authorization': "Bearer " + Cookies.get('userToken')}
            };

            if (form.formGroupNewPsw2.value == form.formGroupNewPsw.value) {
                const passwordEl = {
                    password: form.formGroupOldPsw.value,
                    newPassword: form.formGroupNewPsw.value
                }
                Axios.put('https://travel-to-api.herokuapp.com/api/user/changePassword', passwordEl, config).then((res) => {
                    if(res.data.status === 'success') {
                        form.formGroupOldPsw.value = ""
                        form.formGroupNewPsw.value = ""
                        form.formGroupNewPsw2.value = ""
                    }
                });
    
            }
        }

        return (  
            <div>
                <Topbar user={this.props.user}></Topbar>
                <div className="flex-center-start flex-column settings-wrap">
                    <div className="settings-header">User Info</div>
                    <Form  className="flex-column" onSubmit={handleSubmit}>
                            <Form.Group controlId="formGroupName">
                                <Form.Control required type="text" defaultValue={this.props.user.name} placeholder="Name" />
                            </Form.Group>
                            <Form.Group controlId="formGroupEmail">
                                <Form.Control required type="email" defaultValue={this.props.user.email} placeholder="Email" />
                            </Form.Group>
                            <Form.Group controlId="formGroupPhone">
                                <Form.Control required type="text" defaultValue={this.props.user.phone_number} placeholder="Phone number" />
                            </Form.Group>
                            <Form.Group controlId="formGroupBio">
                                <Form.Control type="text" defaultValue={this.props.user.description} placeholder="Bio" />
                            </Form.Group>
                            {/*<Form.Group controlId="formGroupImg">
                                <Form.Control type="file" defaultValue={this.props.user.profile_img}  placeholder="Bio" />
                            </Form.Group>*/}
                            <Button variant="primary"  className="flex-start-center" type="submit">
                                Update user
                            </Button>
                    </Form>
                    <div className="settings-header" >Change Password</div>
                    <Form className="flex-column" onSubmit={handlePasswordChange}>
                        <Form.Group controlId="formGroupOldPsw">
                            <Form.Control required type="password" placeholder="Old password" />
                        </Form.Group>
                        <Form.Group controlId="formGroupNewPsw">
                            <Form.Control required type="password" placeholder="New password" />
                        </Form.Group>
                        <Form.Group controlId="formGroupNewPsw2">
                            <Form.Control required type="password" placeholder="Repeat new password" />
                        </Form.Group>
                        <Button variant="primary" className="flex-start-center" type="submit">
                            Change password
                        </Button>
                    </Form>

                </div>
            </div>
        );
    }
}
 
export default connect(mapStateToProps)(Usersettings);