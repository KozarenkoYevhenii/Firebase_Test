import React from "react";
import { NavLink } from "react-router-dom";
import firebase from "firebase";
import Login from "../login/Login";

export default class Register extends React.Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    isAuth: false,
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
        const user = firebase.auth().currentUser;
        user.updateProfile({ displayName: firstName + " " + lastName });
        this.setState({ isAuth: true });
      })
      .catch((error) => console.log(error));
  };
  render() {
    return (
      <div>
        {this.state.isAuth ? (
          <Login />
        ) : (
          <div>
            <div>Register</div>
            <input
              id="firstName"
              type="text"
              value={this.state.firstName}
              placeholder="First Name"
              onChange={this.onInputChange}
            />
            <input
              id="lastName"
              type="text"
              value={this.state.lastName}
              placeholder="Last Name"
              onChange={this.onInputChange}
            />
            <input
              id="email"
              type="email"
              value={this.state.email}
              placeholder="Email"
              onChange={this.onInputChange}
            />
            <input
              id="password"
              type="password"
              value={this.state.password}
              placeholder="Password"
              onChange={this.onInputChange}
            />
            <button type="submit" onClick={this.onRegister}>
              Sign up
            </button>
            <NavLink to="/login">
              Already registered?<span>Log in</span>
            </NavLink>
          </div>
        )}
      </div>
    );
  }
}
