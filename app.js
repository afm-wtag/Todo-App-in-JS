import { showFeedback, clearFeedback } from "./utility.js";

const taskManager = () => {
  let todos = [];

  const $todoInput = document.getElementById("inputTodo");
  const $addTodoButton = document.getElementById("addTodoButton");
  const $todoList = document.getElementById("listTodo");
  const $feedbackMessage = document.getElementById("feedbackMessage");

  function renderTodos() {
    $todoList.innerHTML = "";

    todos.forEach((todo) => {
      const todoElement = createTodo(todo);
      $todoList.appendChild(todoElement);
    });
  }

  function createTodo(todo) {
    const $li = document.createElement("li");
    const $todoText = document.createElement("span");
    $todoText.textContent = todo.title;

    $li.appendChild($todoText);
    return $li;
  }

  function onAddTodo() {
    const inputText = $todoInput.value.trim();

    if (inputText == "") {
      showFeedback($feedbackMessage, "Please add todo text!");
      return;
    }

    clearFeedback($feedbackMessage);

    const todo = {
      title: $todoInput.value,
      createdAt: Date.now(),
    };
    todos.push(todo);

    renderTodos();

    $todoInput.value = "";
  }

  $addTodoButton.addEventListener("click", onAddTodo);
};

document.addEventListener("DOMContentLoaded", taskManager);
