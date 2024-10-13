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

    const $editText = document.createElement("input");
    $editText.value = todo.title;
    $editText.style.display = "none";

    const $errorMsg = document.createElement("div");
    $errorMsg.style.display = "none";

    const editButton = createButton("Edit", () =>
      onEditTodo($errorMsg, $todoText, $editText, index)
    );

    $li.appendChild($todoText);
    $li.appendChild($editText);
    $li.appendChild(editButton);
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
    };
    todos.push(todo);

    renderTodos();

    $todoInput.value = "";
  }
  function onEditTodo($errorMsg, $todoText, $editText, index) {
    todos[index].isEditing = !todos[index].isEditing;

    if (todos[index].isEditing) {
      $editText.value = todos[index].title;
      $editText.style.display = "inline";
      $todoText.style.display = "none";

      $editText.focus();
    } else {
      const updateText = $editText.value.trim();

      if (updateText) {
        clearFeedback($errorMsg);

        $editText.style.display = "none";
        $todoText.style.display = "inline";

        todos[index].title = updateText;
        $todoText.textContent = updateText;
      } else {
        showFeedback($errorMsg, "Write something!");

        todos[index].isEditing = true;
        $editText.focus();
      }
    }
  }

  $addTodoButton.addEventListener("click", onAddTodo);
};

document.addEventListener("DOMContentLoaded", taskManager);
