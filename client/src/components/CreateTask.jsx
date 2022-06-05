import React, { Component } from "react";

class createTask extends Component {
  state = { stackId: null, value: "" };

  constructor(props) {
    super(props);
    this.state = { value: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  setTask = (value) => {
    const { drizzle, drizzleState } = this.props;
    const contract = drizzle.contracts.TodoList;

    // console.log(contract);
    // await contract.methods.createTask(value).call();
    // contract.events.on("TaskCreated", (e) => {
    //   console.log(e);
    // });
    // const count = contract.methods.taskCount().call();
    // console.log(count);
    const stackId = contract.methods["createTask"].cacheSend(value, {
      from: drizzleState.accounts[0],
    });

    this.setState({ stackId });
  };

  getTxnStatus = () => {
    const { transactions, transactionStack } = this.props.drizzleState;

    const txHash = transactionStack[this.state.stackId];

    if (!txHash) return null;

    return `Transaction status: ${
      transactions[txHash] && transactions[txHash].status
    }`;
  };

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    console.log(this.state.value);
    this.setTask(this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <div className="makeTask">
        <form onSubmit={this.handleSubmit}>
          <label>
            Task Name:
            <input
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
        {/* <button onClick={() => this.setTask("New Generic Task")}>
          Make new Task
        </button> */}
        <div>{this.getTxnStatus()}</div>
      </div>
    );
  }
}

export default createTask;
