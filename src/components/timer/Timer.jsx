import React from "react";
import stopwatch from "../../assets/stopwatch.png";

export default class Timer extends React.Component {
  state = {
    desktopTime: 0,
    mobileTime: 0,
    isMobile: false,
    mobileIntervalId: null,
    desktopIntervalId: null,
  };
  componentDidMount() {
    this.updateWindowWidth();
    window.addEventListener("resize", this.updateWindowWidth);
  }
  updateWindowWidth = () => {
    window.innerWidth > 600
      ? this.setState({ isMobile: false })
      : this.setState({ isMobile: true });
    this.startTimer();
  };
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
