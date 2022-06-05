import React, { Component } from "react";

class Task extends Component {
  state = {
    task: null,
  };

  componentDidMount() {
    const { task } = this.props;
    this.setState({ task });
  }

  render() {
    return (
      this.state.task && (
        <label>
          <input
            type="checkbox"
            onChange={this.props.toggleCheck}
            checked={this.state.task.completed}
          />
          <span>{this.state.task.content}</span>
        </label>
      )
    );
  }
}

export default Task;
