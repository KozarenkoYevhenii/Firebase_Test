import React from "react";
import { NavLink } from "react-router-dom";
import firebase from "firebase";
import Timer from "../timer/Timer";
import "./login.css";

export default class Login extends React.Component {
  state = {
    email: "",
    password: "",
    isAuth: false,
    isMobile: this.props.isMobile,
  };
  onInputChange = ({ target: { id, value } }) => {
    this.setState({ [id]: value });
  };
  onLogin = () => {
    const { email, password } = this.state;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        if (res) this.setState({ isAuth: true });
      })
      .catch((error) => console.log(error));
  };
  render() {
    const { isAuth, isMobile } = this.state;
    const classNameMod = isMobile ? "mobile" : "desktop";
    return (
      <div className="login-wrapper">
        {isAuth ? (
          <Timer isMobile={this.props.isMobile} />
        ) : (
          <div className={`login-form ${classNameMod}`}>
            <div className="login-header">Login</div>
            <input
              className={`login-input-${classNameMod}`}
              id="email"
              type="email"
              value={this.state.email}
              placeholder="Email"
              onChange={this.onInputChange}
            />
            <input
              className={`login-input-${classNameMod}`}
              id="password"
              type="password"
              value={this.state.password}
              placeholder="Password"
              onChange={this.onInputChange}
            />
            <div className={`login-button-wrapper-${classNameMod}`}>
              <button
                className={`login-button-${classNameMod}`}
                type="submit"
                onClick={this.onLogin}
              >
                Login
              </button>
            </div>
            <div className={`login-redirect ${classNameMod}`}>
              <NavLink to="/register">
                Don`t have an account yet? <span>Register</span>
              </NavLink>
            </div>
          </div>
        )}
      </div>
    );
  }
}
