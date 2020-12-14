import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAezqBb5QeeN4k6Prd8MFukNR_qqJ3rAr8",
  authDomain: "fir-test-e1e26.firebaseapp.com",
  databaseURL: "https://fir-test-e1e26-default-rtdb.firebaseio.com",
  projectId: "fir-test-e1e26",
  storageBucket: "fir-test-e1e26.appspot.com",
  messagingSenderId: "971799009249",
  appId: "1:971799009249:web:03d899434899aae569a4a0",
};

firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
