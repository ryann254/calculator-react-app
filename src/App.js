import React, { Component } from "react";
import Button from "./components/Buttons";
import "./css/style.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // x: 3,
      // y: 5,
      // z: 0,
      current: "0",
      previous: [],
      nextIsResets: false
    };
  }

  handleClick = () => {
    // this.setState({ z: this.state.x + this.state.y });
  };

  reset = () => {
    this.setState({ current: "0", previous: [], nextIsResets: false });
  };

  addToCurrent = symbol => {
    if (["/", "-", "+", "*"].indexOf(symbol) > -1) {
      let { previous } = this.state;
      previous.push(this.state.current + symbol);
      // console.log(previous);
      this.setState({ previous, nextIsResets: true });
    } else {
      if (
        (this.state.current === "0" && this.state.current !== ".") ||
        this.state.nextIsResets
      ) {
        this.setState({ current: symbol, nextIsResets: false });
      } else {
        this.setState({ current: this.state.current + symbol });
      }
    }
  };

  calculate = symbol => {
    let { current, previous, nextIsResets } = this.state;
    if (previous.length > 0) {
      current = eval(String(previous[previous.length - 1] + current));
      previous.push(this.state.previous + this.state.current);
      this.setState({
        current,
        previous,
        nextIsResets: true
      });
    }
  };

  render() {
    // let { x, y, z } = this.state;
    const buttons = [
      { symbol: "C", cols: 3, action: this.reset },
      { symbol: "/", cols: 1, action: this.addToCurrent },
      { symbol: "7", cols: 1, action: this.addToCurrent },
      { symbol: "8", cols: 1, action: this.addToCurrent },
      { symbol: "9", cols: 1, action: this.addToCurrent },
      { symbol: "*", cols: 1, action: this.addToCurrent },
      { symbol: "4", cols: 1, action: this.addToCurrent },
      { symbol: "5", cols: 1, action: this.addToCurrent },
      { symbol: "6", cols: 1, action: this.addToCurrent },
      { symbol: "-", cols: 1, action: this.addToCurrent },
      { symbol: "1", cols: 1, action: this.addToCurrent },
      { symbol: "2", cols: 1, action: this.addToCurrent },
      { symbol: "3", cols: 1, action: this.addToCurrent },
      { symbol: "+", cols: 1, action: this.addToCurrent },
      { symbol: "0", cols: 2, action: this.addToCurrent },
      { symbol: ".", cols: 1, action: this.addToCurrent },
      { symbol: "=", cols: 1, action: this.calculate }
    ];
    return (
      <div>
        {/* <p>
          X is: {x} and Y is: {y}
        </p>
        <p>Answer is: {z}</p>
        <br />

        <button onClick={e => this.handleClick()}>Add</button> */}

        {this.state.previous.length > 0 ? (
          <div className="floating-last">
            {this.state.previous[this.state.previous.length - 1]}
          </div>
        ) : null}

        <input className="result" type="text" value={this.state.current} />

        {buttons.map((btn, i) => {
          return (
            <Button
              key={i}
              symbol={btn.symbol}
              cols={btn.cols}
              action={symbol => btn.action(symbol)}
            />
          );
        })}
      </div>
    );
  }
}

export default App;
