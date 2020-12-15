import React from "react";
import { NavLink } from "react-router-dom";
import firebase from "firebase";
import Timer from "../timer/Timer";

export default class Login extends React.Component {
  state = {
    email: "",
    password: "",
    isAuth: false,
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
        if(res) this.setState({ isAuth: true });
      })
      .catch((error) => console.log(error));
  };
  render() {
    const { isAuth } = this.state;
    return (
      <div>
        {isAuth ? (
          <Timer />
        ) : (
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
            <button type="submit" onClick={this.onLogin}>
              Login
            </button>
            <NavLink to="/register">
              Don`t have an account yet?<span>Register</span>
            </NavLink>
          </div>
        )}
      </div>
    );
  }
}
