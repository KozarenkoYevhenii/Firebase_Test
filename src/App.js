import { BrowserRouter, Route } from "react-router-dom";
import React from "react";
import "./App.css";
import Login from "./components/login/Login";
import Register from "./components/register/Register";

const MAX_MOBILE_WIDTH = 600;
const isMobile = window.innerWidth < MAX_MOBILE_WIDTH;

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path="/register" render={() => <Register isMobile={isMobile} />} />
        <Route path="/login" render={() => <Login isMobile={isMobile} />} />
        <Route exact path="/" render={() => <Login isMobile={isMobile} />} />
      </BrowserRouter>
    </div>
  );
};

export default App;
