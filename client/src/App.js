import React, { Component } from "react";
import Tasks from "./components/Tasks.jsx";
import CreateTask from "./components/CreateTask.jsx";

class App extends Component {
  state = {
    loading: true,
    drizzleState: null,
  };

  componentDidMount() {
    const { drizzle } = this.props;

    this.unsubscribe = drizzle.store.subscribe(() => {
      const drizzleState = drizzle.store.getState();

      if (drizzleState.drizzleStatus.initialized) {
        this.setState({ loading: false, drizzleState });
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    if (this.state.loading) return "Loading Drizzle...";
    return (
      <div className="App">
        <Tasks
          drizzle={this.props.drizzle}
          drizzleState={this.state.drizzleState}
        />
        <CreateTask
          drizzle={this.props.drizzle}
          drizzleState={this.state.drizzleState}
        />
      </div>
    );
  }
}

export default App;
