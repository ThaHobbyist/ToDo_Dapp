const TodoList = artifacts.require("./TodoList.sol");

contract("TodoList", (accounts) => {
  it("Should Add Task 'Test Task' ", async () => {
    const todoList = await TodoList.deployed();

    await todoList
      .createTask("Test Task", { from: accounts[0] })
      .on("TaskCreated", (Task) => {
        assert.equal(Task.content, "Test Task");
      });
  });
});
