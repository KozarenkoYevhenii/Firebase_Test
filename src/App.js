import { BrowserRouter, Route } from "react-router-dom";
import React from "react";
import "./App.css";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import firebase from "firebase";

class App extends React.Component {
  componentDidMount() {
    const db = firebase.database();
    console.log(db);
  }
  render() {
    return (
      <BrowserRouter>
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route exact path="/" component={Login} />
      </BrowserRouter>
    );
  }
}

export default App;
