import React from "react";
import stopwatch from "../../assets/stopwatch.png";
import firebase from "firebase";
import Login from "../login/Login";

const MAX_MOBILE_WIDTH = 600;

export default class Timer extends React.Component {
  state = {
    desktopTime: 0,
    mobileTime: 0,
    isMobile: window.innerWidth < MAX_MOBILE_WIDTH,
    mobileIntervalId: null,
    desktopIntervalId: null,
    isAuth: true,
  };
  componentDidMount() {
    const userId = firebase.auth().currentUser.uid;
    firebase
      .database()
      .ref("users/" + userId)
      .on("value", (elem) => {
        this.setState({
          desktopTime: elem.val().desktopTime,
          mobileTime: elem.val().mobileTime,
        });
      });
    this.startTimer();
  }
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
    const { desktopTime, mobileTime, isAuth } = this.state;
    return (
      <div>
        {isAuth ? (
          <div>
            <div>
              <button type="button" onClick={this.onLogout}>
                Log out
              </button>
            </div>
            <div>
              <div>Desktop</div>
              <div>
                <img src={stopwatch} alt="Stopwacth" />
              </div>
              <div>{this.formatTime(desktopTime)}</div>
            </div>
            <div>
              <div>Mobile</div>
              <div>
                <img src={stopwatch} alt="Stopwacth" />
              </div>
              <div>{this.formatTime(mobileTime)}</div>
            </div>
          </div>
        ) : (
          <Login />
        )}
      </div>
    );
  }
}
