import React, { Component } from "react";

class Timer extends Component {
    constructor(props) {
      super(props);
      this.state = { 
          seconds: this.props.seconds }
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
      return (
        <div>
          Time Until Completion: {this.state.seconds}
        </div>
      );
    }
  }

export default Timer