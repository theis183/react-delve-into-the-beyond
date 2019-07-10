import React, { Component } from "react";

class Timer extends Component {
    constructor(props) {
      super(props);
      this.state = { 
          seconds: this.props.seconds,
        }
    }

    tick() {
      this.setState(prevState => ({
        seconds: prevState.seconds - 1
      })
      )
      if(this.state.seconds <= 0){
          this.props.handeler()
      }
    }

    componentDidMount() {
      this.interval = setInterval(() => this.tick(), 1000);
    }

    componentWillUnmount() {
      clearInterval(this.interval);
    }

    render() {
      const {seconds} = this.state
      var displaySeconds = (seconds % 60).toString()
      const displayMinutes = Math.floor(seconds / 60).toString()
      if(seconds % 60 < 10){
        displaySeconds = "0" + displaySeconds
      }
      return (
        <div>
          Time Until Completion: {displayMinutes + ":" + displaySeconds}
        </div>
      );
    }
  }

export default Timer