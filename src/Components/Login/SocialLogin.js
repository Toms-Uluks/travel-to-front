import React, { Component } from 'react';
import FacebookProvider, { Login } from 'react-facebook-sdk';
import '../../css/common.scss'
import Axios from "axios";
import { toast } from 'react-toastify';
import Cookies from "js-cookie";

class SocialLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    
    render() { 
        const handleResponse = event => {
            console.log(event)
            Axios.post("https://travel-to-api.herokuapp.com/api/authenticated/facebook",{
                email: event.profile.email,
                name: event.profile.name,
                user_id: event.profile.id,
                access_token: event.tokenDetail.accessToken
            }).then(res => {
                if (res.data.status == 'success' && res.data.data.token) {
                    Cookies.set("userToken", res.data.data.token, { expires: 1 });
                } else if (res.data.status === 'error') {
                    toast.error(res.data.message)
                } else {
                    toast.error("Something didn't work")
                }
            }).catch(err => {
                toast.error("Social login didn't work")
            })
        }

        return (  
            <FacebookProvider appId="470652490551031">
              <Login
                scope="email"
                onResponse={handleResponse}
                onError={this.handleError}
                >
                <span className="FB-Login"><img width="20" height="20" src="https://image.flaticon.com/icons/svg/124/124010.svg"/> Login via Facebook</span>
            </Login>
          </FacebookProvider>
        );
    }
}
 
export default SocialLogin;