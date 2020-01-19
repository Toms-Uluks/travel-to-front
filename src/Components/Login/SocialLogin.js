import React, { Component } from 'react';
import FacebookProvider, { Login } from 'react-facebook-sdk';
import '../../css/common.scss'
class SocialLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    
    render() { 
        const handleResponse = event => {
            console.log(event)
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