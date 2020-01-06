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
          Axios.get("https://travel-to-api.herokuapp.com/api/user", config).then(res => {
              console.log(res)
            if(res.data.status === 'success') {
                this.setState({
                    message: res.data.data.name + ', your account has been activated',
                    success: true
                })
            } else {
                this.setState({
                    message: 'Something went wrong, try again later!',
                    success: false
                })
            }
          })
    
    }
    render() { 
        return (  
            <div>
                <div className="auth-message-block">{this.state.message}</div>
                {this.state.success ? <Link to="/">Start your journey</Link> : null }
            </div>
        );
    }
}
 
export default ActivateUser;