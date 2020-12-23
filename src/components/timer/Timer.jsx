import React from "react";
import stopwatch from "../../assets/stopwatch.png";
import firebase from "firebase";
import Login from "../login/Login";
import "./timer.css";
import { Redirect } from "react-router-dom";

export default class Timer extends React.Component {
  state = {
    desktopTime: 0,
    mobileTime: 0,
    isMobile: this.props.isMobile,
    mobileIntervalId: null,
    desktopIntervalId: null,
    isAuth: true,
  };
  // componentDidMount() {
  //   const userId = firebase.auth().currentUser.uid;
  //   firebase
  //     .database()
  //     .ref("users/" + userId)
  //     .on("value", (elem) => {
  //       this.setState({
  //         desktopTime: elem.val().desktopTime,
  //         mobileTime: elem.val().mobileTime,
  //       });
  //     });
  //   this.startTimer();
  // }
  componentDidUpdate() {
    const userId = firebase.auth().currentUser.uid;
    firebase
      .database()
      .ref("users/" + userId)
      .update({
        mobileTime: this.state.mobileTime,
        desktopTime: this.state.desktopTime,
      });
  }
  startTimer = () => {
    let mobileIntervalId = null;
    let desktopIntervalId = null;
    this.state.isMobile
      ? (mobileIntervalId = setInterval(() => {
          this.setState({
            mobileTime: this.state.mobileTime + 1,
            mobileIntervalId,
          });
        }, 1000))
      : (desktopIntervalId = setInterval(() => {
          this.setState({
            desktopTime: this.state.desktopTime + 1,
            desktopIntervalId,
          });
        }, 1000));
  };
  formatTime = (time) => {
    const Hours = Math.floor(time / 3600);
    const Minutes = Math.floor((time % 3600) / 60);
    const Seconds = Math.floor(time % 60);
    return `${Hours < 10 ? "0" + Hours : Hours}:${
      Minutes < 10 ? "0" + Minutes : Minutes
    }:${Seconds < 10 ? "0" + Seconds : Seconds}`;
  };
  onLogout = () => {
    console.log(this.state);
    if (this.state.isMobile) {
      clearInterval(this.state.mobileIntervalId);
      this.setState({ isAuth: false });
    } else {
      clearInterval(this.state.desktopIntervalId);
      this.setState({ isAuth: false });
    }
  };
  render() {
    const { desktopTime, mobileTime, isAuth, isMobile } = this.state;
    const classNameMod = isMobile ? "mobile" : "desktop";
    return (
      <div>
        {isAuth ? (
          <div className={`timer-wrapper-${classNameMod}`}>
            <Redirect path="/login" to="/timer" />
            <button
              className={`timer-logout-${classNameMod}`}
              type="button"
              onClick={this.onLogout}
            >
              Log out
            </button>
            <div className="timer-count-wrapper">
              <div className={`timer-count-${classNameMod}`}>Desktop</div>
              <div className={`timer-logo-container-${classNameMod}`}>
                <img
                  className={`timer-logo-${classNameMod}`}
                  src={stopwatch}
                  alt="Stopwacth"
                />
              </div>
              <div className={`timer-count-${classNameMod}`}>
                {this.formatTime(desktopTime)}
              </div>
            </div>
            <div className="timer-count-wrapper">
              <div className={`timer-count-${classNameMod}`}>Mobile</div>
              <div className={`timer-logo-container-${classNameMod}`}>
                <img
                  className={`timer-logo-${classNameMod}`}
                  src={stopwatch}
                  alt="Stopwacth"
                />
              </div>
              <div className={`timer-count-${classNameMod}`}>
                {this.formatTime(mobileTime)}
              </div>
            </div>
          </div>
        ) : (
          <div>
            <Redirect exact path="/" to="/login" />
            <Login />
          </div>
        )}
      </div>
    );
  }
}
