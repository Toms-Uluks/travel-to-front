import React, { Component } from "react";
import Userlogin from "./Login";
import Register from "./Register";
import background from "../../Assets/img/landing.jpeg";
import "../../css/Auth.scss";

class AuthPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeForm: "login"
    };
  }
  changeFormState(active) {
    this.setState({
      activeForm: active
    });
  }
  render() {
    return (
      <div
        style={{ backgroundImage: "url(" + background + ")" }}
        className="form-wrap"
      >
        <div
          className={
            this.state.activeForm === "login" ? "active-form form" : "form"
          }
        >
          {this.state.activeForm === "login" ? (
            <div>
              <Userlogin></Userlogin>
              <div
                className="secondary-btn"
                onClick={() => this.changeFormState("register")}
                data-cy="registerLink"
              >
                Register
              </div>
            </div>
          ) : null}
        </div>
        <div
          className={
            this.state.activeForm === "register" ? "active-form form" : "form"
          }
        >
          {this.state.activeForm === "register" ? (
            <div>
              <Register></Register>
              <div
                className="secondary-btn"
                onClick={() => this.changeFormState("login")}
              >
                Login
              </div>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

export default AuthPage;
