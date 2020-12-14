import React from "react";
import stopwatch from "../../assets/stopwatch.png"

export default class Timer extends React.Component {
  state = {
    desktopTime: "00:00:00",
    mobileTime: "00:00:00",
  };
  render() {
    return (
      <div>
        <div>Log out</div>
        <div>
          <div>Desktop</div>
          <div><img src={stopwatch} alt="Stopwacth" /></div>
          <div>{this.state.desktopTime}</div>
            </div>
            <div>
          <div>Mobile</div>
          <div><img src={stopwatch} alt="Stopwacth" /></div>
          <div>{this.state.mobileTime}</div>
        </div>
      </div>
    );
  }
}

