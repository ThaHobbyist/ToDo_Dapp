import React, { Component } from "react";

class Task extends Component {
  state = {
    task: null,
    checked: false,
  };

  componentDidMount() {
    const { task } = this.props;
    this.setState({ task });

    const checked = task.completed;
    this.setState({ checked });
  }

  completed() {
    let cls = "m-1 ";
    return (cls += !this.props.task.completed ? "d-none" : "d-inline-block");
  }

  check() {
    return !this.props.task.completed ? false : true;
  }

  render() {
    return (
      this.state.task && (
        <label>
          <input
            className="m-1"
            type="checkbox"
            onChange={this.props.toggleCheck}
            checked={this.check()}
          />
          <span className="m-1">{this.state.task.content}</span>
          <span className={this.completed()}>
            <i class="fa-solid fa-check m-1"></i>Completed
          </span>
        </label>
      )
    );
  }
}

export default Task;
