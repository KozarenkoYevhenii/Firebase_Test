import React from "react";
import stopwatch from "../../assets/stopwatch.png";
import firebase from "firebase";

export default class Timer extends React.Component {
  state = {
    desktopTime: 0,
    mobileTime: 0,
    isMobile: window.innerWidth < 600,
    mobileIntervalId: null,
    desktopIntervalId: null,
  };
  componentDidMount() {
    const db = firebase.database();
    db.ref("Time").on("value", (elem) => {
      this.setState({
        desktopTime: elem.val().desktopTime,
        mobileTime: elem.val().mobileTime,
      });
    });
    db.ref("Time").push(null);
    this.startTimer();
  }
  componentDidUpdate() {
    const db = firebase.database();
    db.ref("Time").update({
      mobileTime: this.state.mobileTime,
      desktopTime: this.state.desktopTime,
    });
  }
  startTimer = () => {
    this.state.isMobile
      ? (this.mobileIntervalId = setInterval(() => {
          this.setState({ mobileTime: this.state.mobileTime + 1 });
        }, 1000))
      : (this.desktopIntervalId = setInterval(() => {
          this.setState({ desktopTime: this.state.desktopTime + 1 });
        }, 1000));
  };
  render() {
    return (
      <div>
        <div>Log out</div>
        <div>
          <div>Desktop</div>
          <div>
            <img src={stopwatch} alt="Stopwacth" />
          </div>
          <div>{this.state.desktopTime}</div>
        </div>
        <div>
          <div>Mobile</div>
          <div>
            <img src={stopwatch} alt="Stopwacth" />
          </div>
          <div>{this.state.mobileTime}</div>
        </div>
      </div>
    );
  }
}
