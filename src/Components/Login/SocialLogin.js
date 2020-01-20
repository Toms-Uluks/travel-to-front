import React, { Component } from "react";
import FacebookProvider, { Login } from "react-facebook-sdk";
import GoogleLogin from "react-google-login";
import "../../css/common.scss";
import Axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { setUser } from "../../modules/actions";

const mapDispatchToProps = dispatch => {
  return {
    dispatchUser: user => {
      dispatch(setUser(user));
    }
  };
};

class SocialLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false
    };
  }
  renderRedirect = () => {    
    if (Cookies.get("userToken") || this.state.loggedIn) {
      return <Redirect to="/" />;
    }
  };

  render() {
    const handleResponseFacebook = event => {
      Axios.post(
        "https://travel-to-api.herokuapp.com/api/authenticated/facebook",
        {
          email: event.profile.email,
          name: event.profile.name,
          user_id: event.profile.id,
          access_token: event.tokenDetail.accessToken
        }
      )
        .then(res => {
          if (res.data.status === "success" && res.data.data.token) {
            Cookies.set("userToken", res.data.data.token, { expires: 1 });
            this.setState({
              logn: (this.state.loggedIn = true)
            });
          
            this.props.dispatchUser(res.data.data);

          } else if (res.data.status === "error") {
            toast.error(res.data.message);
          } else {
            toast.error("Something didn't work");
          }
        })
        .catch(err => {
          console.log(err);
          
          toast.error("Social login didn't work");
        });
    };

    const handleResponseGoogle = event => {
      console.log(event);
      Axios.post(
        "https://travel-to-api.herokuapp.com/api/authenticated/google",
        {
          email: event.profileObj.email,
          name: event.profileObj.name,
          user_id: event.profileObj.googleId,
          access_token: event.tokenObj.access_token
        }
      )
        .then(res => {
          if (res.data.status === "success" && res.data.data.token) {
            Cookies.set("userToken", res.data.data.token, { expires: 1 });
            this.setState({
              logn: (this.state.loggedIn = true)
            });
          } else if (res.data.status === "error") {
            toast.error(res.data.message);
          } else {
            toast.error("Something didn't work");
          }
        })
        .catch(err => {
          toast.error("Social login didn't work");
        });
    };

    return (
      <React.Fragment>
        <GoogleLogin
          clientId="634621998511-2p44kklid6uj93b46julcba8vbsogibt.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={handleResponseGoogle}
          cookiePolicy={"single_host_origin"}
        />

        <FacebookProvider appId="470652490551031">
          <Login scope="email" onResponse={handleResponseFacebook}>
            <span className="FB-Login">
              <img
                width="20"
                height="20"
                src="https://image.flaticon.com/icons/svg/124/124010.svg"
                alt="Facebook Login"
              />{" "}
              Login via Facebook
            </span>
          </Login>
        </FacebookProvider>

        {this.renderRedirect()}
      </React.Fragment>
    );
  }
}

export default connect(null, mapDispatchToProps)(SocialLogin);