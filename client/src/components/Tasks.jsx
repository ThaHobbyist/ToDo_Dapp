import React, { Component } from "react";
import Task from "./Task";

class TaskList extends Component {
  state = {
    countKey: null,
    taskKey: null,
    stackId: null,
  };

  componentDidMount() {
    const { drizzle, drizzleState } = this.props;
    const contract = drizzle.contracts.TodoList;

    const countKey = contract.methods["taskCount"].cacheCall();
    this.setState({ countKey });

    const taskKey = contract.methods["taskList"].cacheCall();
    this.setState({ taskKey });
  }

  toggleCompleted = (_id) => {
    const { drizzle, drizzleState } = this.props;
    const contract = drizzle.contracts.TodoList;

    const stackId = contract.methods["toggleCompletion"].cacheSend(_id, {
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

  render() {
    const { TodoList } = this.props.drizzleState.contracts;

    const Count = TodoList.taskCount[this.state.countKey];
    const TaskList = TodoList.taskList[this.state.taskKey];

    return (
      <div className="task_component">
        <h3>Task Component</h3>
        <h4>Number of Tasks: {Count && Count.value} </h4>
        <div className="main">
          {TaskList &&
            TaskList.value.map((task) => {
              return (
                <div className="list" key={task.id}>
                  <Task
                    task={task}
                    toggleCheck={() => this.toggleCompleted(task.id)}
                  />
                </div>
              );
            })}
        </div>
        <div>{this.getTxnStatus()}</div>
      </div>
    );
  }
}

export default TaskList;
