const taskManager = () => {
  const $todoInput = document.getElementById("inputTodo");
  const $addTodoButton = document.getElementById("addTodoButton");
  const $todoList = document.getElementById("listTodo");
  const addTodo = () => {
    const inputText = inputTodo.value.trim();
    if (inputText == "") {
      alert("Enter Something!");
      return;
    }
    listTodo.appendChild(addNewTask(inputText));
    inputTodo.value = "";
  };
  const addNewTask = (text) => {
    const li = document.createElement("li");
    li.innerText = text;
    return li;
  };
  addTodoButton.addEventListener("click", addTodo);
};
document.addEventListener("DOMContentLoaded", taskManager);
