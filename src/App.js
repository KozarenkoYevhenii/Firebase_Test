import { BrowserRouter, Redirect, Route } from "react-router-dom";
import React from "react";
import "./App.css";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Timer from "./components/timer/Timer";

const MAX_MOBILE_WIDTH = 600;
const isMobile = window.innerWidth < MAX_MOBILE_WIDTH;

const App = () => {
  return (
    <div className="App">
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Route
          path="/register"
          render={() => <Register isMobile={isMobile} />}
        />
        <Route path="/login" render={() => <Login isMobile={isMobile} />} />
        <Route path="/timer" render={() => <Timer isMobile={isMobile} />} />
        <Redirect exact path="/" to="/login" />
      </BrowserRouter>
    </div>
  );
};

export default App;
