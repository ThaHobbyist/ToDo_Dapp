import React, { Component } from "react";
import Task from "./Task";
import CreateTask from "./CreateTask";
class TaskList extends Component {
  state = {
    countKey: null,
    taskKey: null,
    stackId: null,
  };

  componentDidMount() {
    const { drizzle } = this.props;
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

  setTask = (value) => {
    const { drizzle, drizzleState } = this.props;
    const contract = drizzle.contracts.TodoList;

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

  render() {
    const { TodoList } = this.props.drizzleState.contracts;

    const Count = TodoList.taskCount[this.state.countKey];
    const TaskList = TodoList.taskList[this.state.taskKey];

    return (
      <div className="task_component p-2">
        <h4>Number of Tasks: {Count && Count.value} </h4>
        <div className="main m-2">
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
        <CreateTask
          className="m-2"
          drizzle={this.props.drizzle}
          drizzleState={this.props.drizzleState}
          onCreateTask={this.setTask}
        />
        <div className="m-1">{this.getTxnStatus()}</div>
      </div>
    );
  }
}

export default TaskList;
