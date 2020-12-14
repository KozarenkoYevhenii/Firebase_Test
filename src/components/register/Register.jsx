import React from "react";
import { NavLink } from "react-router-dom";

export default class Register extends React.Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };
  onInputChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
    };
    onRegister = () => {
        console.log(this.state);
      }
  render() {
    return (
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
        <button type="submit" onClick={this.onRegister}>Sign up</button>
        <NavLink to="/login">
          Already registered?<span>Log in</span>
        </NavLink>
      </div>
    );
  }
}
