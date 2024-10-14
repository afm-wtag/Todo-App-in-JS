import { showFeedback, clearFeedback } from "./utility.js";

const taskManager = () => {
  let todos = [];

  const $todoInput = document.getElementById("inputTodo");
  const $addTodoButton = document.getElementById("addTodoButton");
  const $todoList = document.getElementById("listTodo");
  const $feedbackMessage = document.getElementById("feedbackMessage");

  function renderTodos() {
    $todoList.innerHTML = "";

    todos.forEach((todo, index) => {
      const todoElement = createTodo(todo, index);
      $todoList.appendChild(todoElement);
    });
  }

  function createTodo(todo, index) {
    const $li = document.createElement("li");
    const $todoText = document.createElement("span");
    $todoText.textContent = todo.title;
    $todoText.style.display = todo.isEditing ? "none" : "inline";

    const $editText = document.createElement("input");
    $editText.value = todo.title;
    $editText.style.display = todo.isEditing ? "block" : "none";

    const $errorMsg = document.createElement("div");
    $errorMsg.style.display = "none";

    const editButton = createButton(todo.isEditing ? "Save" : "Edit", () =>
      onEditTodo($errorMsg, $todoText, $editText, index)
    );
    
    const deleteButton = createButton("Delete", () => onDeleteTodo(index));

    const $checkbox = document.createElement("input");
    $checkbox.type = "checkbox";
    $checkbox.checked = todo.isDone;
    $checkbox.onchange = () => onToggleDone(index);

    $li.appendChild($checkbox);
    $li.appendChild($todoText);
    $li.appendChild($editText);
    $li.appendChild(editButton);
    $li.appendChild(deleteButton);
    $li.appendChild($errorMsg);
    return $li;
  }

  const createButton = (text, onClick) => {
    const $button = document.createElement("button");

    $button.innerText = text;
    $button.onclick = onClick;
    return $button;
  };

  function onAddTodo() {
    const inputText = $todoInput.value.trim();

    if (inputText == "") {
      showFeedback($feedbackMessage, "Please Enter a valid Todo item");
      return;
    }
    clearFeedback($feedbackMessage);

    const todo = {
      title: $todoInput.value,
      createdAt: Date.now(),
      isEditing: false,
      isDone: false,
    };
    todos.push(todo);

    renderTodos();

    $todoInput.value = "";
  }

  function onEditTodo($errorMsg, $todoText, $editText, index) {
    const todo = todos[index];

    if (todo.isEditing) {
      const updateText = $editText.value.trim();

      if (updateText) {
        clearFeedback($errorMsg);
        todo.title = updateText;
        $todoText.textContent = updateText;
      } else {
        showFeedback($errorMsg, "Write something!");
        return;
      }
    }

    todo.isEditing = !todo.isEditing;
    renderTodos();
  }
  
  function onDeleteTodo(index) {
    todos.splice(index, 1);
    renderTodos();
  }

  function onToggleDone(index) {
    todos[index].isDone = !todos[index].isDone;
    renderTodos();
  }

  $addTodoButton.addEventListener("click", onAddTodo);
};

document.addEventListener("DOMContentLoaded", taskManager);
