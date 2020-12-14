import React from "react";
import { NavLink } from "react-router-dom";

export default class Login extends React.Component {
  state = {
    email: "",
    password: "",
  };
  onInputChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };
  onLogin = () => {
    console.log(this.state);
  }
  render() {
    return (
      <div>
        <div>Login</div>
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
        <button type="button" onClick={this.onLogin}>Login</button>
        <NavLink to="/register">
          Don`t have an account yet?<span>Register</span>
        </NavLink>
      </div>
    );
  }
}
