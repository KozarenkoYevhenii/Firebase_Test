import React from "react";
import { NavLink } from "react-router-dom";
import firebase from "firebase";
import Login from "../login/Login";
import "./register.css";

export default class Register extends React.Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    isAuth: false,
    isMobile: this.props.isMobile,
  };
  onInputChange = ({ target: { id, value } }) => {
    this.setState({ [id]: value });
  };
  onRegister = () => {
    const { email, password, firstName, lastName } = this.state;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        const userId = firebase.auth().currentUser.uid;
        firebase
          .database()
          .ref("users/" + userId)
          .set({ firstName, lastName, desktopTime: 0, mobileTime: 0 });

        this.setState({ isAuth: true });
      })
      .catch((error) => console.log(error));
  };
  render() {
    const { isAuth, isMobile } = this.state;
    const classNameMod = isMobile ? "mobile" : "desktop";
    return (
      <div className="register-wrapper">
        {isAuth ? (
          <Login />
        ) : (
          <div className={`register-form ${classNameMod}`}>
            <div className="register-header">Register</div>
            <input
              id="firstName"
              type="text"
              value={this.state.firstName}
              placeholder="First Name"
              onChange={this.onInputChange}
              className={`register-input-${classNameMod}`}
            />
            <input
              id="lastName"
              type="text"
              value={this.state.lastName}
              placeholder="Last Name"
              onChange={this.onInputChange}
              className={`register-input-${classNameMod}`}
            />
            <input
              id="email"
              type="email"
              value={this.state.email}
              placeholder="Email"
              onChange={this.onInputChange}
              className={`register-input-${classNameMod}`}
            />
            <input
              id="password"
              type="password"
              value={this.state.password}
              placeholder="Password"
              onChange={this.onInputChange}
              className={`register-input-${classNameMod}`}
            />
            <div className={`register-button-wrapper-${classNameMod}`}>
              <button
                className={`register-button-${classNameMod}`}
                type="submit"
                onClick={this.onRegister}
              >
                Sign up
              </button>
            </div>
            <div className={`register-redirect ${classNameMod}`}>
              <NavLink to="/login">
                Already registered? <span>Log in</span>
              </NavLink>
            </div>
          </div>
        )}
      </div>
    );
  }
}
