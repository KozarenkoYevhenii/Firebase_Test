import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/login/Login";
import Register from "./components/register/Register";

function App() {
  return (
    <BrowserRouter>
      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />
      <Route exact path="/" component={Login} />
    </BrowserRouter>
  );
}

export default App;
