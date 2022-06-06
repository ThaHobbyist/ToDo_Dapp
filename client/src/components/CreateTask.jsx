import React, { Component } from "react";

class createTask extends Component {
  state = { stackId: null, value: "" };

  constructor(props) {
    super(props);
    this.state = { value: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    console.log(this.state.value);
    this.props.onCreateTask(this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <div className="makeTask">
        <form onSubmit={this.handleSubmit}>
          <label>
            Task Name:
            <input
              className="m-2"
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
            />
          </label>
          <input type="submit" value="Make New Task" />
        </form>
        {/* <button onClick={() => this.setTask("New Generic Task")}>
          Make new Task
        </button> */}
      </div>
    );
  }
}

export default createTask;
