import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Axios from 'axios';

class ActivateUser extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            user: {
                message: "",
                success: false
            }
        }
    }
    componentDidMount() {
        var config = {
            headers: {'Authorization': "Bearer " + this.props.match.params.userToken}
          };
          Axios.put("https://travel-to-api.herokuapp.com/api/auth/verify",{},config).then(res => {
            if(res.data.status === 'success') {
                const {data} = res.data;
                const linkText = data.role === 'driver' ? 'Create your first trip' : 'Start searching for trips';
                this.setState({
                    message: data.name + ', your account has been activated',
                    success: true,
                    linkText
                })
            } else {
                this.setState({
                    message: 'Something went wrong, try again later!',
                    success: false
                })
            }
          }).catch(err => {
               this.setState({
                    message: 'Something went wrong, please try again later or send an email to hellotravelto@gmail.com!',
                    success: false
                })
          });
    
    }
    render() { 
        return (  
            <div>
                <div className="auth-message-block">{this.state.message}</div>
                {this.state.success ? <Link to="/">{this.state.linkText}</Link> : <Link to="/">Back to start</Link> }

            </div>
        );
    }
}
 
export default ActivateUser;