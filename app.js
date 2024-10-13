const taskManager = () => {
  let todos = [];
  const $todoInput = document.getElementById("inputTodo");
  const $addTodoButton = document.getElementById("addTodoButton");
  const $todoList = document.getElementById("listTodo");
  const $feedbackMessage = document.getElementById("feedbackMessage");
  function renderTodos() {
    // iterate over the todos list, create specific todos, and insert them in the DOM
    $todoList.innerHTML = "";
    todos.forEach((todo) => {
      const todoElement = createTodo(todo);
      $todoList.appendChild(todoElement);
    });
  }
  function createTodo(todo) {
    // responsible for creating a todo element based on the todo object
    const $li = document.createElement("li");
    const $todoText = document.createElement("span");
    $todoText.textContent = todo.title;
    $li.appendChild($todoText);
    return $li;
  }
  function showFeeback() {
    $feedbackMessage.innerText = "Please Enter a valid Todo item";
    $feedbackMessage.style.color = "red";
    $feedbackMessage.style.fontSize = "12px";
  }
  function clearFeedback() {
    $feedbackMessage.innerText = "";
  }
  function onAddTodo() {
    // responsible for delegating the work needed to create a todo object
    // for example,
    const inputText = $todoInput.value.trim();
    if (inputText == "") {
      showFeeback();
      return;
    }
    clearFeedback();
    const todo = {
      title: $todoInput.value,
      createdAt: Date.now(),
      //... other options might be added in the future
    };
    todos.push(todo);
    renderTodos();
    $todoInput.value = "";
  }
  $addTodoButton.addEventListener("click", onAddTodo);
};
document.addEventListener("DOMContentLoaded", taskManager);
