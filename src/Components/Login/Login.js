import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Cookies from "js-cookie";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { setUser } from "../../modules/actions";
import { toast } from "react-toastify";
import FacebookProvider, { Login } from 'react-facebook-sdk';

const mapDispatchToProps = dispatch => {
  return {
    dispatchUser: user => {
      dispatch(setUser(user));
    }
  };
};

class Userlogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedin: false
    };
  }

  renderRedirect = () => {
    if (Cookies.get("userToken") || this.state.loggedin) {
      return <Redirect to="/" />;
    }
  };

  render() {
    const handleSubmit = event => {
      event.preventDefault();
      const form = event.currentTarget;
      axios
        .post("https://travel-to-api.herokuapp.com/api/auth/login", {
          email: form.formGroupEmail.value,
          password: form.formGroupPassword.value
        })
        .then(res => {
          if (res.data.status == "success") {
            Cookies.set("userToken", res.data.data.token, { expires: 1 });
            this.setState({
              logn: (this.state.loggedin = true)
            });
            var config = {
              headers: { Authorization: "Bearer " + Cookies.get("userToken") }
            };
            axios
              .get("https://travel-to-api.herokuapp.com/api/user", config)
              .then(res => {
                if (res.data.status === "success") {
                  this.props.dispatchUser(res.data.data);
                } else if (res.data.status === 'error') {
                  toast.error(res.data.message)
                }
              }).catch(err => {
                toast.error("Something went wrong!")
              });
          }
        }).catch(err => {
          toast.error("Something went wrong!")
        })
    };
    return (
      <React.Fragment>
        {this.renderRedirect()}
        <div className="headline">Let's go for a ride!</div>
        <div className="sub-headline">But first we must get you logged in</div>
        <div>
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
        </div>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formGroupEmail">
            <Form.Control type="email" placeholder="Enter email" data-cy="email"/>
          </Form.Group>
          <Form.Group controlId="formGroupPassword">
            <Form.Control type="password" placeholder="Password" data-cy="password"/>
          </Form.Group>
          <Button variant="primary" type="submit" data-cy="login">
            Login
          </Button>
        </Form>
      </React.Fragment>
    );
  }
}

export default connect(null, mapDispatchToProps)(Userlogin);
